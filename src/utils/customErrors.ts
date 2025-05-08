

// API層のエラー
export class ApiError<T> extends Error {
  status: number;
  info: T;

  constructor(message: string, status: number, info: T) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.info = info;
  }
}

// 以下APIごとのエラーの型
export interface BaseApiErrorResponse {
    errorType: string;
};
export interface ValidationDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface FastApiErrorResponse extends BaseApiErrorResponse {
    error: string;
    details?: ValidationDetail[];
};


