import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Palette, MessageCircle, Users } from "lucide-react";
import styles from "./CreatorsCommunity.module.css";

export default function CreatorsCommunity() {
  const features = [
    {
      icon: <Palette className={styles.featureIcon} />,
      title: "Share works-in-progress",
      description: "Show your creative process and get feedback during development"
    },
    {
      icon: <MessageCircle className={styles.featureIcon} />,
      title: "Get critiques/feedback",
      description: "Receive constructive feedback from fellow creative professionals"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Collaborate with creators",
      description: "Find partners for projects and build lasting creative relationships"
    }
  ];


  return (
    <section className={styles.creatorsCommunity} id="creators-community">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>CREATORS</span>
            <Text className={styles.badgeText}>Community</Text>
          </div>
          <H3 className={styles.title}>Hub for Creative Professionals</H3>
          <Text className={styles.subtitle}>
            Designers, animators, developers sharing skills, resources, opportunities
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            A hub for designers, animators, and service providers to share skills and resources. 
            Collaborate, trade feedback, and build better tools for streamers while growing your own creative network.
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Community Benefits</H2>
          
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
