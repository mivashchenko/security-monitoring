"use client"

import * as React from "react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  {date: "2024-04-01", medium: 222, high: 150, critical: 100},
  {date: "2024-04-02", medium: 97, high: 180, critical: 120},
  {date: "2024-04-03", medium: 167, high: 120, critical: 120},
  {date: "2024-04-04", medium: 242, high: 260, critical: 120},
  {date: "2024-04-05", medium: 373, high: 290, critical: 120},
  {date: "2024-04-06", medium: 301, high: 340, critical: 120},
  {date: "2024-04-07", medium: 245, high: 180, critical: 120},
  {date: "2024-04-08", medium: 409, high: 320, critical: 120},
  {date: "2024-04-09", medium: 59, high: 110, critical: 120},
  {date: "2024-04-10", medium: 261, high: 190, critical: 120},
  {date: "2024-04-11", medium: 327, high: 350, critical: 300},
  {date: "2024-04-12", medium: 292, high: 210, critical: 300},
  {date: "2024-04-13", medium: 342, high: 380, critical: 300},
  {date: "2024-04-14", medium: 137, high: 220, critical: 300},
  {date: "2024-04-15", medium: 120, high: 170, critical: 300},
  {date: "2024-04-16", medium: 138, high: 190, critical: 300},
  {date: "2024-04-17", medium: 446, high: 360, critical: 300},
  {date: "2024-04-18", medium: 364, high: 410, critical: 50},
  {date: "2024-04-19", medium: 243, high: 180, critical: 50},
  {date: "2024-04-20", medium: 89, high: 150, critical: 50},
  {date: "2024-04-21", medium: 137, high: 200, critical: 50},
  {date: "2024-04-22", medium: 224, high: 170, critical: 50},
  {date: "2024-04-23", medium: 138, high: 230, critical: 50},
  {date: "2024-04-24", medium: 387, high: 290, critical: 50},
  {date: "2024-04-25", medium: 215, high: 250, critical: 50},
  {date: "2024-04-26", medium: 75, high: 130, critical: 50},
  {date: "2024-04-27", medium: 383, high: 420, critical: 50},
  {date: "2024-04-28", medium: 122, high: 180, critical: 50},
  {date: "2024-04-29", medium: 315, high: 240, critical: 50},
  {date: "2024-04-30", medium: 454, high: 380},
  {date: "2024-05-01", medium: 165, high: 220},
  {date: "2024-05-02", medium: 293, high: 310},
  {date: "2024-05-03", medium: 247, high: 190},
  {date: "2024-05-04", medium: 385, high: 420},
  {date: "2024-05-05", medium: 481, high: 390},
  {date: "2024-05-06", medium: 498, high: 520},
  {date: "2024-05-07", medium: 388, high: 300},
  {date: "2024-05-08", medium: 149, high: 210},
  {date: "2024-05-09", medium: 227, high: 180},
  {date: "2024-05-10", medium: 293, high: 330},
  {date: "2024-05-11", medium: 335, high: 270},
  {date: "2024-05-12", medium: 197, high: 240},
  {date: "2024-05-13", medium: 197, high: 160},
  {date: "2024-05-14", medium: 448, high: 490},
  {date: "2024-05-15", medium: 473, high: 380},
  {date: "2024-05-16", medium: 338, high: 400},
  {date: "2024-05-17", medium: 499, high: 420},
  {date: "2024-05-18", medium: 315, high: 350},
  {date: "2024-05-19", medium: 235, high: 180},
  {date: "2024-05-20", medium: 177, high: 230},
  {date: "2024-05-21", medium: 82, high: 140},
  {date: "2024-05-22", medium: 81, high: 120},
  {date: "2024-05-23", medium: 252, high: 290},
  {date: "2024-05-24", medium: 294, high: 220},
  {date: "2024-05-25", medium: 201, high: 250},
  {date: "2024-05-26", medium: 213, high: 170},
  {date: "2024-05-27", medium: 420, high: 460},
  {date: "2024-05-28", medium: 233, high: 190},
  {date: "2024-05-29", medium: 78, high: 130},
  {date: "2024-05-30", medium: 340, high: 280},
  {date: "2024-05-31", medium: 178, high: 230},
  {date: "2024-06-01", medium: 178, high: 200},
  {date: "2024-06-02", medium: 470, high: 410},
  {date: "2024-06-03", medium: 103, high: 160},
  {date: "2024-06-04", medium: 439, high: 380},
  {date: "2024-06-05", medium: 88, high: 140},
  {date: "2024-06-06", medium: 294, high: 250},
  {date: "2024-06-07", medium: 323, high: 370},
  {date: "2024-06-08", medium: 385, high: 320},
  {date: "2024-06-09", medium: 438, high: 480},
  {date: "2024-06-10", medium: 155, high: 200},
  {date: "2024-06-11", medium: 92, high: 150},
  {date: "2024-06-12", medium: 492, high: 420},
  {date: "2024-06-13", medium: 81, high: 130},
  {date: "2024-06-14", medium: 426, high: 380},
  {date: "2024-06-15", medium: 307, high: 350},
  {date: "2024-06-16", medium: 371, high: 310},
  {date: "2024-06-17", medium: 475, high: 520},
  {date: "2024-06-18", medium: 107, high: 170},
  {date: "2024-06-19", medium: 341, high: 290},
  {date: "2024-06-20", medium: 408, high: 450},
  {date: "2024-06-21", medium: 169, high: 210},
  {date: "2024-06-22", medium: 317, high: 270},
  {date: "2024-06-23", medium: 480, high: 530},
  {date: "2024-06-24", medium: 132, high: 180},
  {date: "2024-06-25", medium: 141, high: 190},
  {date: "2024-06-26", medium: 434, high: 380},
  {date: "2024-06-27", medium: 448, high: 490},
  {date: "2024-06-28", medium: 149, high: 200},
  {date: "2024-06-29", medium: 103, high: 160},
  {date: "2024-06-30", medium: 446, high: 400},
]

const chartConfig = {
  visitors: {
    label: "Messages",
  },
  medium: {
    label: "Medium",
    color: "rgb(243 188 115)",
  },
  high: {
    label: "High",
    color: "rgb(190 60 60)",
  },
  critical: {
    label: "Critical",
    color: "rgb(242 9 9)",
  },
} satisfies ChartConfig

export const DashboardChartTrend = () => {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Severity level trend</CardTitle>
          <CardDescription>
            Showing total messages for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months"/>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillmedium" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-medium)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-medium)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillhigh" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-high)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-high)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillcritical" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-critical)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-critical)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="high"
              type="natural"
              fill="url(#fillhigh)"
              stroke="var(--color-high)"
              stackId="a"
            />
            <Area
              dataKey="medium"
              type="natural"
              fill="url(#fillmedium)"
              stroke="var(--color-medium)"
              stackId="a"
            />
            <Area
              dataKey="critical"
              type="natural"
              fill="url(#fillcritical)"
              stroke="var(--color-critical)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent/>}/>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardChartTrend