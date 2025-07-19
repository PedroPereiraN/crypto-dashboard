"use client";

import { cn } from "@/lib/utils";
import { MainChart } from "./main-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestError } from "@/components/request-error";
import { useCoinsSection } from "@/hooks/coins-section";

export function MainChartLoader() {
  const { chartData, marketValuesQuery } = useCoinsSection();

  const { isPending, error } = marketValuesQuery;

  return (
    <>
      {isPending ? (
        <Skeleton className={cn("h-72", "w-full", "rounded-lg")} />
      ) : error ? (
        <RequestError {...{ whatCouldNotBeLoad: "prices chart" }} />
      ) : (
        <MainChart chartData={chartData} />
      )}
    </>
  );
}
