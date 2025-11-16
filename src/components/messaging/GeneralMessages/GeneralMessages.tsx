import {  H3, Text } from "@/components/ui/typography/Typography";
import { Share, Pin, CheckCheck } from "lucide-react";
import styles from "./GeneralMessages.module.css";

export default function GeneralMessages() {
  const features = [
    {
      icon: <Share className={styles.featureIcon} />,
      title: "File sharing",
      description: "Send files, pin important messages, and track read receipts to keep your creator conversations clear and productive"
    },
    {
      icon: <Pin className={styles.featureIcon} />,
      title: "Pinned messages",
      description: "Send files, pin important messages, and track read receipts to keep your creator conversations clear and productive"
    },
    {
      icon: <CheckCheck className={styles.featureIcon} />,
      title: "Read receipts",
      description: "Send files, pin important messages, and track read receipts to keep your creator conversations clear and productive"
    }
  ];

  return (
    <section className={styles.generalMessages} id="general-messages">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>DMs</span>
            <Text className={styles.badgeText}>General Messages</Text>
          </div>
          <H3 className={styles.title}>Private Messages, Perfected</H3>
          <Text className={styles.subtitle}>
            File sharing, pinned messages, read receipts - stay organized
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            Private one-to-one messages with the organizational features you need. Send files, pin important messages, 
            and track read receipts to keep your creator conversations clear and productive.
          </p>
        </div>

        {/* DM Interface Layout */}
        <div className={styles.dmLayout}>
          <div className={styles.dmInterface}>
            <div className={styles.dmHeader}>
              <div className={styles.contactInfo}>
                <div className={styles.avatar}>A</div>
                <div className={styles.contactDetails}>
                  <Text className={styles.contactName}>Alex Designer</Text>
                  <Text className={styles.contactStatus}>Online now</Text>
                </div>
              </div>
              <div className={styles.dmActions}>
                <Pin className={styles.actionIcon} />
                <Share className={styles.actionIcon} />
              </div>
            </div>
            
            <div className={styles.messageThread}>
              <div className={styles.messageGroup}>
                <div className={styles.message + ' ' + styles.received}>
                  <Text className={styles.messageText}>Hey! Just finished the new overlay design. Want to take a look?</Text>
                  <div className={styles.messageTime}>2:34 PM</div>
                </div>
                <div className={styles.message + ' ' + styles.sent}>
                  <Text className={styles.messageText}>Absolutely! Can you send the files?</Text>
                  <div className={styles.messageTime}>2:35 PM</div>
                  <CheckCheck className={styles.readReceipt} />
                </div>
                <div className={styles.message + ' ' + styles.received}>
                  <div className={styles.fileMessage}>
                    <Share className={styles.fileIcon} />
                    <div className={styles.fileInfo}>
                      <Text className={styles.fileName}>overlay_design_v2.psd</Text>
                      <Text className={styles.fileSize}>2.4 MB</Text>
                    </div>
                  </div>
                  <div className={styles.messageTime}>2:36 PM</div>
                </div>
              </div>
            </div>
            
            <div className={styles.messageInput}>
              <div className={styles.inputField}>
                <Text className={styles.placeholder}>Type a message...</Text>
              </div>
              <div className={styles.sendButton}>
                Send
              </div>
            </div>
          </div>
          
          <div className={styles.featuresPanel}>
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
