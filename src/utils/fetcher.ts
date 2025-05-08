// fetchの共通関数
import { ApiError } from "./customErrors";

// エラーの型をAPIごとに指定する
export async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      const error = new ApiError<T>('API Error', res.status, errorBody);
      throw error;
    }

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err; // 呼び出し元でエラーハンドリング
  }
}
