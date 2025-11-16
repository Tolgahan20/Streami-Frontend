"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoveUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { megaMenu, type MenuKey } from "@/components/layout/Main/Navbar/data";
import MobileNavbar from "./MobileNavbar";
import { useAuthNavigation } from "@/lib/utils/authNavigation";

import styles from "./SecondaryNavbar.module.css";

interface SecondaryNavbarProps {
  visible: boolean;
}

export default function SecondaryNavbar({ visible }: SecondaryNavbarProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { handleAuthNavigation } = useAuthNavigation();

  // Handle navigation with optional auto-scroll
  const handleNavigation = (href: string, section?: string) => {
    if (section) {
      // Navigate to page with hash for auto-scroll
      router.push(`${href}#${section}`);
    } else {
      // Navigate to main page
      router.push(href);
    }
    setActiveMenu(null); // Close dropdown after navigation
  };

  // Handle main dropdown trigger click
  const handleMainNavClick = (menuKey: MenuKey) => {
    const mainHref = megaMenu[menuKey].mainHref;
    handleNavigation(mainHref);
  };

  return (
    <>
      <MobileNavbar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      <nav className={`${styles.root} ${visible ? styles.visible : ''} ${activeMenu ? styles.dropdownOpen : ''}`}>
        <div className={styles.inner}>
          <div className={styles.leftSection}>
            <Link href="/" className={styles.brand}>
                <Image src="/logo.png" alt="Streami" width={40} height={40} />
            </Link>
            
            <div className={styles.links}>
              <button
                className={styles.link}
                onMouseEnter={() => setActiveMenu("creatorhub")}
                onClick={() => handleMainNavClick("creatorhub")}
              >
                Creator Hub
              </button>
              <button
                className={styles.link}
                onMouseEnter={() => setActiveMenu("networkhub")}
                onClick={() => handleMainNavClick("networkhub")}
              >
                Network Hub
              </button>
              <button
                className={styles.link}
                onMouseEnter={() => setActiveMenu("profiles")}
                onClick={() => handleMainNavClick("profiles")}
              >
                Profiles
              </button>
              <button
                className={styles.link}
                onMouseEnter={() => setActiveMenu("community")}
                onClick={() => handleMainNavClick("community")}
              >
                Community
              </button>
              <button
                className={styles.link}
                onMouseEnter={() => setActiveMenu("messaging")}
                onClick={() => handleMainNavClick("messaging")}
              >
                Messaging
              </button>
              <button
                className={styles.link}
                onMouseEnter={() => setActiveMenu("about-us")}
                onClick={() => handleMainNavClick("about-us")}
              >
                About Us
              </button>
              <Link href="/contact-us" className={styles.link}>Contact Us</Link>
            </div>
          </div>
          
          <div className={styles.rightSection}>
            <Button 
              variant="ghost" 
              size="sm" 
              className={styles.signInBtn}
              onClick={() => handleAuthNavigation('/login')}
            >
              Sign in
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className={styles.signUpBtn}
              onClick={() => handleAuthNavigation('/register')}
            >
              Sign up
            </Button>
            
            <button
              className={styles.menuBtn}
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      
      {/* Full-width dropdown positioned relative to navbar */}
      {activeMenu && (
        <div 
          className={styles.dropdown}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className={styles.dropdownInner}>
            {activeMenu && megaMenu[activeMenu].items.map((item) => (
              <button
                key={item.title}
                onClick={() => handleNavigation(item.href, item.section)}
                className={styles.dropdownItem}
              >
                <span className={styles.dropdownTitle}>{item.title}</span>
                {item.icon && <MoveUpRight size={14} className={styles.dropdownIcon} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
