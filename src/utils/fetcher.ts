// fetchの共通関数
import { ApiError } from "./customErrors";

// エラーの型をAPIごとに指定する
export async function fetcher<T,E>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.log("errorBody", JSON.stringify(errorBody));
      const error = new ApiError<E>('API Error', res.status, errorBody);
      throw error;
    }

    return res.json();
  } catch (err) {
    throw err; // 呼び出し元でエラーハンドリング
  }
}
