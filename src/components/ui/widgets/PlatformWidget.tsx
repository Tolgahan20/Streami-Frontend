import React from 'react';
import { Widget, WidgetProps } from './Widget';
import styles from './PlatformWidget.module.css';

interface PlatformWidgetProps extends Omit<WidgetProps, 'children'> {
  platform: string;
  icon: React.ReactNode;
  stats: string;
  label?: string;
}

export const PlatformWidget: React.FC<PlatformWidgetProps> = ({
  platform,
  icon,
  stats,
  label,
  ...widgetProps
}) => {
  return (
    <Widget {...widgetProps}>
      <div className={styles.platformWidget}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.stats}>
          <div className={styles.value}>{stats}</div>
          <div className={styles.label}>{label || platform}</div>
        </div>
      </div>
    </Widget>
  );
};

