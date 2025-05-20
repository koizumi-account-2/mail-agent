import { SkeletonCard } from "@/components/common/skelton/SkeltonCard";
import { CompanyInfo } from "@/features/company/components/companyInfo/CompanyInfo";
import { CompanyTravelTime } from "@/features/company/components/companyTravelTime/CompanyTravelTime";
import { CompanyInfoFullResult } from "@/features/company/types";
import React from "react";

export const TabCompanyInfo = ({
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CompanyInfo companyInfo={companyInfoFullResult.company_info} />
          <CompanyTravelTime travel={companyInfoFullResult.travel_time} />
        </div>
      )}
    </>
  );
};
