'use client'
import {
  LuMessageSquareText, LuOctagonAlert,
} from 'react-icons/lu'
import {DashboardCard} from "@/app/dashboard/_components/cards/dashboard-card";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {Card, CardContent} from "@/components/ui/card";
import {lazy} from "react";

const DashboardSeverityChart = lazy(() => import("@/app/dashboard/_components/charts/dashboard-chart-severity"))
const DashboardAreaChart = lazy(() => import("@/app/dashboard/_components/charts/dashboard-chart-area"))
const DashboardMessages = lazy(() => import("@/app/dashboard/_components/table/dashboard-table"))

export function Dashboard() {
  const messages = useMessagesStore((state) => state.messages.data);
  const potentialViolations = messages.filter((message) => message.flagged).length;

  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-1 flex-col gap-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          <DashboardSeverityChart/>
          <DashboardAreaChart/>
          <div className={'grid gap-4 grid-rows-2'}>
            <DashboardCard
              title={'Total Messages'}
              value={messages.length}
              description={'+20.1% from last month'}
              icon={<LuMessageSquareText className='h-4 w-4 text-muted-foreground'/>}
            />
            <DashboardCard
              title={'Potential Violations'}
              value={potentialViolations}
              description={'+180.1% from last month'}
              icon={<LuOctagonAlert className='h-4 w-4 text-muted-foreground'/>}
            />
          </div>
        </div>
        <Card className='pt-6'>
          <CardContent>
            <DashboardMessages/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}