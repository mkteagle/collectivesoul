"use client";

import { useEffect, useRef } from "react";
import { AnalyticsTracker } from "@/lib/analytics/tracker";

export default function Analytics() {
  const trackerRef = useRef<AnalyticsTracker | null>(null);

  useEffect(() => {
    const tracker = new AnalyticsTracker();
    trackerRef.current = tracker;
    tracker.init();

    // Track initial page
    tracker.trackPageView(window.location.pathname + window.location.hash);

    // Track hash changes (single-page navigation)
    const handleHashChange = () => {
      tracker.trackPageView(window.location.pathname + window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      tracker.destroy();
    };
  }, []);

  return null;
}
