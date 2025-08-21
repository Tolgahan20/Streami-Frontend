"use client";

import { useEffect, useRef } from "react";
import styles from "./Features.module.css";
import { H2, H3,  Text } from "@/components/ui/typography/Typography";
import gsap from "gsap";

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, featuresRef.current], { 
        opacity: 0,
        y: 30 
      });

      // Animate in
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(featuresRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");

      // Animate feature cards individually
      const featureCards = featuresRef.current?.querySelectorAll(`.${styles.featureCard}`);
      if (featureCards) {
        gsap.fromTo(featureCards, 
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.root} ref={sectionRef}>
      <div className={styles.container}>
        <H2 className={styles.title} ref={titleRef}>
          Powerful Features for Streamers
        </H2>
        
        <div className={styles.features} ref={featuresRef}>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9l3 3m0 0l3-3m-3 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <H3>Live Insights</H3>
            <Text color="muted">Access realtime analytics during your streams</Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <H3>Stream Overlays</H3>
            <Text color="muted">Enhance your stream with custom overlays</Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <H3>AI Co-Pilot</H3>
            <Text color="muted">Let our AI assist you with automated tips and prompts</Text>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <H3>Creator Marketplace</H3>
            <Text color="muted">Discover and sell stream assets</Text>
          </div>
        </div>
      </div>
    </section>
  );
}
