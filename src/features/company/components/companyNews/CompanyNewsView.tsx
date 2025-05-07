"use client";

import CompanyArticle from "./CompanyArticle";
import { CompanyNewsAnalysisResult, NewsArticle } from "../../types";

type CompanyNewsViewProps = {
  companyNews: CompanyNewsAnalysisResult;
};

export default function CompanyNewsView({ companyNews }: CompanyNewsViewProps) {
  const left = <NewsArticleList newsArticles={companyNews.positive_news} />;
  const right = <NewsArticleList newsArticles={companyNews.negative_news} />;
  return (
    <>
      <div className="grid grid-cols-[50%_50%] border-b bg-white sticky top-0 z-10">
        <div className="p-4 font-semibold">POSITIVE</div>
        <div className="p-4 font-semibold">NEGATIVE</div>
      </div>
      <div className="grid grid-cols-[50%_50%] h-full">
        <div className="p-4 overflow-y-auto h-full">{left}</div>
        <div className="p-4 overflow-y-auto h-full">{right}</div>
      </div>
    </>
  );
}
const NewsArticleList = ({ newsArticles }: { newsArticles: NewsArticle[] }) => {
  return (
    <div className="space-y-2">
      {newsArticles.map((article) => (
        <CompanyArticle key={article.url} article={article} />
      ))}
    </div>
  );
};
