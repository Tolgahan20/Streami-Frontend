import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { RefreshCw, Radio, Link2, Users } from "lucide-react";
import styles from "./SocialLinks.module.css";

export default function SocialLinks() {
  const features = [
    {
      icon: <RefreshCw className={styles.featureIcon} />,
      title: "Auto-sync follower data",
      description: "Automatically sync follower counts and subscriber numbers across all connected platforms"
    },
    {
      icon: <Radio className={styles.featureIcon} />,
      title: "Live status icons",
      description: "Real-time status indicators show when you're live across different streaming platforms"
    },
    {
      icon: <Link2 className={styles.featureIcon} />,
      title: "Easy updates/linking",
      description: "Simple one-click linking and updating of social platform connections and settings"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Unified audience view",
      description: "See all your followers and subscribers from different platforms in one centralized view"
    }
  ];

  return (
    <section className={styles.socialLinks} id="social-links">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>CONNECT</span>
            <Text className={styles.badgeText}>Social Links</Text>
          </div>
          <H3 className={styles.title}>Connect All Your Platforms</H3>
          <Text className={styles.subtitle}>
            Auto-sync Twitch, YouTube, TikTok and more - followers see everything
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Connect all your platforms so audiences can follow you everywhere. Follower counts, 
            subscriber numbers, and live status are displayed automatically with easy updates and seamless linking.
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Platform Connections</H2>
          
          <div className={styles.platformsHub}>
            <div className={styles.centralHub}>
              <div className={styles.hubIcon}>
                <Users className={styles.centralIcon} />
              </div>
              <Text className={styles.hubTitle}>Your Profile</Text>
            </div>
            
            {features.map((feature, index) => (
              <div key={index} className={styles.platformConnection}>
                <div className={styles.connectionLine} />
                <div className={styles.platformCard}>
                  <div className={styles.platformIcon}>
                    {feature.icon}
                  </div>
                  <div className={styles.platformInfo}>
                    <Text className={styles.featureTitle}>{feature.title}</Text>
                    <Text className={styles.featureDescription}>{feature.description}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
