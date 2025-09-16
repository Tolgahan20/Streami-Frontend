"use client";

import React from 'react';
import { useUsernameSetupFlow } from '../../hooks/useUsernameSetupFlow';
import { UsernameSetupModal } from '../UsernameSetupModal';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { showUsernameModal, handleUsernameSetupSuccess, handleModalClose } = useUsernameSetupFlow();

  return (
    <>
      {children}
      <UsernameSetupModal
        isOpen={showUsernameModal}
        onSuccess={handleUsernameSetupSuccess}
        onClose={handleModalClose}
      />
    </>
  );
};
