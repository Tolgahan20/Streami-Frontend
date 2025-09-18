import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Users, Globe, Shield } from "lucide-react";
import styles from "./WhatIsStreami.module.css";

export default function WhatIsStreami() {
  const features = [
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Built by creators, for creators",
      description: "Streami is the first AI-powered streaming Co-Pilot with a hub built for streamers and creators"
    },
    {
      icon: <Globe className={styles.featureIcon} />,
      title: "One centralized hub",
      description: "We combine tools for monetization, collaboration, and community into one platform"
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Ethical and transparent growth",
      description: "From profiles and analytics to marketplaces and sponsorships"
    }
  ];

  return (
    <section className={styles.whatIsStreami} id="what-is-streami">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>PLATFORM</span>
            <Text className={styles.badgeText}>What is Streami</Text>
          </div>
          <H3 className={styles.title}>The First AI-Powered Streaming Co-Pilot</H3>
          <Text className={styles.subtitle}>
            One centralized hub combining monetization, collaboration, and community
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Streami is the first AI-powered streaming Co-Pilot with a hub built for streamers and creators. 
            We combine tools for monetization, collaboration, and community into one platform - from profiles and analytics to marketplaces and sponsorships.
          </Text>
        </div>

        {/* Platform Highlights Grid */}
        <div className={styles.platformHighlights}>
          <H2 className={styles.panelTitle}>Platform Highlights</H2>
          <div className={styles.highlightsGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.highlightCard}>
                <div className={styles.highlightIconContainer}>
                  {feature.icon}
                </div>
                <div className={styles.highlightContent}>
                  <Text className={styles.highlightTitle}>{feature.title}</Text>
                  <Text className={styles.highlightDescription}>{feature.description}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
