import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Layout, MessageSquare, PieChart, Activity } from "lucide-react";
import styles from "./Dashboards.module.css";

export default function Dashboards() {
  const features = [
    {
      icon: <Layout className={styles.featureIcon} />,
      title: "Centralized activity view",
      description: "See all your creator activities, listings, and tasks in one comprehensive dashboard view"
    },
    {
      icon: <MessageSquare className={styles.featureIcon} />,
      title: "Quick message access",
      description: "Access all messages, notifications, and communications from brands and followers instantly"
    },
    {
      icon: <PieChart className={styles.featureIcon} />,
      title: "Earnings/tasks overview",
      description: "Track your earnings, pending tasks, and project progress with visual charts and summaries"
    },
    {
      icon: <Activity className={styles.featureIcon} />,
      title: "Real-time updates",
      description: "Get instant updates on your creator activities and performance metrics as they happen"
    }
  ];

  return (
    <section className={styles.dashboards} id="dashboards">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>MANAGE</span>
            <Text className={styles.badgeText}>Dashboards</Text>
          </div>
          <H3 className={styles.title}>Manage Everything from One Place</H3>
          <Text className={styles.subtitle}>
            Centralized view of listings, messages, commissions, and activity
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            Streamline your creator journey with unified dashboards. Manage all activity from one place - 
            listings, messages, commissions, and more. Designed to make running your creator business simple.
          </p>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Dashboard Features</H2>
          
          <div className={styles.dashboardPreview}>
            <div className={styles.dashboardHeader}>
              <Text className={styles.previewTitle}>Creator Dashboard</Text>
              <div className={styles.statusIndicator}>
                <div className={styles.statusDot} />
                <Text className={styles.statusText}>Live</Text>
              </div>
            </div>
            
            <div className={styles.widgetsGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.widget}>
                  <div className={styles.widgetHeader}>
                    <div className={styles.widgetIcon}>
                      {feature.icon}
                    </div>
                    <div className={styles.widgetActions}>
                      <div className={styles.actionDot} />
                      <div className={styles.actionDot} />
                      <div className={styles.actionDot} />
                    </div>
                  </div>
                  
                  <div className={styles.widgetContent}>
                    <Text className={styles.featureTitle}>{feature.title}</Text>
                    <Text className={styles.featureDescription}>{feature.description}</Text>
                  </div>
                  
                  <div className={styles.widgetFooter}>
                    <div className={styles.widgetData}>
                      {index === 0 && <span>12 active</span>}
                      {index === 1 && <span>3 unread</span>}
                      {index === 2 && <span>$2,847</span>}
                      {index === 3 && <span>Real-time</span>}
                    </div>
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
