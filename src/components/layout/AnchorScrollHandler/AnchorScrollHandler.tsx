"use client";

import { useScrollToAnchor } from '@/lib/hooks/useScrollToAnchor';

interface AnchorScrollHandlerProps {
  children: React.ReactNode;
}

/**
 * Component that handles automatic scrolling to anchor elements
 * Add this to any page that needs anchor scrolling functionality
 */
export const AnchorScrollHandler: React.FC<AnchorScrollHandlerProps> = ({ children }) => {
  useScrollToAnchor();
  
  return <>{children}</>;
};

