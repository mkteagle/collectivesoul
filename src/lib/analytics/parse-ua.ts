export interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: "desktop" | "mobile" | "tablet";
  screenWidth: number;
  screenHeight: number;
  language: string;
}

export function parseUserAgent(ua: string): Omit<DeviceInfo, "screenWidth" | "screenHeight" | "language"> {
  let browser = "Unknown";
  let browserVersion = "";
  let os = "Unknown";
  let osVersion = "";
  let device: DeviceInfo["device"] = "desktop";

  // Browser detection (order matters — check specific before generic)
  if (/Edg\/(\d+[\.\d]*)/.test(ua)) {
    browser = "Edge";
    browserVersion = RegExp.$1;
  } else if (/OPR\/(\d+[\.\d]*)/.test(ua)) {
    browser = "Opera";
    browserVersion = RegExp.$1;
  } else if (/Chrome\/(\d+[\.\d]*)/.test(ua) && !/Chromium/.test(ua)) {
    browser = "Chrome";
    browserVersion = RegExp.$1;
  } else if (/Safari\/(\d+[\.\d]*)/.test(ua) && !/Chrome/.test(ua)) {
    browser = "Safari";
    const match = ua.match(/Version\/(\d+[\.\d]*)/);
    browserVersion = match ? match[1] : "";
  } else if (/Firefox\/(\d+[\.\d]*)/.test(ua)) {
    browser = "Firefox";
    browserVersion = RegExp.$1;
  }

  // OS detection
  if (/Windows NT (\d+[\.\d]*)/.test(ua)) {
    os = "Windows";
    const ntVersion = RegExp.$1;
    const ntMap: Record<string, string> = {
      "10.0": "10/11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
    };
    osVersion = ntMap[ntVersion] || ntVersion;
  } else if (/Mac OS X (\d+[_\.\d]*)/.test(ua)) {
    os = "macOS";
    osVersion = RegExp.$1.replace(/_/g, ".");
  } else if (/Android (\d+[\.\d]*)/.test(ua)) {
    os = "Android";
    osVersion = RegExp.$1;
  } else if (/iPhone OS (\d+[_\.\d]*)/.test(ua) || /iPad.*OS (\d+[_\.\d]*)/.test(ua)) {
    os = "iOS";
    osVersion = (RegExp.$1 || "").replace(/_/g, ".");
  } else if (/Linux/.test(ua)) {
    os = "Linux";
  } else if (/CrOS/.test(ua)) {
    os = "ChromeOS";
  }

  // Device detection
  if (/iPad|tablet/i.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) {
    device = "tablet";
  } else if (/Mobile|iPhone|iPod|Android.*Mobile|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua)) {
    device = "mobile";
  }

  return { browser, browserVersion, os, osVersion, device };
}

export function getDeviceInfo(): DeviceInfo {
  const parsed = parseUserAgent(navigator.userAgent);
  return {
    ...parsed,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
  };
}
