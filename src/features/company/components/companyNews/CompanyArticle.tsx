"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsArticle } from "../../types";

type CompanyArticleProps = {
  article: NewsArticle;
};

export default function CompanyArticle({ article }: CompanyArticleProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{article.summary}</p>
        <Button asChild variant="link" className="p-0 h-auto text-blue-600">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            記事を読む
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
