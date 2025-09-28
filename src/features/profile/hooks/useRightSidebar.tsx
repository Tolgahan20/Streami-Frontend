import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface RightSidebarContextType {
  isRightSidebarOpen: boolean;
  isMobile: boolean;
  toggleRightSidebar: () => void;
  closeRightSidebar: () => void;
  openRightSidebar: () => void;
}

const RightSidebarContext = createContext<RightSidebarContextType | undefined>(undefined);

interface RightSidebarProviderProps {
  children: ReactNode;
}

export function RightSidebarProvider({ children }: RightSidebarProviderProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      console.log('RightSidebar - Window width:', window.innerWidth, 'isMobile:', mobile);
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleRightSidebar = () => {
    console.log('RightSidebar - toggleRightSidebar called, current state:', isRightSidebarOpen);
    const newState = !isRightSidebarOpen;
    setIsRightSidebarOpen(newState);
    
    // Only close mobile navigation if we're opening the right sidebar
    if (newState) {
      console.log('RightSidebar - Opening right sidebar, closing mobile navigation');
      const mobileNavEvent = new CustomEvent('closeMobileNavigation');
      window.dispatchEvent(mobileNavEvent);
    }
  };

  const closeRightSidebar = () => {
    setIsRightSidebarOpen(false);
  };

  const openRightSidebar = () => {
    setIsRightSidebarOpen(true);
    
    // Close mobile navigation if it's open
    const mobileNavEvent = new CustomEvent('closeMobileNavigation');
    window.dispatchEvent(mobileNavEvent);
  };

  // Listen for mobile navigation events
  useEffect(() => {
    const handleMobileNavOpen = () => {
      if (isRightSidebarOpen) {
        console.log('RightSidebar - Mobile navigation opened, closing right sidebar');
        closeRightSidebar();
      }
    };

    const handleCloseRightSidebar = () => {
      console.log('RightSidebar - Received closeRightSidebar event');
      closeRightSidebar();
    };

    window.addEventListener('openMobileNavigation', handleMobileNavOpen);
    window.addEventListener('closeRightSidebar', handleCloseRightSidebar);
    
    return () => {
      window.removeEventListener('openMobileNavigation', handleMobileNavOpen);
      window.removeEventListener('closeRightSidebar', handleCloseRightSidebar);
    };
  }, [isRightSidebarOpen]);

  // Prevent body scroll when right sidebar is open
  useEffect(() => {
    if (isRightSidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isRightSidebarOpen, isMobile]);

  const value: RightSidebarContextType = {
    isRightSidebarOpen,
    isMobile,
    toggleRightSidebar,
    closeRightSidebar,
    openRightSidebar,
  };

  return (
    <RightSidebarContext.Provider value={value}>
      {children}
    </RightSidebarContext.Provider>
  );
}

export function useRightSidebar() {
  const context = useContext(RightSidebarContext);
  if (context === undefined) {
    throw new Error('useRightSidebar must be used within a RightSidebarProvider');
  }
  return context;
}
