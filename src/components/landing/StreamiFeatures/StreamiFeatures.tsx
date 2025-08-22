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

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column - Features & Stats */}
          <div className={styles.leftColumn}>
            {/* Features */}
            <div className={styles.features} ref={featuresRef}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Sparkles size={20} />
                </div>
                <div className={styles.featureContent}>
                  <Text variant="h3" className={styles.featureTitle}>
                    Intelligent Overlays
                  </Text>
                  <Text color="muted" className={styles.featureDescription}>
                    AI-generated graphics that adapt to your content in real-time
                  </Text>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Calendar size={20} />
                </div>
                <div className={styles.featureContent}>
                  <Text variant="h3" className={styles.featureTitle}>
                    Smart Scheduling
                  </Text>
                  <Text color="muted" className={styles.featureDescription}>
                    Data-driven insights to optimize your streaming schedule
                  </Text>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Globe size={20} />
                </div>
                <div className={styles.featureContent}>
                  <Text variant="h3" className={styles.featureTitle}>
                    Global Reach
                  </Text>
                  <Text color="muted" className={styles.featureDescription}>
                    Multi-language support to connect with audiences worldwide
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className={styles.rightColumn} ref={phoneRef}>
            <div className={styles.demoContainer}>
              <div className={styles.demoHeader}>
                <div className={styles.demoTabs}>
                  <div className={`${styles.demoTab} ${styles.active}`}>Live</div>
                  <div className={styles.demoTab}>Analytics</div>
                  <div className={styles.demoTab}>Settings</div>
                </div>
              </div>
              
              <div className={styles.demoContent}>
                <div className={styles.demoSection}>
                  <div className={styles.demoMetric}>
                    <TrendingUp size={16} />
                    <span>Viewers: 1,247</span>
                  </div>
                  <div className={styles.demoMetric}>
                    <Users size={16} />
                    <span>Engagement: 89%</span>
                  </div>
                </div>
                
                <div className={styles.demoVisual}>
                  <div className={styles.overlayPreview}>
                    <div className={styles.overlayElement}>Live Now</div>
                    <div className={styles.overlayElement}>New Follower!</div>
                  </div>
                </div>
                
                <div className={styles.demoActions}>
                  <Button variant="primary" size="sm" className={styles.actionButton}>
                    <Upload size={16} />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
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
