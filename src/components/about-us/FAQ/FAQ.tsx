'use client';
import { useState } from "react";
import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { HelpCircle, CheckCircle, Shield } from "lucide-react";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How do commissions work on Streami?",
      answer: "Commissions are transparent with clear rates displayed upfront. We take a small percentage to maintain the platform while ensuring creators keep the majority of their earnings."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, all payment processing uses industry-standard encryption and security measures to protect your financial information."
    },
    {
      question: "Can I customize my creator profile?",
      answer: "Absolutely! Your profile is fully customizable with social links, portfolio showcase, and personal branding options."
    },
    {
      question: "How do group permissions work?",
      answer: "Group creators have full control over member permissions, content moderation, and privacy settings for their communities."
    },
    {
      question: "What safety measures are in place?",
      answer: "We have comprehensive reporting systems, content moderation, and community guidelines to ensure a safe environment for all users."
    }
  ];

  const features = [
    {
      icon: <HelpCircle className={styles.featureIcon} />,
      title: "Clear common answers",
      description: "The FAQ answers the most common questions about Streami"
    },
    {
      icon: <CheckCircle className={styles.featureIcon} />,
      title: "Account/fee coverage",
      description: "From commissions and payments to profiles, groups, and safety"
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Transparent policies",
      description: "We provide clear answers with transparent policies you can trust"
    }
  ];

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>HELP</span>
            <Text className={styles.badgeText}>FAQ</Text>
          </div>
          <H3 className={styles.title}>Your Questions, Answered</H3>
          <Text className={styles.subtitle}>
            Common questions about commissions, payments, profiles, groups, and safety
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            The FAQ answers the most common questions about Streami - from commissions and payments to profiles, groups, and safety. 
            We provide clear answers with transparent policies you can trust.
          </Text>
        </div>

        {/* FAQ Layout */}
        <div className={styles.faqLayout}>
          <div className={styles.accordionSection}>
            <H2 className={styles.sectionTitle}>Frequently Asked Questions</H2>
            
            <div className={styles.accordionContainer}>
              {faqItems.map((item, index) => {
                const isOpen = openItems.includes(index);
                return (
                  <div key={index} className={styles.accordionItem}>
                    <div 
                      className={styles.accordionHeader}
                      onClick={() => toggleItem(index)}
                    >
                      <Text className={styles.questionText}>{item.question}</Text>
                      <div className={`${styles.accordionIcon} ${isOpen ? styles.open : ''}`}>
                        {isOpen ? '−' : '+'}
                      </div>
                    </div>
                    {isOpen && (
                      <div className={styles.accordionContent}>
                        <Text className={styles.answerText}>
                          {item.answer}
                        </Text>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className={styles.featuresPanel}>
            <H2 className={styles.panelTitle}>Why Choose Our Support</H2>
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
