"use client";

import Link from "next/link";
import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

import styles from "./SecondaryNavbar.module.css";

interface SecondaryNavbarProps {
  visible: boolean;
}

export default function SecondaryNavbar({ visible }: SecondaryNavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
              onMouseEnter={() => setActiveMenu("products")}
            >
              Products
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("community")}
            >
              Community
            </button>
            <button
              className={styles.link}
              onMouseEnter={() => setActiveMenu("learn")}
            >
              Learn
            </button>
            <Link href="#pricing" className={styles.link}>Pricing</Link>
            <Link href="#downloads" className={styles.link}>Downloads</Link>
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
            {activeMenu === "products" && (
              <>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Editor</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Format</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Runtime</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Renderer</span>
                  <MoveUpRight size={14} className={styles.dropdownIcon} />
                </div>
              </>
            )}
            {activeMenu === "community" && (
              <>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Community</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Marketplace</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Experts</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Merch</span>
                </div>
              </>
            )}
            {activeMenu === "learn" && (
              <>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Docs</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Tutorials</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Blog</span>
                </div>
                <div className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Examples</span>
                  <MoveUpRight size={14} className={styles.dropdownIcon} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
