import React from "react";

interface CustomAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CustomArea = ({
  children,
  className,
  ...props
}: CustomAreaProps) => {
  return (
    <div
      className={`border border-dashed border-gray-400 p-4 rounded-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
