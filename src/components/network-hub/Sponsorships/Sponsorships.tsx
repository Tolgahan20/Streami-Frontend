import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Handshake, FileText, MessageCircle, Target } from "lucide-react";
import styles from "./Sponsorships.module.css";

export default function Sponsorships() {
  const features = [
    {
      icon: <Handshake className={styles.featureIcon} />,
      title: "Direct brand connections",
      description: "Connect directly with brands without intermediaries for authentic partnerships"
    },
    {
      icon: <FileText className={styles.featureIcon} />,
      title: "Campaign briefs/tracking",
      description: "Clear campaign briefs with built-in tracking and progress monitoring"
    },
    {
      icon: <MessageCircle className={styles.featureIcon} />,
      title: "Built-in communication tools",
      description: "Seamless communication with brands through integrated messaging system"
    },
    {
      icon: <Target className={styles.featureIcon} />,
      title: "Fair negotiations",
      description: "Transparent negotiation process ensuring fair terms for all parties"
    }
  ];

  return (
    <section className={styles.sponsorships} id="sponsorships">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>PARTNERSHIPS</span>
            <Text className={styles.badgeText}>Sponsorships</Text>
          </div>
          <H3 className={styles.title}>Direct Brand Connections</H3>
          <Text className={styles.subtitle}>
            Pitch, negotiate, and manage campaigns with brands that align with your content
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Connect directly with brands for authentic sponsorships. Pitch your content, 
            negotiate fair terms, and manage campaigns without leaving Streami. Everything 
            is transparent and built for fairness.
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className={styles.toolkitHeader}>
            <Text className={styles.toolkitLabel}>Sponsorship Toolkit</Text>
            <H2 className={styles.toolkitTitle}>Your Sponsorship Toolkit,<br />All in One Place</H2>
            <Text className={styles.toolkitSubtitle}>
              Explore smart, easy-to-use tools designed to help you stand out, work smarter, and achieve your goals faster.
            </Text>
          </div>
          <div className={styles.toolkitGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.toolkitCard}>
                <div className={styles.cardVisual}>
                  <div className={styles.mockupContainer}>
                    <div className={styles.mockupIcon}>
                      {feature.icon}
                    </div>
                    <div className={styles.mockupLines}>
                      <div className={styles.mockupLine} />
                      <div className={styles.mockupLine} />
                      <div className={styles.mockupLine} />
                    </div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <Text className={styles.featureTitle}>{feature.title}</Text>
                  <Text className={styles.featureDescription}>{feature.description}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
