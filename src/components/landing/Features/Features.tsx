"use client";

import { useEffect, useRef } from "react";
import styles from "./Features.module.css";
import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Activity, Monitor, Bot, ShoppingBag, CheckCircle, MessageSquare } from "lucide-react";
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

      // Animate feature items individually
      const featureItems = featuresRef.current?.querySelectorAll(`.${styles.featureItem}`);
      if (featureItems) {
        gsap.fromTo(featureItems, 
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.6, 
            stagger: 0.15,
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

  const hubCards = [
    {
      icon: <ShoppingBag size={24} />,
      title: "Your Creative Marketplace",
      blurb: "Sell assets or find creators for custom work with free listings",
      description: "Your creative marketplace for selling overlays, emotes, avatars, and services - or finding talented creators for custom work. Get 50 free monthly listings with instant downloads where creativity turns into income.",
      highlights: ["50 free monthly listings", "Instant downloads", "Creative marketplace", "Custom work connections"],
      cta: "Explore Marketplace",
      href: "/creator-hub"
    },
    {
      icon: <Activity size={24} />,
      title: "Your Path to Monetization", 
      blurb: "Get discovered by sponsors and land brand deals that pay",
      description: "Connect directly with opportunities to grow your income. Get discovered by sponsors, land brand deals, join the Streami Affiliate program, or promote through our advertising platform.",
      highlights: ["Sponsor discovery", "Brand deal connections", "Streami affiliate program", "Advertisement opportunities"],
      cta: "Start Networking",
      href: "/network-hub"
    },
    {
      icon: <Monitor size={24} />,
      title: "Your All-in-One Creator Profile",
      blurb: "Link socials, track growth, and showcase your brand professionally",
      description: "Your complete creator profile that links all your socials, displays follower counts, and tracks growth with built-in analytics. Customize your profile to stand out and look professional.",
      highlights: ["Social platform linking", "Growth tracking", "Built-in analytics", "Professional customization"],
      cta: "Create Profile",
      href: "/profiles"
    },
    {
      icon: <Bot size={24} />,
      title: "The Heartbeat of Streami",
      blurb: "Connect with creators, share updates, and find collaboration opportunities",
      description: "Join our social feed and community spaces to connect with other creators and streamers. Share updates, find collaboration opportunities, and grow together in dedicated community groups.",
      highlights: ["Social feed interaction", "Collaboration opportunities", "Creator connections", "Community groups"],
      cta: "Join Community",
      href: "/community"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Stay in Sync",
      blurb: "Quick DMs and group chats to collaborate faster with teams",
      description: "From quick DMs to dedicated group chats, our messaging system helps streamers, creators, and teams collaborate faster. Share ideas, chat in real time, and keep projects moving forward.",
      highlights: ["Quick direct messaging", "Group collaboration", "Real-time chat", "Project coordination"],
      cta: "Start Messaging",
      href: "/messaging"
    }
  ];

  return (
    <section className={styles.root} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <H2 className={styles.title} ref={titleRef}>
            Powerful Creator Solutions
          </H2>
          <Text className={styles.subtitle}>
            Everything you need as a creator - all in one powerful platform
          </Text>
        </div>
        
        <div className={styles.featuresGrid} ref={featuresRef}>
          {hubCards.map((card, index) => (
            <div key={index} className={styles.hubCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  {card.icon}
                </div>
                <div className={styles.cardHeaderText}>
                  <H3 className={styles.cardTitle}>{card.title}</H3>
                  <Text className={styles.cardBlurb}>{card.blurb}</Text>
                </div>
              </div>
              <div className={styles.cardContent}>
                <Text className={styles.cardDescription}>{card.description}</Text>
                <div className={styles.cardHighlights}>
                  {card.highlights.map((highlight, idx) => (
                    <div key={idx} className={styles.highlight}>
                      <CheckCircle size={14} />
                      <Text className={styles.highlightText}>{highlight}</Text>
                    </div>
                  ))}
                </div>
                <div className={styles.cardCta}>
                  <Text className={styles.ctaText}>{card.cta}</Text>
                  <div className={styles.ctaIcon}>→</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
