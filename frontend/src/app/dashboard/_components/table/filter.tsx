import * as React from "react"
import {Column} from "@tanstack/react-table"
import {Check, PlusCircle} from "lucide-react"

import {cn} from "@/lib/utils"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import {ComponentType} from "react";

type filterValue = string | number

type Option = {
  label: string
  value: string | number
  icon?: ComponentType<{ className?: string }> | null
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
}

export function DashboardTableFilter<TData, TValue>({
                                                      column,
                                                      title,
                                                      options,
                                                    }: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as filterValue[])

  const hasSelectedValues = selectedValues.size > 0
  const hasThreeOrMoreSelectedValues = selectedValues.size > 2


  const renderCollapsedFilterLabels = () => {
    const text = `${selectedValues.size} selected`
    return <Badge
      variant="secondary"
      className="rounded-sm px-1 font-normal"
    >
      {text}
    </Badge>
  }

  const renderExpandedFilterLabels = () => {
    return options
      .filter((option) => selectedValues.has(option.value))
      .map((option) => (
        <Badge
          variant="secondary"
          key={String(option.value)}
          className="rounded-sm px-1 font-normal"
        >
          {option.label}
        </Badge>
      ))
  }

  const renderPopoverTrigger = () => {
    const filterLabels = hasThreeOrMoreSelectedValues ? renderCollapsedFilterLabels() : renderExpandedFilterLabels()

    const selectedCountBadge = <Badge
      variant="secondary"
      className="rounded-sm px-1 font-normal lg:hidden"
    >
      {selectedValues.size}
    </Badge>

    return <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="h-8 border-dashed">
        <PlusCircle/>
        {title}
        {hasSelectedValues && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4"/>
            {selectedCountBadge}
            <div className="hidden space-x-1 lg:flex">
              {filterLabels}
            </div>
          </>
        )}
      </Button>
    </PopoverTrigger>
  }

  const renderPopoverContent = () => {

    const commandItemRenderer = (option: Option) => {
      const isSelected = selectedValues.has(option.value)
      const facet = facets?.get(option.value) &&
        <span
          className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
        >
          {facets.get(option.value)}
        </span>

      const icon = option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground"/>;

      const handleSelect = () => {
        if (isSelected) {
          selectedValues.delete(option.value)
        } else {
          selectedValues.add(option.value)
        }
        const filterValues = Array.from(selectedValues)
        column?.setFilterValue(
          filterValues.length ? filterValues : undefined
        )
      }


      const checkClassname = cn(
        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "opacity-50 [&_svg]:invisible"
      )

      return (
        <CommandItem
          key={option.value}
          onSelect={handleSelect}
        >
          <div className={checkClassname}>
            <Check/>
          </div>
          {option.icon && (
            icon
          )}
          <span>{option.label}</span>
          {facet}
        </CommandItem>
      )
    }

    // TODO: decompose this into a separate components/functions
    return <PopoverContent className="w-[200px] p-0" align="start">
      <Command>
        <CommandInput placeholder={title}/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map(commandItemRenderer)}
          </CommandGroup>
          {hasSelectedValues && (
            <>
              <CommandSeparator/>
              <CommandGroup>
                <CommandItem
                  onSelect={() => column?.setFilterValue(undefined)}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </PopoverContent>
  }

  return (
    <Popover>
      {renderPopoverTrigger()}
      {renderPopoverContent()}
    </Popover>
  )
}