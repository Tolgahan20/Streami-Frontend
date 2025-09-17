"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { H1, Text } from "@/components/ui/typography/Typography";
import { ArrowRight } from "lucide-react";
import styles from "./CreatorHubHero.module.css";
import gsap from "gsap";

export default function CreatorHubHero() {
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
    <section className={styles.root} ref={rootRef} id="creator-hub">
      <div className={styles.inner}>
        <div className={styles.banner} ref={bannerRef}>
          <span className={styles.tag}>NEW</span>
          <Text 
            color="muted" 
            style={{ 
              fontSize: isMobile ? '0.8rem' : '1rem', 
              lineHeight: '1.4' 
            }}
          >
            Creator Hub Platform
          </Text>
          <Link href="#creator-marketplace" className={styles.link}>
            <Text 
              color="primary" 
              className={styles.linkText} 
              weight="medium"
              style={{ 
                fontSize: isMobile ? '0.8rem' : '1rem', 
                lineHeight: '1.4' 
              }}
            >
              Browse Marketplace
            </Text>
          </Link>
          <Link href="#creator-connect" className={styles.downloadLink}>
            <Text 
              color="muted" 
              weight="medium"
              style={{ 
                fontSize: isMobile ? '0.8rem' : '1rem', 
                lineHeight: '1.4' 
              }}
            >
              Find Collaborators
            </Text>
          </Link>
        </div>

        <div ref={titleRef}>
          <H1 className={styles.title}>
            Where Creativity<br />
            Meets Opportunity
          </H1>
        </div>

        <div ref={subtitleRef}>
          <Text 
            className={styles.subtitle} 
            color="muted"
            variant="large"
          >
            Your complete ecosystem to sell, share, and collaborate with talented creators worldwide
          </Text>
        </div>

        <div className={styles.cta} ref={ctaRef}>
          <Button 
            variant="primary" 
            size="lg" 
            className={styles.mainCta}
            rightIcon={<ArrowRight />}
          >
            <Link href="/register">
              Start Creating Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
