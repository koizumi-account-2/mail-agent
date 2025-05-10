import React from "react";

export const HeaderL = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
      {children}
    </h1>
  );
};

export const HeaderM = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="scroll-m-20 text-xl font-bold tracking-tight">{children}</h2>
  );
};

export const HeaderS = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="scroll-m-20 text-lg font-bold tracking-tight">{children}</h3>
  );
};
