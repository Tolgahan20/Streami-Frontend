import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Shield, BarChart, Wallet, Eye } from "lucide-react";
import styles from "./Advertising.module.css";

export default function Advertising() {
  const features = [
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "No data selling",
      description: "We protect user privacy by never selling personal data to third parties"
    },
    {
      icon: <BarChart className={styles.featureIcon} />,
      title: "Clear metrics/analytics",
      description: "Comprehensive analytics dashboard with transparent performance metrics and insights"
    },
    {
      icon: <Wallet className={styles.featureIcon} />,
      title: "Flexible budgets",
      description: "Advertising solutions that work for startups to enterprise brands with scalable pricing"
    },
    {
      icon: <Eye className={styles.featureIcon} />,
      title: "Transparent placements",
      description: "Clear ad placement policies with no hidden algorithms or manipulative targeting"
    }
  ];

  return (
    <section className={styles.advertising} id="advertising">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>ETHICAL</span>
            <Text className={styles.badgeText}>Advertising</Text>
          </div>
          <H3 className={styles.title}>Ethical Advertising for Modern Brands</H3>
          <Text className={styles.subtitle}>
            Transparent, effective placements without selling user data
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Our advertising is built on transparency and ethics. No selling user data - just simple, 
            effective ad placements with clear metrics, analytics, and flexible budgets for brands of all sizes.
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Our Advertising Principles</H2>
          <div className={styles.principlesGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.principleItem}>
                <div className={styles.principleHeader}>
                  <div className={styles.principleIcon}>
                    {feature.icon}
                  </div>
                  <Text className={styles.featureTitle}>{feature.title}</Text>
                </div>
                <Text className={styles.featureDescription}>{feature.description}</Text>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
