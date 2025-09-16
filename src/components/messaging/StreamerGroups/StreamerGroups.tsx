import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Users, Zap, Lock } from "lucide-react";
import styles from "./StreamerGroups.module.css";

export default function StreamerGroups() {
  const features = [
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Topic-based groups",
      description: "Streamer Groups are channels focused on streaming content, setups, collabs, and live sharing"
    },
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "Real-time collaboration",
      description: "Built for knowledge sharing and support within niches with real-time collaboration features"
    },
    {
      icon: <Lock className={styles.featureIcon} />,
      title: "Private/public options",
      description: "Streamer Groups are channels focused on streaming content, setups, collabs, and live sharing"
    }
  ];

  return (
    <section className={styles.streamerGroups} id="streamer-groups">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>GROUPS</span>
            <Text className={styles.badgeText}>Streamer Groups</Text>
          </div>
          <H3 className={styles.title}>Streamer-Focused Group Channels</H3>
          <Text className={styles.subtitle}>
            Topic-based channels for streaming content, setups, collabs, live sharing
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Streamer Groups are channels focused on streaming content, setups, collabs, and live sharing. 
            Built for knowledge sharing and support within niches with real-time collaboration features.
          </Text>
        </div>

        {/* Channel Interface Layout */}
        <div className={styles.channelLayout}>
          <div className={styles.channelInterface}>
            <div className={styles.channelSidebar}>
              <div className={styles.sidebarHeader}>
                <Text className={styles.serverName}>Streamer Hub</Text>
              </div>
              
              <div className={styles.channelsList}>
                <div className={styles.channelCategory}>
                  <Text className={styles.categoryTitle}>STREAMING</Text>
                </div>
                <div className={styles.channel + ' ' + styles.active}>
                  <span className={styles.channelHash}>#</span>
                  <Text className={styles.channelName}>general-chat</Text>
                  <div className={styles.unreadCount}>3</div>
                </div>
                <div className={styles.channel}>
                  <span className={styles.channelHash}>#</span>
                  <Text className={styles.channelName}>setup-help</Text>
                </div>
                <div className={styles.channel}>
                  <span className={styles.channelHash}>#</span>
                  <Text className={styles.channelName}>live-announcements</Text>
                </div>
                
                <div className={styles.channelCategory}>
                  <Text className={styles.categoryTitle}>COLLABORATION</Text>
                </div>
                <div className={styles.channel}>
                  <span className={styles.channelHash}>#</span>
                  <Text className={styles.channelName}>collab-requests</Text>
                </div>
                <div className={styles.channel}>
                  <span className={styles.channelHash}>#</span>
                  <Text className={styles.channelName}>project-showcase</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.channelContent}>
              <div className={styles.channelHeader}>
                <div className={styles.channelInfo}>
                  <span className={styles.channelHash}>#</span>
                  <Text className={styles.activeChannelName}>general-chat</Text>
                  <Text className={styles.channelDescription}>General streaming discussions</Text>
                </div>
              </div>
              
              <div className={styles.messagesArea}>
                <div className={styles.channelMessage}>
                  <div className={styles.messageAvatar}>S</div>
                  <div className={styles.messageContent}>
                    <div className={styles.messageHeader}>
                      <Text className={styles.messageSender}>StreamerPro</Text>
                      <Text className={styles.messageTimestamp}>Today at 2:30 PM</Text>
                    </div>
                    <Text className={styles.messageBody}>Just upgraded my streaming setup! The new camera quality is amazing 📷</Text>
                  </div>
                </div>
                
                <div className={styles.channelMessage}>
                  <div className={styles.messageAvatar}>T</div>
                  <div className={styles.messageContent}>
                    <div className={styles.messageHeader}>
                      <Text className={styles.messageSender}>TechStreamer</Text>
                      <Text className={styles.messageTimestamp}>Today at 2:32 PM</Text>
                    </div>
                    <Text className={styles.messageBody}>Nice! What camera did you go with? I&apos;m looking to upgrade too</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.featuresPanel}>
            <H2 className={styles.panelTitle}>Group Features</H2>
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

      </div>
    </section>
  );
}
