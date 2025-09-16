"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from "@/components/ui/typography/Typography";
import { Button } from "@/components/ui/button/Button";
import { 
  Sparkles, 
  Calendar, 
  Globe, 
  Upload, 
  Zap,
  TrendingUp,
  Users
} from "lucide-react";
import styles from "./StreamiFeatures.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function StreamiFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single, optimized animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Efficient batch animations
      tl.fromTo(titleRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(featuresRef.current?.children || [], 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(phoneRef.current, 
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.root} ref={sectionRef}>
      <div className={styles.inner}>
        {/* Header Section */}
        <div className={styles.header} ref={titleRef}>
          <div className={styles.badge}>
            <Zap size={16} />
            <span>AI-Powered</span>
          </div>
          <Text variant="h1" className={styles.title}>
            Stream Smarter, Not Harder
          </Text>
          <Text variant="large" color="muted" className={styles.subtitle}>
            Transform your streaming experience with intelligent automation and real-time insights
          </Text>
        </div>

        {/* Simple Features Grid */}
        <div className={styles.simpleGrid} ref={featuresRef}>
          <div className={styles.simpleFeature}>
            <div className={styles.simpleFeatureIcon}>
              <Sparkles size={32} />
            </div>
            <Text variant="h3" className={styles.simpleFeatureTitle}>
              Intelligent Overlays
            </Text>
            <Text color="muted" className={styles.simpleFeatureDescription}>
              AI-generated graphics that adapt to your content in real-time
            </Text>
          </div>

          <div className={styles.simpleFeature}>
            <div className={styles.simpleFeatureIcon}>
              <Calendar size={32} />
            </div>
            <Text variant="h3" className={styles.simpleFeatureTitle}>
              Smart Scheduling
            </Text>
            <Text color="muted" className={styles.simpleFeatureDescription}>
              Data-driven insights to optimize your streaming schedule
            </Text>
          </div>

          <div className={styles.simpleFeature}>
            <div className={styles.simpleFeatureIcon}>
              <Globe size={32} />
            </div>
            <Text variant="h3" className={styles.simpleFeatureTitle}>
              Global Reach
            </Text>
            <Text color="muted" className={styles.simpleFeatureDescription}>
              Multi-language support to connect with audiences worldwide
            </Text>
          </div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.geometricShape} />
        <div className={styles.geometricShape} />
      </div>
    </section>
  );
}
