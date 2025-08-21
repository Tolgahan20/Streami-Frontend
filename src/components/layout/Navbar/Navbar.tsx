"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Text } from "@/components/ui/typography/Typography";
import ThemeToggle from "@/components/ThemeToggle";
import { megaMenu, type MenuKey } from "@/components/layout/Navbar/data";
import styles from "./Navbar.module.css";
import gsap from "gsap";
import { MoveUpRight } from "lucide-react";

export default function Navbar() {
  const rootRef = useRef<HTMLElement | null>(null);
  const brandRef = useRef<HTMLAnchorElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>("products");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const hide = current > last && current > 64;
      gsap.to(rootRef.current, {
        y: hide ? -70 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
      last = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = mm.add("(max-width: 859px)", () => {
      gsap.to("#mobileMenu", {
        height: open ? "auto" : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [open]);

  // Dropdown reveal animation
  useEffect(() => {
    if (!dropdownRef.current) return;
    
    const items = dropdownRef.current.querySelectorAll(`.${styles.item}`);
    
    // Reset items when dropdown closes
    if (!open) {
      gsap.set(items, { clearProps: "all" });
      return;
    }

    // Animate items when dropdown opens
    gsap.fromTo(items, 
      { 
        y: 8,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
        clearProps: "all" // Clear properties after animation
      }
    );
  }, [open, activeMenu]);

  return (
    <nav
      className={styles.root}
      ref={rootRef as React.MutableRefObject<HTMLElement | null>}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} ref={brandRef}>
          <span className={styles.logo} />
          <Text as="span" className={styles.name}>Streami</Text>
        </Link>
        <div className={styles.links} ref={linksRef}>
          <button
            className={styles.link}
            onMouseEnter={() => {
              setActiveMenu("products");
              setOpen(true);
            }}
          >
            Products
            <svg
              className={`${styles.chev} ${
                open && activeMenu === "products" ? styles.chevOpen : ""
              }`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={styles.link}
            onMouseEnter={() => {
              setActiveMenu("community");
              setOpen(true);
            }}
          >
            Community
            <svg
              className={`${styles.chev} ${
                open && activeMenu === "community" ? styles.chevOpen : ""
              }`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={styles.link}
            onMouseEnter={() => {
              setActiveMenu("learn");
              setOpen(true);
            }}
          >
            Learn
            <svg
              className={`${styles.chev} ${
                open && activeMenu === "learn" ? styles.chevOpen : ""
              }`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link href="#pricing" className={styles.link}>
            Pricing
          </Link>
          <Link href="#downloads" className={styles.link}>
            Downloads
          </Link>
        </div>
        <div className={styles.cta} ref={ctaRef}>
          <Button variant="ghost" size="sm" className={styles.signInBtn}>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="primary" size="sm" className={styles.signUpBtn}>
            <Link href="/register">Sign up</Link>
          </Button>
          <ThemeToggle />

          <button
            className={styles.menuBtn}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Under-nav mega dropdown */}
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className={styles.dropdownInner}>
          {megaMenu[activeMenu].map((item) => (
            <Link key={item.title} href={item.href} className={styles.dropdownLink}>
              {item.title} {item.icon && <MoveUpRight size={18} />}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}