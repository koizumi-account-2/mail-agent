import React from "react";

export const DescriptionS = ({ description }: { description: string }) => {
  return <p className="text-sm text-muted-foreground">{description}</p>;
};
