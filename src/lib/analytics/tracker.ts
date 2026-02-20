import { getDeviceInfo, type DeviceInfo } from "./parse-ua";

interface TrackerConfig {
  endpoint: string;
  sessionTimeout: number;
  batchInterval: number;
  maxBatchEvents: number;
  site: string;
}

const CONFIG: TrackerConfig = {
  endpoint: "/api/analytics",
  sessionTimeout: 30 * 60 * 1000,
  batchInterval: 10_000,
  maxBatchEvents: 200,
  site: "collectivesoul",
};

function generateId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

function getCookie(name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function getSessionData(): { sessionId: string; lastActivity: number } | null {
  try {
    const raw = sessionStorage.getItem("_cs_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSessionData(sessionId: string) {
  sessionStorage.setItem(
    "_cs_session",
    JSON.stringify({ sessionId, lastActivity: Date.now() })
  );
}

function updateSessionActivity() {
  const data = getSessionData();
  if (data) {
    data.lastActivity = Date.now();
    sessionStorage.setItem("_cs_session", JSON.stringify(data));
  }
}

/** Send JSON via sendBeacon with correct Content-Type */
function beaconJSON(url: string, data: unknown): boolean {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  return navigator.sendBeacon(url, blob);
}

export class AnalyticsTracker {
  private visitorId: string;
  private sessionId: string | null = null;
  private sessionReady: Promise<void> | null = null;
  private eventBuffer: unknown[] = [];
  private chunkIndex = 0;
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private stopRecording: (() => void) | null = null;
  private currentPath = "";
  private pageEnteredAt = 0;
  private deviceInfo: DeviceInfo | null = null;
  private destroyed = false;

  constructor() {
    let vid = getCookie("_cs_vid");
    if (!vid) {
      vid = generateId();
      setCookie("_cs_vid", vid, 365);
    }
    this.visitorId = vid;
  }

  async init(): Promise<void> {
    if (this.destroyed) return;

    // Skip bots
    if ("webdriver" in navigator && (navigator as Navigator & { webdriver?: boolean }).webdriver) {
      return;
    }

    this.deviceInfo = getDeviceInfo();
    this.sessionReady = this.ensureSession();
    await this.sessionReady;
    this.sessionReady = null;

    if (this.destroyed) return;

    this.startRecording();
    this.flushTimer = setInterval(() => this.flushEvents(), CONFIG.batchInterval);

    window.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("beforeunload", this.handleUnload);
  }

  private handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      this.flushEvents(true);
    }
  };

  private handleUnload = () => {
    this.flushEvents(true);
    if (this.sessionId) {
      beaconJSON(`${CONFIG.endpoint}/session`, {
        sessionId: this.sessionId,
        endedAt: new Date().toISOString(),
      });
    }
  };

  private async ensureSession() {
    const existing = getSessionData();
    const now = Date.now();

    if (existing && now - existing.lastActivity < CONFIG.sessionTimeout) {
      this.sessionId = existing.sessionId;
      updateSessionActivity();
      return;
    }

    this.sessionId = generateId();
    this.chunkIndex = 0;
    setSessionData(this.sessionId);

    const url = new URL(window.location.href);
    const body = {
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      entryPage: url.pathname,
      referrer: document.referrer || null,
      utmSource: url.searchParams.get("utm_source")?.slice(0, 200) || null,
      utmMedium: url.searchParams.get("utm_medium")?.slice(0, 200) || null,
      utmCampaign: url.searchParams.get("utm_campaign")?.slice(0, 200) || null,
      site: CONFIG.site,
      ...this.deviceInfo,
    };

    await this.post(`${CONFIG.endpoint}/session`, body);
  }

  trackPageView(path: string) {
    if (this.destroyed || !this.sessionId) return;

    if (this.sessionReady) {
      this.sessionReady.then(() => {
        if (!this.destroyed) this.sendPageView(path);
      });
      return;
    }
    this.sendPageView(path);
  }

  private sendPageView(path: string) {
    if (this.destroyed || !this.sessionId) return;

    const prevDuration =
      this.pageEnteredAt > 0
        ? Math.round((Date.now() - this.pageEnteredAt) / 1000)
        : undefined;

    if (this.currentPath && this.currentPath !== path) {
      this.post(`${CONFIG.endpoint}/pageview`, {
        sessionId: this.sessionId,
        path: this.currentPath,
        title: document.title || null,
        duration: prevDuration,
      });
    }

    this.currentPath = path;
    this.pageEnteredAt = Date.now();
    updateSessionActivity();

    this.post(`${CONFIG.endpoint}/pageview`, {
      sessionId: this.sessionId,
      path,
      title: document.title || null,
    });
  }

  private async startRecording() {
    try {
      const { record } = await import("rrweb");
      if (this.destroyed) return;
      this.stopRecording =
        record({
          emit: (event) => {
            this.eventBuffer.push(event);
          },
          sampling: {
            mousemove: true,
            mouseInteraction: true,
            scroll: 150,
            media: 800,
            input: "last",
          },
          blockClass: "rr-block",
          maskTextClass: "rr-mask",
          maskAllInputs: true,
        }) || null;
    } catch {
      // rrweb failed to load — analytics still works without recording
    }
  }

  private flushEvents(useBeacon = false) {
    if (!this.sessionId || this.eventBuffer.length === 0) return;

    const batch = this.eventBuffer.splice(0, CONFIG.maxBatchEvents);

    const payload = {
      sessionId: this.sessionId,
      chunk: this.chunkIndex++,
      events: batch,
    };

    if (useBeacon) {
      beaconJSON(`${CONFIG.endpoint}/events`, payload);
    } else {
      this.post(`${CONFIG.endpoint}/events`, payload);
    }
  }

  private async post(url: string, data: unknown): Promise<void> {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      });
    } catch {
      // Silently fail — analytics should never break the app
    }
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;

    this.stopRecording?.();
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    window.removeEventListener("visibilitychange", this.handleVisibilityChange);
    window.removeEventListener("beforeunload", this.handleUnload);
    this.flushEvents(true);
  }
}
