"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Cta.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button/Button";
import { H2, Text } from "@/components/ui/typography/Typography";

export default function Cta() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(contentRef.current, {
        y: 40,
        opacity: 0
      });

      // Create animation
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse" // play on enter, reverse on leave
        }
      });
    }, rootRef);

    return () => {
      ctx.revert();
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.root} ref={rootRef}>
      <div className={styles.inner}>
        <div className={styles.content} ref={contentRef}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            <Text color="foreground" weight="medium">
              Ready to Transform Your Stream?
            </Text>
          </div>
          
          <H2 className={styles.title}>
            Start Creating<br />
            with AI Today
          </H2>
          
          <Text 
            variant="large" 
            color="muted" 
            className={styles.subtitle}
          >
            Join thousands of content creators who are already using Streami to enhance their streams
          </Text>

          <div className={styles.cta}>
            <Button 
              variant="primary" 
              size="lg" 
              className={styles.mainCta}
            >
              <Link href="/get-started">
                GET STARTED
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className={styles.bg}>
        <div className={styles.gradientLeft} />
        <div className={styles.gradientRight} />
      </div>
    </section>
  );
}