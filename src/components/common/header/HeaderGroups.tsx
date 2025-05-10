import React from "react";
import { HeaderL, HeaderM, HeaderS } from "@/components/common/header/Headers";
import { DescriptionS } from "@/components/common/header/Descriptions";
export const HeaderGroupL = ({
  headerTitle,
  headerDescription,
}: {
  headerTitle: string;
  headerDescription: string;
}) => {
  return (
    <div className="space-y-2">
      <HeaderL>{headerTitle}</HeaderL>
      <DescriptionS description={headerDescription} />
    </div>
  );
};

export const HeaderGroupM = ({
  headerTitle,
  headerDescription,
}: {
  headerTitle: string;
  headerDescription: string;
}) => {
  return (
    <div className="space-y-2">
      <HeaderM>{headerTitle}</HeaderM>
      <DescriptionS description={headerDescription} />
    </div>
  );
};

export const HeaderGroupS = ({
  headerTitle,
  headerDescription,
}: {
  headerTitle: string;
  headerDescription: string;
}) => {
  return (
    <div className="space-y-2">
      <HeaderS>{headerTitle}</HeaderS>
      <DescriptionS description={headerDescription} />
    </div>
  );
};
