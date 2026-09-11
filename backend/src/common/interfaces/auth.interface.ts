export interface UserProfile {
  id: number;
  username: string;
  password?: string;
  nick_name?: string;
  avatar: string | null;
  lastLoginAt?: string | null;
  createdAt?: string;
  [key: string]: any;
}

export interface AuthenticatedUser {
  id: number | string;
  username: string;
  sessionId: string;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
