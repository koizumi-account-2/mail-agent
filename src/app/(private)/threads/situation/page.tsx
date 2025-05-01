import { getAllSituations } from "@/features/threads/dao/situation";
import React from "react";

export default async function SituationPage() {
  const situations = await getAllSituations();
  return (
    <div>
      SituationPage
      <pre>{JSON.stringify(situations, null, 2)}</pre>
    </div>
  );
}
