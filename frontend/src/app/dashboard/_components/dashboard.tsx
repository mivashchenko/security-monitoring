'use client'
import {
  LuCreditCard,
  LuDollarSign,
} from 'react-icons/lu'
import {DashboardCard} from "@/app/dashboard/_components/dashboard-card";
import {DashboardMessages} from "@/app/dashboard/_components/dashboard-messages";
import {DashboardComplianceViolations} from "@/app/dashboard/_components/dashboard-compliance-violations";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {DashboardSeverityChart} from "@/app/dashboard/_components/dashboard-severity-chart";

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
        {/*<div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>*/}
        {/*  <DashboardSeverityChart data={{*/}
        {/*    noIssueMessages,*/}
        {/*    lowSeverityIssues,*/}
        {/*    mediumSeverityIssues,*/}
        {/*    highSeverityIssues,*/}
        {/*    criticalSeverityIssues,*/}
        {/*  }}/>*/}
        {/*  <DashboardCard*/}
        {/*    title={'Total Messages'}*/}
        {/*    value={messages.length}*/}
        {/*    description={'+20.1% from last month'}*/}
        {/*    icon={<LuDollarSign className='h-4 w-4 text-muted-foreground'/>}*/}
        {/*  />*/}
        {/*  <DashboardCard*/}
        {/*    title={'Potential Violations'}*/}
        {/*    value={potentialViolations}*/}
        {/*    description={'+180.1% from last month'}*/}
        {/*    icon={<LuDollarSign className='h-4 w-4 text-muted-foreground'/>}*/}
        {/*  />*/}
        {/*  <DashboardCard*/}
        {/*    title={'Low Severity Issues'}*/}
        {/*    value={lowSeverityIssues}*/}
        {/*    description={'+19% from last month'}*/}
        {/*    icon={<LuCreditCard className='h-4 w-4 text-muted-foreground'/>}*/}
        {/*  />*/}
        {/*  <DashboardCard*/}
        {/*    title={'Medium Severity Issues'}*/}
        {/*    value={mediumSeverityIssues}*/}
        {/*    description={'+19% from last month'}*/}
        {/*    icon={<LuCreditCard className='h-4 w-4 text-muted-foreground'/>}*/}
        {/*  />*/}
        {/*  <DashboardCard*/}
        {/*    title={'High Severity Issues'}*/}
        {/*    value={highSeverityIssues}*/}
        {/*    description={'+19% from last month'}*/}
        {/*    icon={<LuCreditCard className='h-4 w-4 text-muted-foreground'/>}*/}
        {/*  />*/}
        {/*  <DashboardCard*/}
        {/*    title={'Critical Severity Issues'}*/}
        {/*    value={criticalSeverityIssues}*/}
        {/*    description={'+19% from last month'}*/}
        {/*    icon={<LuCreditCard className='h-4 w-4 text-muted-foreground'/>}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className=''>
          <DashboardMessages/>
          {/*<DashboardComplianceViolations/>*/}
        </div>
      </div>
    </div>
  )
}