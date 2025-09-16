import { H2, Text } from "@/components/ui/typography/Typography";
import { Users, MessageSquare, Briefcase, Shield, ChevronRight } from "lucide-react";
import styles from "./CreatorConnect.module.css";

export default function CreatorConnect() {
  const features = [
    {
      icon: <Briefcase className={styles.featureIcon} />,
      title: "Post Projects",
      description: "Share your project requirements and connect with the perfect creators for your vision"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Find Talent", 
      description: "Browse verified creators, check portfolios, and build your ideal creative team"
    },
    {
      icon: <MessageSquare className={styles.featureIcon} />,
      title: "Collaborate",
      description: "Built-in messaging and project management tools for seamless communication"
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Secure Payments",
      description: "Escrow system and milestone payments ensure safe transactions for all parties"
    }
  ];

  return (
    <section className={styles.connect} id="creator-connect">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>LIVE</span>
            <Text className={styles.badgeText}>Creator Connect</Text>
          </div>
          <H2 className={styles.title}>Connect & Collaborate</H2>
          <Text className={styles.subtitle}>
            Bridge the gap between talent and opportunity with our secure collaboration platform
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>How Creator Connect Works</H2>
          <div className={styles.featuresFlow}>
            {features.map((feature, index) => (
              <div key={index} className={styles.flowContainer}>
                <div className={styles.featureStep}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.featureIconWrapper}>
                    {feature.icon}
                  </div>
                  <Text className={styles.featureTitle}>{feature.title}</Text>
                  <Text className={styles.featureDescription}>{feature.description}</Text>
                </div>
                {index < features.length - 1 && (
                  <div className={styles.flowArrow}>
                    <ChevronRight className={styles.arrowIcon} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



      </div>
    </section>
  );
}
