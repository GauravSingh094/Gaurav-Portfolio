'use client';

import { useEffect } from 'react';

// Reusable analytics logging interface
interface AnalyticsEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export function useAnalytics() {
  // Direct event logging router
  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    // 1. Google Analytics 4 dispatch
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // 2. Microsoft Clarity custom event logging
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('event', action);
    }

    // 3. Console logger under development validation
    if (process.env.NODE_ENV === 'development') {
      console.log(`[ANALYTICS] ${category} -> ${action} (Label: ${label}${value ? `, Value: ${value}` : ''})`);
    }
  };

  // Bind scroll depth trackers
  useEffect(() => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const currentScrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      if (currentScrollPercent > maxScroll) {
        maxScroll = currentScrollPercent;

        // Log specific checkpoints
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
          trackEvent({
            action: `scroll_depth_${maxScroll}_percent`,
            category: 'user_engagement',
            label: `User reached ${maxScroll}% scroll depth`,
            value: maxScroll
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { trackEvent };
}

// Global window declarations to prevent TypeScript validation warnings
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}
