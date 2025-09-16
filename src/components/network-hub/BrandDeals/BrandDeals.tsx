import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { CheckSquare, Calendar, DollarSign, Users } from "lucide-react";
import styles from "./BrandDeals.module.css";

export default function BrandDeals() {
  const features = [
    {
      icon: <CheckSquare className={styles.featureIcon} />,
      title: "Structured deliverables",
      description: "Clear project scope with defined deliverables and milestones for all parties"
    },
    {
      icon: <Calendar className={styles.featureIcon} />,
      title: "Timeline management",
      description: "Built-in project timeline tracking with automated reminders and updates"
    },
    {
      icon: <DollarSign className={styles.featureIcon} />,
      title: "Fair payments",
      description: "Secure payment processing with milestone-based releases and escrow protection"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Collaborative workspace",
      description: "Shared workspace for brands and creators to collaborate efficiently"
    }
  ];

  return (
    <section className={styles.brandDeals} id="brand-deals">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>CONTRACTS</span>
            <Text className={styles.badgeText}>Brand Deals</Text>
          </div>
          <H3 className={styles.title}>Structured Brand Collaborations</H3>
          <Text className={styles.subtitle}>
            One-off or long-term partnerships with clear deliverables and timelines
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Manage brand collaborations with structured deliverables and timeline management. 
            Both sides know exactly where projects stand with fair payments and clear expectations throughout.
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Why Choose Our Platform</H2>
          <div className={styles.featuresTable}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureRow}>
                <div className={styles.featureNumber}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.featureIconCell}>
                  {feature.icon}
                </div>
                <div className={styles.featureInfo}>
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
