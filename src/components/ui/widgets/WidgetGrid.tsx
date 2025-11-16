import React from 'react';
import styles from './WidgetGrid.module.css';

interface WidgetGridProps {
  children: React.ReactNode;
  isEditable?: boolean;
}

export const WidgetGrid: React.FC<WidgetGridProps> = ({ children, isEditable = false }) => {
  return (
    <div className={`${styles.widgetGrid} ${isEditable ? styles.editable : ''}`}>
      {children}
    </div>
  );
};

