import React from "react";

export const DividedLayout = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[50%_50%] h-full">
      <div className="p-4 overflow-y-auto h-full">{left}</div>
      <div className="p-4 overflow-y-auto h-full">{right}</div>
    </div>
  );
};
