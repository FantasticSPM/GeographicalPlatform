export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
  success: boolean;
  timestamp: number | string | Date;
  path: string;
}
