import {ColumnDef} from "@tanstack/react-table";
import {Message} from "@/stores/messages-store";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DataTableColumnHeader} from "@/components/DataTableColumnHeader";
import {SeverityBadge, SeverityLevel} from "@/components/ui/severity-badge";
import {timeAgo} from "@/utils";
import {DashboardMessagesActionsDropdown} from "@/app/dashboard/_components/dashbard-messages-actions-dropdown";

export const columns: ColumnDef<Message, any>[] = [
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
      // size: 40,
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
      // size: 120,
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
        <DataTableColumnHeader column={column} title="Status"/>
      ),
      accessorKey: 'flagged',
      // size: 100,
      cell: (info) => {
        const value = info.getValue<boolean>();
        return value ? 'Alert' : 'OK';
      }
    },
    {
      accessorKey: 'user',
      // size: 140,
      cell: info => {
        return <span className='truncate'>{info.getValue<string>()}</span>
      },
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="User"/>
      )
    },
    {
      accessorKey: 'email',
      // size: 201,
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Email"/>
      ),
    },
    {
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Messages"/>
      ),
      accessorKey: 'content',
      // size: undefined,
      cell: info => {
        return <span className='truncate'>{info.getValue<string>()}</span>
      }
    },
    {
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Severity"/>
      ),
      accessorKey: 'severity',
      // size: 100,
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
        <DataTableColumnHeader column={column} title="Timestamp"/>
      ),
      accessorKey: 'timestamp',
      // size: 200,
      cell: (info) => {
        const date = new Date(info.getValue() as string);
        const humanReadable = date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        return <div className={'flex flex-col'}>
          <span className={'text-black'}>{timeAgo(date)}</span>
          <span className={'text-xs text-gray-500'}>{humanReadable}</span>
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