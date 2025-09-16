import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Link2, BarChart3, Zap, TrendingUp } from "lucide-react";
import styles from "./StreamiAffiliate.module.css";

export default function StreamiAffiliate() {
  const features = [
    {
      icon: <Link2 className={styles.featureIcon} />,
      title: "Unique referral links",
      description: "Get personalized referral links to track your promotional activities and commissions"
    },
    {
      icon: <BarChart3 className={styles.featureIcon} />,
      title: "Dashboard earnings tracking",
      description: "Real-time dashboard to monitor clicks, conversions, and earnings with detailed analytics"
    },
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "Instant payouts",
      description: "Fast and reliable payment processing with multiple payout options available"
    },
    {
      icon: <TrendingUp className={styles.featureIcon} />,
      title: "Growing community",
      description: "Be part of our expanding creator community and earn while helping others discover Streami"
    }
  ];

  return (
    <section className={styles.affiliate} id="streami-affiliate">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>AFFILIATE</span>
            <Text className={styles.badgeText}>Streami Affiliate</Text>
          </div>
          <H3 className={styles.title}>Earn by Growing Our Community</H3>
          <Text className={styles.subtitle}>
            Share your link, grow the community, earn commission on every signup
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            The Streami Affiliate program lets you earn by promoting our platform. Get unique referral links, 
            track earnings on your dashboard, and receive instant payouts for every signup or sale you drive.
          </Text>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className={styles.benefitsHeader}>
            <div className={styles.badge}>
              <span className={styles.tag}>AFFILIATE</span>
              <Text className={styles.badgeText}>Our Benefits</Text>
            </div>
            <H2 className={styles.benefitsTitle}>Earn by Growing Our Community</H2>
            <Text className={styles.benefitsSubtitle}>
              Share your link, grow the community, earn commission on every signup
            </Text>
          </div>
          
          <div className={styles.benefitsShowcase}>
            <div className={styles.showcaseLeft}>
              <div className={styles.primaryBenefit}>
                <div className={styles.primaryIcon}>
                  {features[0].icon}
                </div>
                <div className={styles.primaryContent}>
                  <Text className={styles.primaryTitle}>{features[0].title}</Text>
                  <Text className={styles.primaryDescription}>{features[0].description}</Text>
                  <div className={styles.viewMore}>
                    <Text color="primary" weight="medium">View more →</Text>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.showcaseRight}>
              {features.slice(1).map((feature, index) => (
                <div key={index + 1} className={styles.secondaryBenefit}>
                  <div className={styles.benefitVisual}>
                    <div className={styles.benefitIcon}>
                      {feature.icon}
                    </div>
                  </div>
                  <div className={styles.benefitContent}>
                    <Text className={styles.featureTitle}>{feature.title}</Text>
                    <Text className={styles.featureDescription}>{feature.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
