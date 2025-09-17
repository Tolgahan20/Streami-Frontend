"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { H1, Text } from "@/components/ui/typography/Typography";
import { ArrowRight } from "lucide-react";
import styles from "./ContactUsHero.module.css";
import gsap from "gsap";

export default function ContactUsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([bannerRef.current, titleRef.current, subtitleRef.current, ctaRef.current], { 
        opacity: 0,
        y: 20 
      });

      // Animate in
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
      
      tl.to(bannerRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.root} ref={rootRef} id="contact-us">
      <div className={styles.inner}>
        <div className={styles.banner} ref={bannerRef}>
          <span className={styles.tag}>CONTACT</span>
          <Text color="muted" variant="small">Get in Touch</Text>
          <Link href="#general-contact" className={styles.link}>
            <Text color="primary" className={styles.linkText} weight="medium" variant="small">Contact Support</Text>
          </Link>
          <Link href="/register" className={styles.downloadLink}>
            <Text color="muted" weight="medium" variant="small">Start Creating</Text>
          </Link>
        </div>

        <div ref={titleRef}>
          <H1 className={styles.title}>
            Let&apos;s Connect
          </H1>
        </div>

        <div ref={subtitleRef}>
          <Text 
            className={styles.subtitle} 
            color="muted"
            variant="large"
          >
            Support, partnerships, press inquiries - communication made easy and direct
          </Text>
        </div>

        <div className={styles.cta} ref={ctaRef}>
          <Button 
            variant="primary" 
            size="lg" 
            className={styles.mainCta}
            rightIcon={<ArrowRight />}
          >
            <Link href="#general-contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
