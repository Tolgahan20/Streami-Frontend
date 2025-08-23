"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = {
  apps: {
    title: "Apps",
    items: [
      { label: "Web App", href: "/app" },
      { label: "Desktop", href: "/download" },
    ]
  },
  ecosystem: {
    title: "Ecosystem",
    items: [
      { label: "Features", href: "/features" },
      { label: "AI Integration", href: "/ai" },
    ]
  },
  organization: {
    title: "Organization",
    items: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Brand", href: "/brand" },
      { label: "Careers", href: "/careers" },
    ]
  },
  help: {
    title: "Help",
    items: [
      { label: "Overview", href: "/docs" },
      { label: "Getting started", href: "/docs/getting-started" },
      { label: "Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
    ]
  },
  collaborate: {
    title: "Collaborate",
    items: [
      { label: "Community", href: "/community" },
      { label: "Request a feature", href: "/feature-request" },
      { label: "Blog", href: "/blog" },
      { label: "Translations", href: "/translations" },
    ]
  },
  developers: {
    title: "Developers",
    items: [
      { label: "API Docs", href: "/developers" },
      { label: "Insights", href: "/insights" },
      { label: "Documentation", href: "/docs" },
    ]
  },
};

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon} />
              <span className={styles.logoText}>Streami</span>
            </Link>
            <p className={styles.tagline}>
              AI-powered platform for streamers and digital creators
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className={styles.section}>
              <h3 className={styles.title}>{section.title}</h3>
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <span>© {new Date().getFullYear()} Streami Ltd.</span>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/security">Security</Link>
          </div>
          <div className={styles.social}>
            <a href="https://twitter.com/streami" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://youtube.com/streami" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://github.com/streami" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
