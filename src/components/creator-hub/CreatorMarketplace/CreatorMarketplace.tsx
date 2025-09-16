import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Download, DollarSign, Star, Shield, Monitor, Bot, Smile, Bell, Sparkles, Video } from "lucide-react";
import styles from "./CreatorMarketplace.module.css";

export default function CreatorMarketplace() {
  const features = [
    {
      icon: <Download className={styles.featureIcon} />,
      title: "Instant secure downloads",
      description: "Get your assets immediately after purchase with secure delivery"
    },
    {
      icon: <DollarSign className={styles.featureIcon} />,
      title: "50 free monthly listings",
      description: "Creators get 50 free monthly listings with transparent 12% commission"
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Transparent 12% commission",
      description: "Clear, fair pricing with transparent commission structure"
    },
    {
      icon: <Star className={styles.featureIcon} />,
      title: "Ratings and reviews",
      description: "Community ratings and reviews ensure high-quality assets"
    }
  ];

      const categories = [
        { name: "Stream Overlays", count: "2.1K", icon: <Monitor className={styles.categoryIconSvg} /> },
        { name: "VTuber Models", count: "850", icon: <Bot className={styles.categoryIconSvg} /> },
        { name: "Emote Packs", count: "5.3K", icon: <Smile className={styles.categoryIconSvg} /> },
        { name: "Alerts & Sounds", count: "1.8K", icon: <Bell className={styles.categoryIconSvg} /> },
        { name: "Logo Designs", count: "3.2K", icon: <Sparkles className={styles.categoryIconSvg} /> },
        { name: "Stream Scenes", count: "1.5K", icon: <Video className={styles.categoryIconSvg} /> }
      ];


  return (
    <section className={styles.marketplace} id="creator-marketplace">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>NEW</span>
            <Text className={styles.badgeText}>Creator Marketplace</Text>
          </div>
          <H3 className={styles.title}>Your One-Stop Creator Marketplace</H3>
          <Text className={styles.subtitle}>
            From streaming equipment to VTuber rigs - everything streaming, all in one place
          </Text>
        </div>

        {/* Categories Section */}
        <div className={styles.categoriesSection}>
          <H2 className={styles.sectionTitle}>Popular Categories</H2>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {/* Duplicate categories for seamless loop */}
              {[...categories, ...categories].map((category, index) => (
                <div key={index} className={styles.categoryItem}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <div className={styles.categoryContent}>
                    <Text className={styles.categoryName}>{category.name}</Text>
                    <Text className={styles.categoryCount}>{category.count} items</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <H2 className={styles.sectionTitle}>Highlights</H2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <div className={styles.featureIconWrapper}>
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
