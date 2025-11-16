import React from 'react';
import { Widget, WidgetProps } from './Widget';
import styles from './StatsWidget.module.css';

interface StatsWidgetProps extends Omit<WidgetProps, 'children'> {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({
  value,
  label,
  icon,
  trend,
  trendValue,
  ...widgetProps
}) => {
  return (
    <Widget {...widgetProps}>
      <div className={styles.statsWidget}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.content}>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
          {trend && trendValue && (
            <div className={`${styles.trend} ${styles[trend]}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </div>
          )}
        </div>
      </div>
    </Widget>
  );
};

