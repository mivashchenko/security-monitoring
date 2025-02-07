import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { ReactNode} from "react";


interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: ReactNode;
}

export const DashboardCard = ({
                                title,
                                value,
                                description,
                                icon
                              }: DashboardCardProps) => {


  return <Card x-chunk='dashboard-01-chunk-0'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>
        {title}
      </CardTitle>
      {icon && icon}
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>{value}</div>
      <p className='text-xs text-muted-foreground'>
        {description}
      </p>
    </CardContent>
  </Card>
}
