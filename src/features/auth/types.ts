export type RegisterDto = {
  email: string;
  password: string;
  displayName: string;
  username: string;
};

export type LoginDto = {
  emailOrUsername: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  username?: string;
  isEmailVerified: boolean;
};

export type LoginResponse = { accessToken: string; user: AuthUser };

export type MeResponse = { 
  id: string; 
  email: string; 
  displayName: string;
  username?: string;
  role: string; 
  isEmailVerified: boolean;
};


