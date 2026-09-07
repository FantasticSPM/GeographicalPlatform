export interface UserProfile {
  id: number | string;
  username: string;
  password?: string;
  nick_name?: string;
  avatar: string | null;
  lastLoginAt?: string | null;
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  user: UserProfile;
}

export interface AuthenticatedUser {
  id: number | string;
  username: string;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
