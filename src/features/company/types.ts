export type NewsArticle = {
  title: string; // ニュース記事のタイトル
  summary: string; // 記事の要約
  url: string; // 記事のURL
}

export type CompanyNewsAnalysisResult = {
  company_name: string; // 対象となった企業名
  positive_news: NewsArticle[]; // ポジティブなニュース一覧
  negative_news: NewsArticle[]; // ネガティブなニュース一覧
}

export type CompanyInfoAnalysisResult = {
  company_name: string; // 対象となった企業名
  location: string; // 対象となった企業の所在地
  industry: string; // 対象となった企業の業界
  business_content: string; // 対象となった企業の事業内容
  employee_number: number; // 対象となった企業の従業員数
}

export type TravelTimeResult = {
  start_address: string; // 出発地点
  end_address: string; // 目的地
  distance_text: string; // 距離（例: "12km"）
  duration_text: string; // 所要時間（例: "30分"）
  duration_seconds: number; // 所要時間（秒）
}

export type CompanyInfoFullResult = {
  company_info: CompanyInfoAnalysisResult; // 企業の基本情報
  company_news: CompanyNewsAnalysisResult | null; // 企業のニュース情報
  travel_time: TravelTimeResult; // ユーザーとの距離情報
}