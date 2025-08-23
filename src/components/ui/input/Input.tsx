import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
      error = false,
      inputSize = 'md',
      block = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx(
        styles.inputWrapper,
        leftIcon && styles.hasLeftIcon,
        rightIcon && styles.hasRightIcon,
        block && styles.block
      )}>
        {leftIcon && (
          <div className={styles.leftIcon}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            styles.input,
            styles[inputSize],
            error && styles.error,
            block && styles.block,
            className
          )}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className={styles.rightIcon}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';