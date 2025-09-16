"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { H1, Text } from "@/components/ui/typography/Typography";
import { ArrowRight } from "lucide-react";
import styles from "./MessagingHero.module.css";
import gsap from "gsap";

export default function MessagingHero() {
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
    <section className={styles.root} ref={rootRef} id="messaging">
      <div className={styles.inner}>
        <div className={styles.banner} ref={bannerRef}>
          <span className={styles.tag}>MESSAGING</span>
          <Text color="muted">Communication Hub</Text>
          <Link href="#general-messages" className={styles.link}>
            <Text color="primary" className={styles.linkText} weight="medium">Send Message</Text>
          </Link>
          <Link href="#streamer-groups" className={styles.downloadLink}>
            <Text color="muted" weight="medium">Join Groups</Text>
          </Link>
        </div>

        <div ref={titleRef}>
          <H1 className={styles.title}>
            Communication<br />
            That Just Works
          </H1>
        </div>

        <div ref={subtitleRef}>
          <Text 
            className={styles.subtitle} 
            color="muted"
            variant="large"
          >
            Simple, effective messaging to keep creators and streamers connected
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
              Start Messaging
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
