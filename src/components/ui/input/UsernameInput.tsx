import React, { useEffect } from 'react';
import { Input } from './Input';
import { useUsernameCheck } from '@/features/auth/hooks/useUsernameCheck';
import styles from './UsernameInput.module.css';
import clsx from 'clsx';

interface UsernameInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  inputSize?: 'small' | 'medium' | 'large';
  onValidationChange?: (isValid: boolean, isChecking: boolean) => void;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({
  value,
  onChange,
  error,
  disabled,
  inputSize = 'medium',
  onValidationChange,
  ...props
}) => {
  const { status, isAvailable, isChecking, checkUsername, reset } = useUsernameCheck();

  useEffect(() => {
    if (value && value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value)) {
      checkUsername(value);
    } else {
      reset();
    }
  }, [value, checkUsername, reset]);

  useEffect(() => {
    onValidationChange?.(isAvailable, isChecking);
  }, [isAvailable, isChecking, onValidationChange]);

  const getValidationIcon = () => {
    if (isChecking) {
      return (
        <div className={styles.spinner}>
          <div className={styles.spinnerIcon} />
        </div>
      );
    }

    if (status === 'available') {
      return (
        <svg className={styles.successIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path 
            d="M20 6L9 17L4 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (status === 'taken') {
      return (
        <svg className={styles.errorIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path 
            d="M18 6L6 18M6 6L18 18" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return null;
  };

  const getStatusMessage = () => {
    if (status === 'available' && value.length >= 3) {
      return <span className={styles.successMessage}>Username is available</span>;
    }
    
    if (status === 'taken') {
      return <span className={styles.errorMessage}>Username is already taken</span>;
    }
    
    if (status === 'error') {
      return <span className={styles.errorMessage}>Unable to check username availability</span>;
    }
    
    return null;
  };

  return (
    <div className={styles.container}>
      <Input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error || status === 'taken' || status === 'error'}
        disabled={disabled}
        inputSize={inputSize as 'sm' | 'md' | 'lg'}
        rightIcon={getValidationIcon()}
        className={clsx(
          status === 'available' && styles.success,
          (status === 'taken' || status === 'error') && styles.errorInput
        )}
      />
      {getStatusMessage()}
    </div>
  );
};
