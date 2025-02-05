"use client"

import {TrendingUp} from "lucide-react"
import {Label, Pie, PieChart} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {useMemo} from "react";


const chartConfig: ChartConfig = {
  messages: {
    label: "Messages",
  },
  ["no issue"]: {
    label: "No Issue",
    color: "hsl(var(--chart-1))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-2))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
  high: {
    label: "High",
    color: "hsl(var(--chart-4))",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--chart-5))",
  },
}

interface DashboardSeverityChartProps {
  data: {
    noIssueMessages: number
    lowSeverityIssues: number
    mediumSeverityIssues: number
    highSeverityIssues: number
    criticalSeverityIssues: number
  }
}

export function DashboardSeverityChart({
                                         data: {
                                           noIssueMessages,
                                           lowSeverityIssues,
                                           mediumSeverityIssues,
                                           highSeverityIssues,
                                           criticalSeverityIssues,
                                         }
                                       }: DashboardSeverityChartProps) {


const chartData = useMemo(() => [
  { level: "no issue", messages: noIssueMessages, fill: "rgb(220 252 231 / var(--tw-bg-opacity, 1))" },
  { level: "low", messages: lowSeverityIssues, fill: "rgb(254 252 232 / var(--tw-bg-opacity, 1))" },
  { level: "medium", messages: mediumSeverityIssues, fill: "rgb(254 249 195 / var(--tw-bg-opacity, 1))" },
  { level: "high", messages: highSeverityIssues, fill: "rgb(255 237 213 / var(--tw-bg-opacity, 1))" },
  { level: "critical", messages: criticalSeverityIssues, fill: "rgb(254 226 226 / var(--tw-bg-opacity, 1))" },
], [noIssueMessages, lowSeverityIssues, mediumSeverityIssues, highSeverityIssues, criticalSeverityIssues]);

const totalVisitors = useMemo(() => {
  return chartData.reduce((acc, curr) => acc + (curr.messages || 0), 0);
}, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Severity</CardTitle>
        <CardDescription>Jan - Feb 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel/>}
            />
            <Pie
              data={chartData}
              dataKey="messages"
              nameKey="level"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({viewBox}) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Messages
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total messages for the last 2 months
        </div>
      </CardFooter>
    </Card>
  )
}
