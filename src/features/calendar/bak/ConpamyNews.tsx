import { SkeletonCard } from "@/components/common/skelton/SkeltonCard";
import CompanyNewsView from "@/features/company/components/companyNews/CompanyNewsView";
import { CompanyInfoFullResult } from "@/features/company/types";
import React from "react";

export const ConpamyNews = ({
  isLoading,
  companyInfoFullResult,
}: {
  isLoading: boolean;
  companyInfoFullResult: CompanyInfoFullResult | null;
}) => {
  return (
    <>
      {(isLoading || !companyInfoFullResult) && <SkeletonCard />}
      {!isLoading && companyInfoFullResult && (
        <div className="h-[500px]">
          <CompanyNewsView companyNews={companyInfoFullResult.company_news} />
        </div>
      )}
    </>
  );
};
