"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToElement } from '../utils/scrollTo';

/**
 * Hook that automatically scrolls to an anchor element when the URL contains a hash
 * This handles the case when a user navigates to a page with an anchor (e.g., /creator-hub#creator-marketplace)
 */
export const useScrollToAnchor = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          const elementId = hash.replace('#', '');
          scrollToElement(elementId, 100); // 100px offset for navbar
        }
      }, 100);
    };

    // Initial scroll on mount if hash exists
    handleRouteChange();

    // Listen for hash changes (if user manually changes hash)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.replace('#', '');
        scrollToElement(elementId, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router]);
};

