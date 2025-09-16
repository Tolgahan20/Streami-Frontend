"use client";

import { useState } from "react";
import { H2, H3, Text } from "@/components/ui/typography/Typography";
import { Button } from "@/components/ui/button/Button";
import { Mail, Users, MessageSquare, Zap } from "lucide-react";
import styles from "./GeneralContact.module.css";

export default function GeneralContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const features = [
    {
      icon: <Mail className={styles.featureIcon} />,
      title: "Support for users",
      description: "Have a question, idea, or issue? Reach out directly and we'll get back to you as quickly as possible"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Partnership inquiries",
      description: "Whether you need user support or want to share feedback, we're here to listen"
    },
    {
      icon: <MessageSquare className={styles.featureIcon} />,
      title: "Press contact",
      description: "Have a question, idea, or issue? Reach out directly and we'll get back to you as quickly as possible"
    }
  ];

  return (
    <section className={styles.generalContact} id="general-contact">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.tag}>SUPPORT</span>
            <Text className={styles.badgeText}>General Contact</Text>
          </div>
          <H3 className={styles.title}>Have a Question? We&apos;re Here</H3>
          <Text className={styles.subtitle}>
            Support, ideas, issues - reach out directly for quick responses
          </Text>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <Text className={styles.description}>
            Have a question, idea, or issue? Reach out directly and we&apos;ll get back to you as quickly as possible. 
            Whether you need user support or want to share feedback, we&apos;re here to listen.
          </Text>
        </div>

        {/* Contact Layout */}
        <div className={styles.contactLayout}>
          <div className={styles.contactForm}>
            <H2 className={styles.formTitle}>Send us a Message</H2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  <Text className={styles.labelText}>Full Name</Text>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <Text className={styles.labelText}>Email Address</Text>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    <Text className={styles.labelText}>Category</Text>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="support">User Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="press">Press Contact</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    <Text className={styles.labelText}>Subject</Text>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Brief subject line"
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  <Text className={styles.labelText}>Message</Text>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className={styles.submitButton}
              >
                Send Message
              </Button>
            </form>
          </div>
          
          <div className={styles.contactInfo}>
            <H2 className={styles.infoTitle}>How We Can Help</H2>
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
            
            <div className={styles.responseTime}>
              <div className={styles.responseIconContainer}>
                <Zap className={styles.responseIcon} />
              </div>
              <div className={styles.responseContent}>
                <Text className={styles.responseTitle}>Quick Responses</Text>
                <Text className={styles.responseText}>We typically respond within 24 hours</Text>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
