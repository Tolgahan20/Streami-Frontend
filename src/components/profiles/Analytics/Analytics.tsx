import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { TrendingUp, DollarSign, BarChart3, Eye } from "lucide-react";
import styles from "./Analytics.module.css";

export default function Analytics() {
  const features = [
    {
      icon: <TrendingUp className={styles.featureIcon} />,
      title: "Follower/sub growth charts",
      description: "Track follower and subscriber growth across all platforms with detailed trend analysis"
    },
    {
      icon: <DollarSign className={styles.featureIcon} />,
      title: "Sales/commission tracking",
      description: "Monitor your earnings, commissions, and sales performance with comprehensive financial insights"
    },
    {
      icon: <BarChart3 className={styles.featureIcon} />,
      title: "Engagement insights",
      description: "Understand your audience engagement with detailed metrics on views, likes, and interactions"
    },
    {
      icon: <Eye className={styles.featureIcon} />,
      title: "Performance overview",
      description: "Get a comprehensive view of your content performance across all connected platforms"
    }
  ];

  return (
    <section className={styles.analytics} id="analytics">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>INSIGHTS</span>
            <Text className={styles.badgeText}>Analytics</Text>
          </div>
          <H3 className={styles.title}>Track Your Creator Performance</H3>
          <Text className={styles.subtitle}>
            Clear dashboards showing growth, revenue, and engagement across platforms
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            Stay on top of your performance with comprehensive analytics. Track follower growth, 
            sales commissions, and engagement insights across multiple platforms with clear, actionable data visualizations.
          </p>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Performance Insights</H2>
          
          <div className={styles.analyticsGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.analyticsCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.metricIcon}>
                    {feature.icon}
                  </div>
                  <Text className={styles.featureTitle}>{feature.title}</Text>
                </div>
                
                <div className={styles.visualData}>
                  {index === 0 && (
                    <div className={styles.chartBars}>
                      <div className={styles.bar} style={{height: '60%'}} />
                      <div className={styles.bar} style={{height: '80%'}} />
                      <div className={styles.bar} style={{height: '45%'}} />
                      <div className={styles.bar} style={{height: '90%'}} />
                      <div className={styles.bar} style={{height: '70%'}} />
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className={styles.earningsDisplay}>
                      <div className={styles.earningsAmount}>$2,847</div>
                      <div className={styles.earningsChange}>+12.5%</div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className={styles.engagementRings}>
                      <div className={styles.ring} />
                      <div className={styles.ring} />
                      <div className={styles.engagementPercent}>87%</div>
                    </div>
                  )}
                  
                  {index === 3 && (
                    <div className={styles.performanceLines}>
                      <div className={styles.line} />
                      <div className={styles.line} />
                      <div className={styles.line} />
                    </div>
                  )}
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
