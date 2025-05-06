"use client";
import React from "react";
import { CompanyInfoAnalysisResult } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CompanyInfoProps = {
  companyInfo: CompanyInfoAnalysisResult;
};

export const CompanyInfo = ({ companyInfo }: CompanyInfoProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {companyInfo.company_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-600">所在地：</span>
          {companyInfo.location}
        </p>
        <p>
          <span className="font-medium text-gray-600">業種：</span>
          {companyInfo.industry}
        </p>
        <p>
          <span className="font-medium text-gray-600">事業内容：</span>
          {companyInfo.business_content}
        </p>
        <p>
          <span className="font-medium text-gray-600">従業員数：</span>
          {companyInfo.employee_number.toLocaleString()}名
        </p>
      </CardContent>
    </Card>
  );
};
