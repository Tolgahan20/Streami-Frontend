import React, { useState } from 'react';
import { Button } from "@/components/ui/button/Button";
import { UsernameInput } from "@/components/ui/input/UsernameInput";
import { Label } from "@/components/ui/form/Label/Label";
import { Typography } from "@/components/ui/typography/Typography";
import { useSetUsername } from "@/features/auth/hooks/hooks";
import styles from "./UsernameSetupModal.module.css";
import { toastSuccess } from "@/components/ui/toast";

interface UsernameSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UsernameSetupModal: React.FC<UsernameSetupModalProps> = ({
  isOpen,
  onSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  const setUsernameMutation = useSetUsername();

  const handleValidationChange = (isValid: boolean, isCheckingStatus: boolean) => {
    setIsUsernameValid(isValid);
    setIsChecking(isCheckingStatus);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return;
    }

    if (!isUsernameValid) {
      setError("Please choose an available username");
      return;
    }

    try {
      await setUsernameMutation.mutateAsync(username);
      toastSuccess("Username set successfully!");
      onSuccess();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to set username");
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Typography variant="h1" className={styles.title}>
            Choose Your Username
          </Typography>
          <Typography variant="base" color="muted" className={styles.subtitle}>
            Complete your account setup by choosing a unique username that represents you
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Label htmlFor="username">Username</Label>
            <UsernameInput
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Choose a unique username"
              error={!!error}
              disabled={setUsernameMutation.isPending}
              onValidationChange={handleValidationChange}
            />
            {error && (
              <span className={styles.error}>{error}</span>
            )}
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={
                !username || 
                !isUsernameValid || 
                isChecking || 
                setUsernameMutation.isPending
              }
              isLoading={setUsernameMutation.isPending}
              className={styles.submitButton}
            >
              {setUsernameMutation.isPending ? "Setting username..." : "Continue"}
            </Button>
          </div>
        </form>

        <div className={styles.note}>
          <Typography variant="small" color="muted">
            Your username will be visible to other users and cannot be changed later
          </Typography>
        </div>
      </div>
    </div>
  );
};
