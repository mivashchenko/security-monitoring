'use client'
import {
  LuDollarSign,
} from 'react-icons/lu'
import {DashboardCard} from "@/app/dashboard/_components/dashboard-card";
import {DashboardMessages} from "@/app/dashboard/_components/dashboard-messages";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {DashboardSeverityChart} from "@/app/dashboard/_components/dashboard-severity-chart";
import {DashboardAreaChart} from "@/app/dashboard/_components/dashboard-area-chart";
import {Card, CardContent} from "@/components/ui/card";

export function Dashboard() {
  const messages = useMessagesStore((state) => state.messages);
  const potentialViolations = messages.filter((message) => message.flagged).length;
  const noIssueMessages = messages.filter((message) => message.severity === "no issue").length;
  const lowSeverityIssues = messages.filter((message) => message.severity === "low").length;
  const mediumSeverityIssues = messages.filter((message) => message.severity === "medium").length;
  const highSeverityIssues = messages.filter((message) => message.severity === "high").length;
  const criticalSeverityIssues = messages.filter((message) => message.severity === "critical").length;

  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-1 flex-col gap-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          <DashboardSeverityChart data={{
            noIssueMessages,
            lowSeverityIssues,
            mediumSeverityIssues,
            highSeverityIssues,
            criticalSeverityIssues,
          }}/>
          <DashboardAreaChart/>
          <div className={'grid gap-4 grid-rows-2'}>
            <DashboardCard
              title={'Total Messages'}
              value={messages.length}
              description={'+20.1% from last month'}
              icon={<LuDollarSign className='h-4 w-4 text-muted-foreground'/>}
            />
            <DashboardCard
              title={'Potential Violations'}
              value={potentialViolations}
              description={'+180.1% from last month'}
              icon={<LuDollarSign className='h-4 w-4 text-muted-foreground'/>}
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