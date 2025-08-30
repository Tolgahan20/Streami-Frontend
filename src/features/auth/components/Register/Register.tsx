import React from 'react';
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/form/Label/Label";
import { Text } from "@/components/ui/typography/Typography";
import Link from "next/link";
import { useState } from "react";
import type { RegisterDto } from "@/features/auth/types";
import { useGoogleAuth } from "@/features/auth/hooks/useGoogleAuth";
import styles from "./Register.module.css";

interface RegisterProps {
  formData: RegisterDto;
  errors: Partial<RegisterDto>;
  isLoading: boolean;
  onInputChange: (field: keyof RegisterDto, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Register: React.FC<RegisterProps> = ({
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value && value !== formData.password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    
    // Clear confirm password error and submit
    setConfirmPasswordError("");
    onSubmit(e);
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is already handled in the hook
      console.error('Google sign-up failed:', error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className={styles.rightPanel}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <Text variant="h2" className={styles.formTitle}>
            Create your account
          </Text>
          <Text color="muted" className={styles.formSubtitle}>
            Sign up using the form, or the Google account you use for streaming
          </Text>
        </div>

        <Button 
          variant="outline" 
          size="lg" 
          className={styles.googleButton}
          onClick={handleGoogleSignUp}
          disabled={googleLoading || isLoading}
          isLoading={googleLoading}
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {googleLoading ? "Signing up..." : "Sign up with Google"}
        </Button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Label htmlFor="displayName">Full name</Label>
            <Input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => onInputChange("displayName", e.target.value)}
              placeholder="Enter your full name"
              error={!!errors.displayName}
              disabled={isLoading || googleLoading}
            />
            {errors.displayName && (
              <span className={styles.error}>{errors.displayName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="Enter your email"
              error={!!errors.email}
              disabled={isLoading || googleLoading}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => onInputChange("password", e.target.value)}
              placeholder="Create a password"
              error={!!errors.password}
              disabled={isLoading || googleLoading}
              rightIcon={
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  disabled={isLoading || googleLoading}
                  style={{ pointerEvents: 'auto' }}
                >
                  {showPassword ? (
                    <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              }
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
            <div className={styles.passwordHint}>
              Min 8 characters, including letters, numbers and special characters
            </div>
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              placeholder="Confirm your password"
              error={!!confirmPasswordError}
              disabled={isLoading || googleLoading}
              rightIcon={
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={isLoading || googleLoading}
                  style={{ pointerEvents: 'auto' }}
                >
                  {showConfirmPassword ? (
                    <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              }
            />
            {confirmPasswordError && (
              <span className={styles.error}>{confirmPasswordError}</span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className={styles.submitButton}
            disabled={isLoading || googleLoading}
          >
            {isLoading ? "Creating account..." : "Submit"}
          </Button>
        </form>

        <div className={styles.formFooter}>
          <Text color="muted">
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};
