"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import { Button } from "@/components/ui/button/Button";
import { H1, Text } from "@/components/ui/typography/Typography";
import gsap from "gsap";
import { ArrowRightIcon } from "lucide-react";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
    <section className={styles.root} ref={rootRef}>


      <div className={styles.inner}>
        <div className={styles.banner} ref={bannerRef}>
          <span className={styles.tag}>NEW</span>
          <Text color="muted" variant="small">AI-powered Co-Pilot assistant</Text>
          <Link href="/creator-hub" className={styles.link}>
            <Text color="primary" className={styles.linkText} weight="medium" variant="small">See Hub</Text>
          </Link>
          <Link href="/register" className={styles.downloadLink}>
            <Text color="muted" weight="medium" variant="small">Watch Demo</Text>
          </Link>
        </div>

        <div ref={titleRef}>
          <H1 className={styles.title}>
            The First AI-Powered<br />
            Hub for Creators
          </H1>
        </div>

        <div ref={subtitleRef}>
          <Text 
            className={styles.subtitle} 
            color="muted"
            variant="large"
          >
            Our AI Co-Pilot gives you ideas, tips, and tools to boost your journey while you access everything you need - from marketplaces to sponsorships to community - in one powerful hub.
          </Text>
        </div>

        <div className={styles.cta} ref={ctaRef}>
          <Button 
            variant="primary" 
            size="lg" 
            className={styles.mainCta}
            rightIcon={<ArrowRightIcon />}
          >
            <Link href="/register">
              Start Creating
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className={styles.secondaryCta}
          >
            <Link href="#demo">
              Watch Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}