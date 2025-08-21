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

      // Animate grid cards individually
      const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards) {
        gsap.fromTo(cards, 
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

        <div className={styles.bentoGrid} ref={gridRef}>
          {/* Top left card - Customize your stream */}
          <div className={`${styles.card} ${styles.topLeftCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.textSection}>
                <H3 className={styles.cardTitle}>Customize your stream</H3>
                <Text className={styles.cardDescription}>
                  Personalize your stream with AI-generated overlays, themes, and alerts.
                </Text>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.browserContent}>
                    <div className={styles.videoPlayer}>
                      <div className={styles.playButton}>▶</div>
                      <div className={styles.goLiveButton}>Go Live</div>
                    </div>
                  </div>
                </div>
                <div className={styles.gearIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Top right card - Optimize your performance */}
          <div className={`${styles.card} ${styles.topRightCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.textSection}>
                <H3 className={styles.cardTitle}>Optimize your performance</H3>
                <Text className={styles.cardDescription}>
                  Improve stream quality with real-time AI-driven recommendations.
                </Text>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.browserContent}>
                    <div className={styles.checkmarkIcon}>✓</div>
                    <div className={styles.wavyLine}></div>
                  </div>
                </div>
                <div className={styles.personIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom left card - Boost viewer interaction */}
          <div className={`${styles.card} ${styles.bottomLeftCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.textSection}>
                <H3 className={styles.cardTitle}>Boost viewer interaction</H3>
                <Text className={styles.cardDescription}>
                  Utilize smart chat tools and interactive features to grow your audience.
                </Text>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.chatBubbles}>
                  <div className={styles.chatBubble}></div>
                  <div className={styles.chatBubble}></div>
                  <div className={styles.chatBubble}></div>
                </div>
                <div className={styles.browserMockup}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.browserContent}>
                    <div className={styles.chatInterface}>
                      <div className={styles.chatUser}>Jane</div>
                      <div className={styles.chatMessage}>Hello!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom right card - Gain valuable insights */}
          <div className={`${styles.card} ${styles.bottomRightCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.textSection}>
                <H3 className={styles.cardTitle}>Gain valuable insights</H3>
                <Text className={styles.cardDescription}>
                  Access analytics and viewer data to understand your stream&apos;s impact.
                </Text>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.browserMockup}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.browserContent}>
                    <div className={styles.analyticsCharts}>
                      <div className={styles.lineChart}></div>
                      <div className={styles.pieChart}></div>
                    </div>
                  </div>
                </div>
                <div className={styles.clockIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
