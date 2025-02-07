'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {useEffect, useState} from "react"
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {useWebSocket} from "@/hooks/useWebSocket";
import {DashboardTablePagination} from "@/app/dashboard/_components/table/dashboard-table-pagination";
import {DataTableToolbar} from "@/app/dashboard/_components/table/dashboard-table-toolbar";
import {dashboardTableColumns} from "@/app/dashboard/_components/table/dashboard-table-columns";
import {useToast} from "@/hooks/use-toast";

export const DashboardTable = () => {
  useWebSocket()

  const messages = useMessagesStore((state) => state.messages.data);
  const messagesError = useMessagesStore((state) => state.messages.error);
  const fetchMessages = useMessagesStore((state) => state.fetch);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
    , [messagesError])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return <div className="space-y-4">
    <DataTableToolbar table={table}/>
    <div className={'rounded-md border'}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={dashboardTableColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <DashboardTablePagination table={table}/>
  </div>
}

export default DashboardTable