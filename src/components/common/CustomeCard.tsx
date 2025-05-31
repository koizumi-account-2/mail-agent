import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";

interface CustomeCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const CustomeCard = ({
  title,
  description,
  children,
  footer,
}: CustomeCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      {(title || description) && (
        <CardHeader className="shrink-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent className="overflow-y-auto min-h-0">{children}</CardContent>
      {footer && (
        <CardFooter className="shrink-0 border-t">{footer}</CardFooter>
      )}
    </Card>
  );
};
