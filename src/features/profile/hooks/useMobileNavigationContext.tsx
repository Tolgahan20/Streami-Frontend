import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface MobileNavigationContextType {
  isMobileMenuOpen: boolean;
  isMobile: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

const MobileNavigationContext = createContext<MobileNavigationContextType | undefined>(undefined);

interface MobileNavigationProviderProps {
  children: ReactNode;
}

export function MobileNavigationProvider({ children }: MobileNavigationProviderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      console.log('useMobileNavigation - Window width:', window.innerWidth, 'isMobile:', mobile);
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleMobileMenu = () => {
    console.log('useMobileNavigation - toggleMobileMenu called, current state:', isMobileMenuOpen);
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Only close right sidebar if we're opening the mobile menu
    if (newState) {
      console.log('useMobileNavigation - Opening mobile menu, closing right sidebar');
      const rightSidebarEvent = new CustomEvent('closeRightSidebar');
      window.dispatchEvent(rightSidebarEvent);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    
    // Close right sidebar if it's open
    const rightSidebarEvent = new CustomEvent('closeRightSidebar');
    window.dispatchEvent(rightSidebarEvent);
  };

  // Listen for right sidebar events
  useEffect(() => {
    const handleRightSidebarOpen = () => {
      if (isMobileMenuOpen) {
        console.log('useMobileNavigation - Right sidebar opened, closing mobile menu');
        closeMobileMenu();
      }
    };

    const handleCloseMobileNavigation = () => {
      console.log('useMobileNavigation - Received closeMobileNavigation event');
      closeMobileMenu();
    };

    window.addEventListener('openRightSidebar', handleRightSidebarOpen);
    window.addEventListener('closeMobileNavigation', handleCloseMobileNavigation);
    
    return () => {
      window.removeEventListener('openRightSidebar', handleRightSidebarOpen);
      window.removeEventListener('closeMobileNavigation', handleCloseMobileNavigation);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isMobile]);

  const value: MobileNavigationContextType = {
    isMobileMenuOpen,
    isMobile,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
  };

  return (
    <MobileNavigationContext.Provider value={value}>
      {children}
    </MobileNavigationContext.Provider>
  );
}

export function useMobileNavigation() {
  const context = useContext(MobileNavigationContext);
  if (context === undefined) {
    throw new Error('useMobileNavigation must be used within a MobileNavigationProvider');
  }
  return context;
}
