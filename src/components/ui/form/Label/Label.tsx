import React from 'react';
import styles from './Label.module.css';
import clsx from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      required = false,
      error = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={clsx(
          styles.label,
          required && styles.required,
          error && styles.error,
          disabled && styles.disabled,
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';
