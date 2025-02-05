'use client'

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {useRef, useEffect, useState} from "react"
import {
  Cell,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, Header, HeaderGroup,
  Row, SortingState,
  useReactTable, VisibilityState
} from "@tanstack/react-table";
import {Message} from "@/stores/messages-store";
import {useVirtualizer} from "@tanstack/react-virtual";
import {useWebSocket} from "@/hooks/useWebSocket";
import {DataTablePagination} from "@/components/data-table-pagination";
import {DataTableToolbar} from "@/app/dashboard/_components/dashboard-messages-toolbar";
import {columns} from "@/app/dashboard/_components/columns";

export const DashboardMessages = () => {

  useWebSocket()

  const messages = useMessagesStore((state) => state.messages);
  const fetchMessages = useMessagesStore((state) => state.fetch);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data: messages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
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

  const {rows} = table.getRowModel()

  const count = rows.length


  const tableContainerRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 52,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  })


  useEffect(() => {
    fetchMessages()
  }, [])

  const renderCell = (cell: Cell<Message, unknown>) => {
    const content = flexRender(
      cell.column.columnDef.cell,
      cell.getContext()
    )
    const width = cell.column.getSize()

    // console.log(width, 'wwwwwwwwwwww')

    return (
      <TableCell
        key={cell.id}
        className={'flex'}
        style={{
          // width,
        }}
      >
        {content}
      </TableCell>
    )
  }

  const renderRow = (virtualRow: { index: number; start: number }) => {
    const row = rows[virtualRow.index] as Row<Message>
    const key = row.id
    const content = row.getVisibleCells().map(renderCell)

    return (
      <TableRow
        key={key}
        ref={node => virtualizer.measureElement(node)}
        data-index={virtualRow.index}
        // className={'w-full absolute flex'}
        // style={{
        //   transform: `translateY(${virtualRow.start}px)`,
        // }}
      >
        {content}
      </TableRow>
    )
  }

  const renderHeaderCell = (header: Header<Message, unknown>) => {
    const key = header.id;
    const headerSize = header.getSize();

    const content = flexRender(
      header.column.columnDef.header,
      header.getContext()
    );

    return (
      <TableHead
        key={key}
        // className={'flex'}
        style={{
          // width: headerSize,
        }}
      >
        {content}
      </TableHead>
    )
  }

  const renderHeaderRow = (headerGroup: HeaderGroup<Message>) => {
    const key = headerGroup.id;
    const content = headerGroup.headers.map(renderHeaderCell);

    return <TableRow
      key={key}
      // className={'flex w-full'}
    >
      {content}
    </TableRow>

  }

  return <Card
    className={'col-span-2'}
  >
    <CardHeader>
      <div className="space-y-4">
        <DataTableToolbar table={table}/>
      </div>
    </CardHeader>
    <CardContent>
      <div
        ref={tableContainerRef}
        className={'rounded-md border overflow-auto relative'}
        style={{
          // height: '580px',
        }}>
        <Table
          // className={'w-full caption-bottom text-sm grid'}
        >
          <TableHeader
            // className={'bg-card grid sticky top-0 z-1'}
          >
            {table.getHeaderGroups().map(renderHeaderRow)}
          </TableHeader>
          <TableBody
            // className={'grid relative'}
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            {virtualizer.getVirtualItems().map(renderRow)}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table}/>
    </CardContent>
  </Card>
}