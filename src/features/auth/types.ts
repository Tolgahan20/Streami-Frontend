export type RegisterDto = {
  email: string;
  password: string;
  displayName: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  isEmailVerified: boolean;
};

export type LoginResponse = { accessToken: string; user: AuthUser };

export type MeResponse = { id: string; email: string; role: string };


