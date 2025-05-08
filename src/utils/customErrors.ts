export class ApiError<T extends ApiErrorResponse> extends Error {
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

export type ApiErrorResponse = {
  message: string;
};

