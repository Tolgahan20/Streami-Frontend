import React, { useState } from 'react';
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/form/Label/Label";
import { Text } from "@/components/ui/typography/Typography";
import Link from "next/link";
import type { LoginDto } from "@/features/auth/types";
import { useGoogleAuth } from "@/features/auth/hooks/useGoogleAuth";
import styles from "./Login.module.css";

interface LoginProps {
  formData: LoginDto;
  errors: Partial<LoginDto>;
  isLoading: boolean;
  onInputChange: (field: keyof LoginDto, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Login: React.FC<LoginProps> = ({
  formData, errors, isLoading, onInputChange, onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is already handled in the hook
      console.error('Google sign-in failed:', error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={styles.rightPanel}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <Text variant="h2" className={styles.formTitle}>
            Welcome back to Streami
          </Text>
          <Text color="muted" className={styles.formSubtitle}>
            Sign in to your account and continue creating amazing content
          </Text>
        </div>

        <Button 
          variant="outline" 
          size="lg" 
          className={styles.googleButton}
          onClick={handleGoogleSignIn}
          disabled={googleLoading || isLoading}
          isLoading={googleLoading}
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </Button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
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
                    <svg className={styles.eyeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg className={styles.eyeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              }
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formFooter}>
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className={styles.submitButton}
            disabled={isLoading || googleLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className={styles.signupPrompt}>
            <Text variant="base" color="muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className={styles.link}>
                Sign up for free
              </Link>
            </Text>
          </div>
        </form>
      </div>
    </div>
  );
};
