# Google Authentication Setup for Streami

## Overview
This document explains how Google authentication has been integrated into the Streami application using Firebase Authentication.

## What's Been Implemented

### 1. Firebase Configuration
- **File**: `src/lib/firebase/config.ts`
- **Services**: Authentication, Analytics
- **Configuration**: Uses your Firebase project credentials

### 2. Google Authentication Hook
- **File**: `src/features/auth/hooks/useGoogleAuth.ts`
- **Features**:
  - Google sign-in with popup
  - User state management
  - Sign-out functionality
  - Error handling with user-friendly messages
  - Automatic redirects after authentication

### 3. Authentication Provider
- **File**: `src/app/providers/AuthProvider.tsx`
- **Purpose**: Provides authentication context throughout the app
- **Usage**: Wraps the entire application in `layout.tsx`

### 4. Updated Components
- **Login Component**: Now includes functional Google sign-in button
- **Register Component**: Now includes functional Google sign-up button
- **Form States**: Both forms are disabled during Google authentication

### 5. Utility Components
- **ProtectedRoute**: Guards pages requiring authentication
- **UserProfile**: Displays user info and sign-out button

## How It Works

### Authentication Flow
1. User clicks "Continue with Google" button
2. Firebase opens Google sign-in popup
3. User authenticates with Google
4. Firebase returns user credentials
5. User is redirected to `/feed` page
6. Toast notification confirms successful sign-in

### User State Management
- Authentication state is automatically managed by Firebase
- User information is available throughout the app via `useAuth()` hook
- Automatic sign-out handling with redirects

## Usage Examples

### Using the Auth Hook
```tsx
import { useAuth } from '@/app/providers/AuthProvider';

function MyComponent() {
  const { user, signInWithGoogle, signOut, isAuthenticated } = useAuth();
  
  // Check if user is logged in
  if (isAuthenticated) {
    return <div>Welcome, {user?.displayName}!</div>;
  }
  
  return <button onClick={signInWithGoogle}>Sign In</button>;
}
```

### Protecting Routes
```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>This page requires authentication</div>
    </ProtectedRoute>
  );
}
```

### Displaying User Profile
```tsx
import { UserProfile } from '@/components/auth/UserProfile';

function Header() {
  return (
    <header>
      <UserProfile />
    </header>
  );
}
```

## Configuration

### Environment Variables
Make sure your Firebase configuration is properly set up in `src/lib/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

### Firebase Console Setup
1. Enable Google Authentication in Firebase Console
2. Add your domain to authorized domains
3. Configure OAuth consent screen if needed

## Security Features

- **Popup Authentication**: Uses secure popup flow
- **Token Management**: Firebase handles JWT tokens automatically
- **Error Handling**: Comprehensive error messages for different failure scenarios
- **State Validation**: Proper loading states and authentication checks

## Next Steps

### Backend Integration
To complete the authentication flow, you'll need to:

1. **Verify Firebase tokens** on your backend
2. **Create user records** in your database
3. **Handle user sessions** and permissions
4. **Implement token refresh** logic

### Additional Features
Consider adding:
- Email/password authentication alongside Google
- Password reset functionality
- Email verification
- Social login providers (GitHub, Twitter, etc.)
- Two-factor authentication

## Troubleshooting

### Common Issues
1. **Popup Blocked**: Ensure popups are allowed for your domain
2. **Domain Not Authorized**: Add your domain to Firebase authorized domains
3. **CORS Issues**: Check Firebase project settings
4. **Build Errors**: Ensure all dependencies are installed

### Debug Mode
Enable Firebase debug mode in development:
```typescript
// Add to firebase config
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

## Support
For Firebase-specific issues, refer to the [Firebase Documentation](https://firebase.google.com/docs/auth).
For Streami-specific issues, check the project documentation or create an issue.
