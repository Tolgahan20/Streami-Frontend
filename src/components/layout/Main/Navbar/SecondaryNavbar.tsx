"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { megaMenu, type MenuKey } from "@/components/layout/Main/Navbar/data";

import styles from "./SecondaryNavbar.module.css";

interface SecondaryNavbarProps {
  visible: boolean;
}

export default function SecondaryNavbar({ visible }: SecondaryNavbarProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const router = useRouter();

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
    <nav className={`${styles.root} ${visible ? styles.visible : ''} ${activeMenu ? styles.dropdownOpen : ''}`}>
      <div className={styles.inner}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.brand}>
            <span className={styles.logo} />
            <span className={styles.name}>Streami</span>
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
            <Link href="/contact" className={styles.link}>Contact Us</Link>
          </div>
        </div>
        
        <div className={styles.rightSection}>
          <Button variant="ghost" size="sm" className={styles.signInBtn}>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="primary" size="sm" className={styles.signUpBtn}>
            <Link href="/register">Sign up</Link>
          </Button>
          
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
  );
}
