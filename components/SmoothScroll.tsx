'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // find closest anchor
      const anchor = target.closest('a');
      if (!anchor) return;

      // Honour reduced-motion: skip smooth scrolling for users who prefer it.
      const behavior: ScrollBehavior =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/#')) {
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          // If we are on the home page (pathname is '/'), scroll prevent default
          if (window.location.pathname === '/') {
            e.preventDefault();
            element.scrollIntoView({ behavior });
            // Update URL
            window.history.pushState({}, '', href);
          }
        }
      } else if (href && href.startsWith('#')) {
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior });
          window.history.pushState({}, '', href);
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return null;
}
