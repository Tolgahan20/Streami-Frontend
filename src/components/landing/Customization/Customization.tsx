"use client";

import { useEffect, useRef } from "react";
import styles from "./Customization.module.css";
import { H2, Text, H3 } from "@/components/ui/typography/Typography";
import gsap from "gsap";

export default function Customization() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, gridRef.current], { 
        opacity: 0,
        y: 30 
      });

      // Animate title and grid in
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
        .to(gridRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");

      // Animate features individually
      const features = gridRef.current?.querySelectorAll(`.${styles.feature}`);
      if (features) {
        gsap.fromTo(features, 
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
        <div className={styles.header}>
          <H2 className={styles.title} ref={titleRef}>
            Customize your stream
          </H2>
          <Text className={styles.description}>
            Personalize your stream with AI-generated overlays, themes, and alerts.
          </Text>
        </div>

        <div className={styles.featuresGrid} ref={gridRef}>
          {/* Feature 1 - Customize your stream */}
          <div className={styles.feature}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className={styles.featureContent}>
              <H3 className={styles.featureTitle}>Customize your stream</H3>
              <Text className={styles.featureDescription}>
                Personalize your stream with AI-generated overlays, themes, and alerts.
              </Text>
              <div className={styles.featureTags}>
                <span className={styles.tag}>AI Overlays</span>
                <span className={styles.tag}>Custom Themes</span>
                <span className={styles.tag}>Smart Alerts</span>
              </div>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.streamPreview}>
                <div className={styles.streamElement}>Go Live</div>
                <div className={styles.streamOverlay}></div>
              </div>
            </div>
          </div>

          {/* Feature 2 - Optimize your performance */}
          <div className={styles.feature}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className={styles.featureContent}>
              <H3 className={styles.featureTitle}>Optimize your performance</H3>
              <Text className={styles.featureDescription}>
                Improve stream quality with real-time AI-driven recommendations.
              </Text>
              <div className={styles.featureTags}>
                <span className={styles.tag}>Quality Boost</span>
                <span className={styles.tag}>AI Insights</span>
                <span className={styles.tag}>Real-time</span>
              </div>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.performanceChart}>
                <div className={styles.chartBar} style={{height: '60%'}}></div>
                <div className={styles.chartBar} style={{height: '80%'}}></div>
                <div className={styles.chartBar} style={{height: '95%'}}></div>
                <div className={styles.chartBar} style={{height: '70%'}}></div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Boost viewer interaction */}
          <div className={styles.feature}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className={styles.featureContent}>
              <H3 className={styles.featureTitle}>Boost viewer interaction</H3>
              <Text className={styles.featureDescription}>
                Utilize smart chat tools and interactive features to grow your audience.
              </Text>
              <div className={styles.featureTags}>
                <span className={styles.tag}>Smart Chat</span>
                <span className={styles.tag}>Engagement</span>
                <span className={styles.tag}>Growth Tools</span>
              </div>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.chatDemo}>
                <div className={styles.chatMessage}>
                  <div className={styles.chatAvatar}></div>
                  <div className={styles.chatText}>Amazing stream! 🔥</div>
                </div>
                <div className={styles.chatMessage}>
                  <div className={styles.chatAvatar}></div>
                  <div className={styles.chatText}>Love this content!</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 - Gain valuable insights */}
          <div className={styles.feature}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className={styles.featureContent}>
              <H3 className={styles.featureTitle}>Gain valuable insights</H3>
              <Text className={styles.featureDescription}>
                Access analytics and viewer data to understand your stream&apos;s impact.
              </Text>
              <div className={styles.featureTags}>
                <span className={styles.tag}>Analytics</span>
                <span className={styles.tag}>Data Insights</span>
                <span className={styles.tag}>Growth Metrics</span>
              </div>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.analyticsPreview}>
                <div className={styles.analyticsLine}></div>
                <div className={styles.analyticsStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>89%</span>
                    <span className={styles.statLabel}>Engagement</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>1.2K</span>
                    <span className={styles.statLabel}>Viewers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
