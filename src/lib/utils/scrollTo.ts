import { NextRouter } from "next/router";

/**
 * Smooth scroll to an element with a given ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (useful for fixed headers)
 */
export const scrollToElement = (elementId: string, offset: number = 100) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Custom navigation function that handles anchor links
 * @param href - The href to navigate to
 * @param section - Optional section to scroll to
 * @param router - Next.js router instance
 */
export const navigateWithScroll = (
  href: string,
  section?: string,
  router?: unknown
) => {
  if (!section) {
    // Regular navigation without scrolling
    if (router) {
      (router as NextRouter).push(href);
    } else {
      window.location.href = href;
    }
    return;
  }

  // Check if we're already on the target page
  const currentPath = window.location.pathname;
  if (currentPath === href) {
    // Same page, just scroll to section
    scrollToElement(section);
  } else {
    // Different page, navigate then scroll
    const targetUrl = `${href}#${section}`;
    if (router) {
      (router as NextRouter).push(targetUrl);
    } else {
      window.location.href = targetUrl;
    }
  }
};

