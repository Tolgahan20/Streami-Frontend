import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Share, MessageSquare, Users } from "lucide-react";
import styles from "./CreatorGroups.module.css";

export default function CreatorGroups() {
  const features = [
    {
      icon: <Share className={styles.featureIcon} />,
      title: "Share progress updates",
      description: "Creator Groups are where designers, animators, and developers come together"
    },
    {
      icon: <MessageSquare className={styles.featureIcon} />,
      title: "Request feedback",
      description: "Share progress updates, request feedback, and collaborate on new projects"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Collaborate on projects",
      description: "Collaborate on new projects that push the streaming industry forward"
    }
  ];

  return (
    <section className={styles.creatorGroups} id="creator-groups">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>CREATORS</span>
            <Text className={styles.badgeText}>Creator Groups</Text>
          </div>
          <H3 className={styles.title}>Creative Collaboration Spaces</H3>
          <Text className={styles.subtitle}>
            Where designers, animators, developers share progress and collaborate
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            Creator Groups are where designers, animators, and developers come together. 
            Share progress updates, request feedback, and collaborate on new projects that push the streaming industry forward.
          </p>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Collaboration Features</H2>
          
          <div className={styles.featuresList}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  {feature.icon}
                </div>
                <div className={styles.featureContent}>
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
