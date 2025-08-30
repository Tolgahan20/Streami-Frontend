"use client";

import Link from "next/link";
import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { megaMenu, type MenuKey } from "@/components/layout/Main/Navbar/data";

import styles from "./SecondaryNavbar.module.css";

interface SecondaryNavbarProps {
  visible: boolean;
}

export default function SecondaryNavbar({ visible }: SecondaryNavbarProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);

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
            >
              Creator Hub
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("networkhub")}
            >
              Network Hub
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("profiles")}
            >
              Profiles
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("community")}
            >
              Community
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("messaging")}
            >
              Messaging
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("about-us")}
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
            {activeMenu && megaMenu[activeMenu].map((item) => (
              <Link key={item.title} href={item.href} className={styles.dropdownItem}>
                <span className={styles.dropdownTitle}>{item.title}</span>
                {item.icon && <MoveUpRight size={14} className={styles.dropdownIcon} />}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
