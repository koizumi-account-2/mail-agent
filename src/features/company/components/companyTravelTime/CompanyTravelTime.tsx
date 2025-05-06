"use client";

import { TravelTimeResult } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
type CompanyTravelTimeProps = {
  travel: TravelTimeResult;
};

export const CompanyTravelTime = ({ travel }: CompanyTravelTimeProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">移動情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-600">出発地：</span>
          {travel.start_address}
        </p>
        <p>
          <span className="font-medium text-gray-600">目的地：</span>
          {travel.end_address}
        </p>
        <p>
          <span className="font-medium text-gray-600">距離：</span>
          {travel.distance_text}
        </p>
        <p>
          <span className="font-medium text-gray-600">所要時間：</span>
          {travel.duration_text}（約 {Math.round(travel.duration_seconds / 60)}{" "}
          分）
        </p>
      </CardContent>
    </Card>
  );
};
