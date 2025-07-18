import { CartesianGrid, Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MainChart({
  chartData,
}: {
  chartData?: { coinSymbol: string; currentBrlValue: number }[];
}) {
  const chartConfig = {
    coins: {
      label: "coins",
      color: "var(--color-secondary)",
    },
  } satisfies ChartConfig;

  return (
    <Card
      className={cn("bg-transparent", "border-none", "text-white", "h-fit")}
    >
      <CardHeader>
        <CardTitle>Prices</CardTitle>
        <CardDescription>Prices of selected cryptocurrencies</CardDescription>
      </CardHeader>
      <CardContent className="h-60">
        <ChartContainer
          className={cn("text-white", "h-full", "w-full")}
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="coinSymbol"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="currentBrlValue"
              name="Price"
              fill="var(--color-coins)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
