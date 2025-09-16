import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Users, Mic, TrendingUp } from "lucide-react";
import styles from "./StreamersCommunity.module.css";

export default function StreamersCommunity() {
  const features = [
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Topic-based groups",
      description: "Join specialized groups focused on specific streaming topics and interests"
    },
    {
      icon: <Mic className={styles.featureIcon} />,
      title: "Peer-to-peer learning",
      description: "Learn from experienced streamers and share your knowledge with newcomers"
    },
    {
      icon: <TrendingUp className={styles.featureIcon} />,
      title: "Stream growth support",
      description: "Get advice and strategies to grow your audience and improve your content"
    }
  ];

  const groups = [
    {
      name: "Streaming Setup & Gear",
      members: "2.3k",
      topic: "Hardware & Software",
      color: "#5F4FFF",
      posts: "142 posts this week"
    },
    {
      name: "Content Creation Tips",
      members: "4.1k", 
      topic: "Growth & Strategy",
      color: "#FF6B6B",
      posts: "89 posts this week"
    },
    {
      name: "Gaming Streamers",
      members: "7.8k",
      topic: "Gaming Content",
      color: "#4ECDC4", 
      posts: "203 posts this week"
    },
    {
      name: "Just Chatting Community",
      members: "1.9k",
      topic: "Variety Content", 
      color: "#45B7D1",
      posts: "67 posts this week"
    },
    {
      name: "Music & Performance",
      members: "3.2k",
      topic: "Creative Streams",
      color: "#96CEB4",
      posts: "118 posts this week"
    },
    {
      name: "Beginner Streamers",
      members: "5.6k",
      topic: "Getting Started",
      color: "#FECA57",
      posts: "156 posts this week"
    }
  ];

  return (
    <section className={styles.streamersCommunity} id="streamers-community">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>STREAMERS</span>
            <Text className={styles.badgeText}>Community</Text>
          </div>
          <H3 className={styles.title}>Learn and Grow with Fellow Streamers</H3>
          <Text className={styles.subtitle}>
            Topic-based groups for gear, setups, content growth, and tips
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            A dedicated community for streamers to connect, learn, and collaborate. Share tips on gear, 
            setups, content growth, and more through topic-based groups and peer-to-peer learning opportunities.
          </Text>
        </div>

        {/* Groups Layout */}
        <div className={styles.groupsLayout}>
          <div className={styles.groupsGrid}>
            <div className={styles.groupsHeader}>
              <H2 className={styles.sectionTitle}>Popular Groups</H2>
              <Text className={styles.groupsStats}>18 active groups • 23k+ members</Text>
            </div>
            
            <div className={styles.groupsList}>
              {groups.map((group, index) => (
                <div key={index} className={styles.groupCard}>
                  <div 
                    className={styles.groupColor} 
                    style={{ backgroundColor: group.color }}
                  />
                  <div className={styles.groupContent}>
                    <div className={styles.groupHeader}>
                      <Text className={styles.groupName}>{group.name}</Text>
                      <div className={styles.groupMeta}>
                        <span className={styles.memberCount}>{group.members} members</span>
                        <span className={styles.groupTopic}>{group.topic}</span>
                      </div>
                    </div>
                    <Text className={styles.groupActivity}>{group.posts}</Text>
                  </div>
                  <div className={styles.joinButton}>
                    <span>Join</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.featuresPanel}>
            <div className={styles.featuresPanelHeader}>
              <Text className={styles.panelTitle}>Why Join Groups?</Text>
            </div>
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
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

      </div>
    </section>
  );
}
