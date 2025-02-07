"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import {DashboardTableViewOptions} from "@/app/dashboard/_components/table/dashboard-table-view-options";
import {DataTableFacetedFilter} from "@/app/dashboard/_components/table/dashboard-table-filter";
import {statuses, severities} from "@/app/dashboard/data";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter messages..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("severity") && (
          <DataTableFacetedFilter
            column={table.getColumn("severity")}
            title="Severity"
            options={severities}
          />
        )}
        {table.getColumn("flagged") && (
          <DataTableFacetedFilter
            column={table.getColumn("flagged")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DashboardTableViewOptions table={table} />
    </div>
  )
}