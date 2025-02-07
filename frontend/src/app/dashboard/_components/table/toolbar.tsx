"use client"

import {Table} from "@tanstack/react-table"
import {X} from "lucide-react"

import {DashboardTableViewOptions} from "@/app/dashboard/_components/table/view-options";
import {DashboardTableFilter} from "@/app/dashboard/_components/table/filter";
import {statuses, severities} from "@/app/dashboard/_components/table/data";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DashboardTableToolbar<TData>({
                                               table,
                                             }: DataTableToolbarProps<TData>) {

  const isFiltered = table.getState().columnFilters.length > 0

  const renderInput = () => {
    const value = (table.getColumn("email")?.getFilterValue() as string) ?? ""
    const handleChange = (event: { target: { value: any; }; }) =>
      table.getColumn("email")?.setFilterValue(event.target.value)

    return <Input
      className="h-8 w-[150px] lg:w-[250px]"
      placeholder="Filter messages..."
      value={value}
      onChange={handleChange}
    />
  }

  const renderFilters = () => {
    const filters = [
      {
        column: 'severity',
        title: 'Severity',
        options: severities
      },
      {
        column: 'flagged',
        title: 'Status',
        options: statuses
      }
    ]

    return filters.map(filter => {
      const column = table.getColumn(filter.column)
      if (!column) return null

      return <DashboardTableFilter
        key={filter.column}
        column={column}
        title={filter.title}
        options={filter.options}
      />
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {renderInput()}
        {renderFilters()}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X/>
          </Button>
        )}
      </div>
      <DashboardTableViewOptions table={table}/>
    </div>
  )
}