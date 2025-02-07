'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {useEffect, useState} from "react"
import {
  Cell,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  Row,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {useMessagesSocket} from "@/hooks/use-messages-socket";
import {DashboardTablePagination} from "@/app/dashboard/_components/table/pagination";
import {DashboardTableToolbar} from "@/app/dashboard/_components/table/toolbar";
import {dashboardTableColumns} from "@/app/dashboard/_components/table/columns";
import {useToast} from "@/hooks/use-toast";
import {Message} from "@/stores/messages-store";

export const DashboardTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})


  const messages = useMessagesStore((state) => state.messages.data);
  const messagesError = useMessagesStore((state) => state.messages.error);
  const fetchMessages = useMessagesStore((state) => state.fetch);


  useMessagesSocket()
  const {toast} = useToast()

  const table = useReactTable({
    data: messages,
    columns: dashboardTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  useEffect(() => {
      if (messagesError) {
        toast({
          variant: "destructive",
          title: "Fetch messages failed",
          description: messagesError.message,
        })
      }
    }
    , [messagesError, toast])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])


  const renderHeader = () => {
    const cellRenderer = (header: Header<Message, unknown>) => {
      const content = flexRender(
        header.column.columnDef.header,
        header.getContext()
      )

      return (
        <TableHead key={header.id} colSpan={header.colSpan}>
          {header.isPlaceholder ? null : content}
        </TableHead>
      )
    }

    const rowRenderer = (headerGroup: { id: string; headers: Header<Message, unknown>[] }) => {

      return (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(cellRenderer)}
        </TableRow>
      )
    }

    return <TableHeader>
      {table.getHeaderGroups().map(rowRenderer)}
    </TableHeader>
  }


  const renderTableBody = () => {
    const rows = table.getRowModel().rows
    const hasRows = !!rows.length

    const noResultsRow = (
      <TableRow>
        <TableCell
          colSpan={dashboardTableColumns.length}
          className="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    )

    const cellRenderer = (cell: Cell<Message, unknown>) => {
      const content = flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )

      return (
        <TableCell key={cell.id}>
          {content}
        </TableCell>
      )
    }

    const rowRenderer = (row: Row<Message>) => {
      const dataState = row.getIsSelected() && "selected"
      const content = row.getVisibleCells().map(cellRenderer)

      return (
        <TableRow
          key={row.id}
          data-state={dataState}
        >
          {content}
        </TableRow>
      )
    }

    return <TableBody>
      {hasRows ? rows.map(rowRenderer) : noResultsRow}
    </TableBody>
  }

  return <div className="space-y-4">
    <DashboardTableToolbar table={table}/>
    <div className={'rounded-md border'}>
      <Table>
        {renderHeader()}
        {renderTableBody()}
      </Table>
    </div>
    <DashboardTablePagination table={table}/>
  </div>
}

export default DashboardTable