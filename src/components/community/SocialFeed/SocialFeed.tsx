import {  H3, Text } from "@/components/ui/typography/Typography";
import { MessageSquare, Heart, Share2, Bookmark } from "lucide-react";
import styles from "./SocialFeed.module.css";

export default function SocialFeed() {
  const features = [
    {
      icon: <Share2 className={styles.featureIcon} />,
      title: "Share posts/updates/wins",
      description: "Share your latest achievements, projects, and milestones with the community"
    },
    {
      icon: <Heart className={styles.featureIcon} />,
      title: "React and comment",
      description: "Engage with fellow creators through likes, comments, and meaningful discussions"
    },
    {
      icon: <Bookmark className={styles.featureIcon} />,
      title: "Discover new creators",
      description: "Find and connect with talented creators doing amazing work in your space"
    },
    {
      icon: <MessageSquare className={styles.featureIcon} />,
      title: "Build connections",
      description: "Form lasting relationships with creators who share your passion and goals"
    }
  ];

  const mockPosts = [
    {
      author: "StreamerPro",
      time: "2h ago",
      content: "Just hit 10K followers! 🎉 Thanks to this amazing community for all the support and tips!",
      likes: 47,
      comments: 12
    },
    {
      author: "DesignWiz",
      time: "4h ago", 
      content: "Working on some new overlay designs. What do you think of this color scheme?",
      likes: 23,
      comments: 8
    },
    {
      author: "GameDev_Jane",
      time: "6h ago",
      content: "Finally finished my indie game prototype! Looking for feedback from fellow creators 🎮",
      likes: 68,
      comments: 19
    }
  ];

  return (
    <section className={styles.socialFeed} id="social-feed">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>FEED</span>
            <Text className={styles.badgeText}>Social Feed</Text>
          </div>
          <H3 className={styles.title}>Share Your Creator Journey</H3>
          <Text className={styles.subtitle}>
            Like Threads meets Reddit, designed specifically for creators
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Your space to share updates, showcase work, and discover what others are building. 
            Think of it as a blend between Threads and Reddit, but designed specifically for streamers and creators.
          </Text>
        </div>

        {/* Feed Layout */}
        <div className={styles.feedLayout}>
          <div className={styles.feedColumn}>
            <div className={styles.feedHeader}>
              <Text className={styles.feedTitle}>Community Feed</Text>
              <div className={styles.feedStats}>
                <span>2.3k posts today</span>
              </div>
            </div>
            
            <div className={styles.postsList}>
              {mockPosts.map((post, index) => (
                <div key={index} className={styles.post}>
                  <div className={styles.postHeader}>
                    <div className={styles.avatar}>
                      <span>{post.author[0]}</span>
                    </div>
                    <div className={styles.postMeta}>
                      <Text className={styles.authorName}>{post.author}</Text>
                      <Text className={styles.postTime}>{post.time}</Text>
                    </div>
                  </div>
                  
                  <div className={styles.postContent}>
                    <Text className={styles.postText}>{post.content}</Text>
                  </div>
                  
                  <div className={styles.postActions}>
                    <div className={styles.action}>
                      <Heart className={styles.actionIcon} />
                      <span>{post.likes}</span>
                    </div>
                    <div className={styles.action}>
                      <MessageSquare className={styles.actionIcon} />
                      <span>{post.comments}</span>
                    </div>
                    <div className={styles.action}>
                      <Share2 className={styles.actionIcon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.featuresColumn}>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
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
