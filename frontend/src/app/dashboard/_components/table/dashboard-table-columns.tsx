import {ColumnDef} from "@tanstack/react-table";
import {Message} from "@/stores/messages-store";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DashboardTableColumnHead} from "@/app/dashboard/_components/table/dashboard-table-column-head";
import {SeverityBadge, SeverityLevel} from "@/components/ui/severity-badge";
import {timeAgo, toHumanReadableDate} from "@/utils";
import {DashboardMessagesActionsDropdown} from "@/app/dashboard/_components/table/dashboard-table-actions-dropdown";

export const dashboardTableColumns: ColumnDef<Message>[] = [
    {
      id: "select",
      header: ({table}) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      header: () => {
        return <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
        >
          <span>ID</span>
        </Button>
      },
      accessorKey: 'id',
      enableSorting: false,
      enableColumnFilter: false,
      cell: info => {
        return <Link className={'hover:underline text-blue-500'} href={`/message-details/${info.getValue()}`}>
          {info.getValue<number>()}
        </Link>
      }
    },
    {
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="Status"/>
      ),
      accessorKey: 'flagged',
      cell: (info) => {
        const value = info.getValue<boolean>();
        return value ? 'Alert' : 'OK';
      }
    },
    {
      accessorKey: 'user',
      cell: info => {
        return <span className='truncate'>{info.getValue<string>()}</span>
      },
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="User"/>
      )
    },
    {
      accessorKey: 'email',
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="Email"/>
      ),
    },
    {
      accessorKey: 'violationType',
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="Violation Type (GPT)"/>
      ),
    },
    {
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="Messages"/>
      ),
      accessorKey: 'content',
      cell: info => {
        return <span className='truncate'>{info.getValue<string>()}</span>
      }
    },
    {
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="Severity"/>
      ),
      accessorKey: 'severity',
      cell: (info) => {
        const value = info.getValue<SeverityLevel>();
        return <SeverityBadge level={value || 'no issue'}/>
      },
          filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    },
    {
      header: ({column}) => (
        <DashboardTableColumnHead column={column} title="Timestamp"/>
      ),
      accessorKey: 'timestamp',
      cell: (info) => {
        const date = new Date(info.getValue() as string);

        return <div className={'flex flex-col'}>
          <span className={'text-black text-nowrap'}>{timeAgo(date)}</span>
          <span className={'text-xs text-gray-500 text-nowrap'}>{toHumanReadableDate(date)}</span>
        </div>;
      }
    },
    {
      id: "actions",
      cell: ({row}) => {
        const message = row.original
        return (
          <DashboardMessagesActionsDropdown message={message}/>
        )
      },
    }
  ]