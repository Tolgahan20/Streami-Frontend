import React from 'react';
import styles from './FormField.module.css';
import clsx from 'clsx';
import { Label } from '../Label/Label';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.formField, className)}
        {...props}
      >
        {label && (
          <Label required={required} error={!!error} disabled={disabled}>
            {label}
          </Label>
        )}
        {children}
        {error && <div className={styles.error}>{error}</div>}
        {hint && !error && <div className={styles.hint}>{hint}</div>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
