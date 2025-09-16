"use client";

import { useEffect, useRef } from "react";
import { AnchorLink } from "@/components/ui/AnchorLink/AnchorLink";
import styles from "./PageCta.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button/Button";
import { H2, Text } from "@/components/ui/typography/Typography";

interface PageCtaProps {
  badge?: string;
  banner?: string; // Alternative name for badge
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export default function PageCta({ badge, banner, title, subtitle, primaryCta, secondaryCta }: PageCtaProps) {
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
          toggleActions: "play none none reverse"
        }
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.root} ref={rootRef}>
      <div className={styles.inner}>
        <div className={styles.content} ref={contentRef}>
          {(badge || banner) && (
            <div className={styles.badge}>
              <span className={styles.dot} />
              <Text color="foreground" weight="medium">
                {badge || banner}
              </Text>
            </div>
          )}
          
          <H2 className={styles.title}>
            {title}
          </H2>
          
          <Text 
            variant="large" 
            color="muted" 
            className={styles.subtitle}
          >
            {subtitle}
          </Text>

          <div className={styles.cta}>
              <AnchorLink href={primaryCta.href}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className={styles.mainCta}
                >
                  {primaryCta.text}
                </Button>
              </AnchorLink>
            
            {secondaryCta && (
              <AnchorLink href={secondaryCta.href}>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className={styles.secondaryCta}
                >
                  {secondaryCta.text}
                </Button>
              </AnchorLink>
            )}
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
