import React from 'react';
import styles from './Widget.module.css';

export type WidgetSize = 'small' | 'medium' | 'large' | 'wide';
export type WidgetStyle = 'solid' | 'gradient' | 'glass' | 'image';

export interface WidgetProps {
  id: string;
  size: WidgetSize;
  style: WidgetStyle;
  backgroundColor?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  onEdit?: () => void;
  onRemove?: () => void;
  isEditable?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({
  id,
  size,
  style,
  backgroundColor,
  backgroundImage,
  children,
  onEdit,
  onRemove,
  isEditable = false,
}) => {
  const widgetStyle: React.CSSProperties = {
    ...(backgroundColor && { backgroundColor }),
    ...(backgroundImage && style === 'image' && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
  };

  return (
    <div
      className={`${styles.widget} ${styles[size]} ${styles[style]}`}
      style={widgetStyle}
      data-widget-id={id}
    >
      {isEditable && (
        <div className={styles.widgetControls}>
          {onEdit && (
            <button
              className={styles.controlButton}
              onClick={onEdit}
              aria-label="Edit widget"
            >
              ✏️
            </button>
          )}
          {onRemove && (
            <button
              className={styles.controlButton}
              onClick={onRemove}
              aria-label="Remove widget"
            >
              ✕
            </button>
          )}
        </div>
      )}
      <div className={styles.widgetContent}>{children}</div>
    </div>
  );
};

