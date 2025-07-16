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
} from "./ui/card";
import { cn } from "@/lib/utils";

export function MainChart({ chartData } : { chartData?: { coinSymbol: string, currentBrlValue: number }[]}) {

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
        <CardTitle>Cotação</CardTitle>
        <CardDescription>
          Cotação das moedas selecionadas.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ChartContainer
          className={cn("text-white", "h-8/12", "w-full")}
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="currentBrlValue" name="Cotação" fill="var(--color-coins)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
