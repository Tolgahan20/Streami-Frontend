import React from 'react';
import styles from './PerforatedSection.module.css';

interface PerforatedSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
  className?: string;
}

export const PerforatedSection: React.FC<PerforatedSectionProps> = ({
  children,
  backgroundColor = 'var(--background)',
  hasTopBorder = false,
  hasBottomBorder = true,
  className = ''
}) => {
  return (
    <section 
      className={`${styles.section} ${hasTopBorder ? styles.topBorder : ''} ${hasBottomBorder ? styles.bottomBorder : ''} ${className ? styles[className] : ''}`}
      style={{ background: backgroundColor }}
    >
      <div className={styles.inner}>
        {children}
      </div>
    </section>
  );
};

export default PerforatedSection;
