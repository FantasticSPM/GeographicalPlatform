import type { ApiResponse } from '../interfaces/api-response.interface.js';

export class Response {
  static success<T>(data: T, msg: string = '请求成功'): ApiResponse<T> {
    return {
      code: 200,
      msg,
      data,
      success: true,
    };
  }

  static error<T>(
    msg: string,
    code = 500,
    data: T | null = null,
  ): ApiResponse<T | null> {
    return {
      code,
      msg,
      data,
      success: false,
    };
  }
}
