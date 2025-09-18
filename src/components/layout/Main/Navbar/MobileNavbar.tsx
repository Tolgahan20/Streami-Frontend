"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/Button";
import { Text } from "@/components/ui/typography/Typography";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { megaMenu, type MenuKey } from "./data";
import { useAuthNavigation } from "@/lib/utils/authNavigation";
import styles from "./MobileNavbar.module.css";

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavbar({ isOpen, onClose }: MobileNavbarProps) {
  const router = useRouter();
  const { handleAuthNavigation } = useAuthNavigation();
  const [expandedMenu, setExpandedMenu] = useState<MenuKey | null>(null);

  // Handle navigation with optional auto-scroll
  const handleNavigation = (href: string, section?: string) => {
    if (section) {
      router.push(`${href}#${section}`);
    } else {
      router.push(href);
    }
    onClose(); // Close mobile menu after navigation
  };

  // Handle main menu item click - either navigate or expand submenu
  const handleMainMenuClick = (menuKey: MenuKey) => {
    const menu = megaMenu[menuKey];
    
    if (menu.items.length > 0) {
      // Has submenu - toggle expansion
      setExpandedMenu(expandedMenu === menuKey ? null : menuKey);
    } else {
      // No submenu - navigate directly
      handleNavigation(menu.mainHref);
    }
  };

  // Reset expanded menu when mobile nav closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedMenu(null);
    }
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" className={styles.brand} onClick={onClose}>
           <Image src="/logo-dark.png" alt="Streami" width={56} height={56} />
          </Link>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={styles.navigation}>
          
          {/* Creator Hub */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleMainMenuClick("creatorhub")}
            >
              <span>Creator Hub</span>
              {megaMenu.creatorhub.items.length > 0 && (
                expandedMenu === "creatorhub" ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
              )}
            </button>
            {expandedMenu === "creatorhub" && (
              <div className={styles.submenu}>
                <button 
                  className={styles.submenuMainLink}
                  onClick={() => handleNavigation(megaMenu.creatorhub.mainHref)}
                >
                  Creator Hub Overview
                </button>
                {megaMenu.creatorhub.items.map((item) => (
                  <button
                    key={item.title}
                    className={styles.submenuLink}
                    onClick={() => handleNavigation(item.href, item.section)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Network Hub */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleMainMenuClick("networkhub")}
            >
              <span>Network Hub</span>
              {megaMenu.networkhub.items.length > 0 && (
                expandedMenu === "networkhub" ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
              )}
            </button>
            {expandedMenu === "networkhub" && (
              <div className={styles.submenu}>
                <button 
                  className={styles.submenuMainLink}
                  onClick={() => handleNavigation(megaMenu.networkhub.mainHref)}
                >
                  Network Hub Overview
                </button>
                {megaMenu.networkhub.items.map((item) => (
                  <button
                    key={item.title}
                    className={styles.submenuLink}
                    onClick={() => handleNavigation(item.href, item.section)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profiles */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleMainMenuClick("profiles")}
            >
              <span>Profiles</span>
              {megaMenu.profiles.items.length > 0 && (
                expandedMenu === "profiles" ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
              )}
            </button>
            {expandedMenu === "profiles" && (
              <div className={styles.submenu}>
                <button 
                  className={styles.submenuMainLink}
                  onClick={() => handleNavigation(megaMenu.profiles.mainHref)}
                >
                  Profiles Overview
                </button>
                {megaMenu.profiles.items.map((item) => (
                  <button
                    key={item.title}
                    className={styles.submenuLink}
                    onClick={() => handleNavigation(item.href, item.section)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Community */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleMainMenuClick("community")}
            >
              <span>Community</span>
              {megaMenu.community.items.length > 0 && (
                expandedMenu === "community" ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
              )}
            </button>
            {expandedMenu === "community" && (
              <div className={styles.submenu}>
                <button 
                  className={styles.submenuMainLink}
                  onClick={() => handleNavigation(megaMenu.community.mainHref)}
                >
                  Community Overview
                </button>
                {megaMenu.community.items.map((item) => (
                  <button
                    key={item.title}
                    className={styles.submenuLink}
                    onClick={() => handleNavigation(item.href, item.section)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messaging */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleMainMenuClick("messaging")}
            >
              <span>Messaging</span>
              {megaMenu.messaging.items.length > 0 && (
                expandedMenu === "messaging" ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
              )}
            </button>
            {expandedMenu === "messaging" && (
              <div className={styles.submenu}>
                <button 
                  className={styles.submenuMainLink}
                  onClick={() => handleNavigation(megaMenu.messaging.mainHref)}
                >
                  Messaging Overview
                </button>
                {megaMenu.messaging.items.map((item) => (
                  <button
                    key={item.title}
                    className={styles.submenuLink}
                    onClick={() => handleNavigation(item.href, item.section)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About Us */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleMainMenuClick("about-us")}
            >
              <span>About Us</span>
              {megaMenu["about-us"].items.length > 0 && (
                expandedMenu === "about-us" ? 
                  <ChevronDown size={20} /> : 
                  <ChevronRight size={20} />
              )}
            </button>
            {expandedMenu === "about-us" && (
              <div className={styles.submenu}>
                <button 
                  className={styles.submenuMainLink}
                  onClick={() => handleNavigation(megaMenu["about-us"].mainHref)}
                >
                  About Us Overview
                </button>
                {megaMenu["about-us"].items.map((item) => (
                  <button
                    key={item.title}
                    className={styles.submenuLink}
                    onClick={() => handleNavigation(item.href, item.section)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contact Us */}
          <div className={styles.menuItem}>
            <button 
              className={styles.mainLink}
              onClick={() => handleNavigation("/contact-us")}
            >
              <span>Contact Us</span>
            </button>
          </div>

        </nav>

        {/* CTA Buttons */}
        <div className={styles.cta}>
          <Button 
            variant="ghost" 
            size="lg" 
            className={styles.signInBtn}
            onClick={() => handleAuthNavigation("/login")}
          >
            Sign in
          </Button>
          <Button 
            variant="primary" 
            size="lg" 
            className={styles.signUpBtn}
            onClick={() => handleAuthNavigation("/register")}
          >
            Sign up
          </Button>
        </div>

      </div>
    </div>
  );
}
