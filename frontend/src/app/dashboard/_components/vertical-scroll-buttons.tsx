"use client"
import {ArrowUp, ArrowDown, Minus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

interface VerticalScrollButtonsProps {
  onScrollTop: () => void
  onScrollMiddle: () => void
  onScrollBottom: () => void
}

export const VerticalScrollButtons = ({
                                        onScrollTop,
                                        onScrollMiddle,
                                        onScrollBottom,
                                      }: VerticalScrollButtonsProps) => {

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={onScrollTop}
        aria-label="Scroll to top"
        className={cn(
          "rounded-b-none",
          "hover:bg-primary hover:text-primary-foreground",
          "focus-visible:bg-primary focus-visible:text-primary-foreground",
        )}
      >
        <ArrowUp className="h-4 w-4"/>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onScrollMiddle}
        aria-label="Scroll to middle"
        className={cn(
          "rounded-none border-t-0 border-b-0",
          "hover:bg-primary hover:text-primary-foreground",
          "focus-visible:bg-primary focus-visible:text-primary-foreground",
        )}
      >
        <Minus className="h-4 w-4"/>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onScrollBottom}
        aria-label="Scroll to bottom"
        className={cn(
          "rounded-t-none border-t-0",
          "hover:bg-primary hover:text-primary-foreground",
          "focus-visible:bg-primary focus-visible:text-primary-foreground",
        )}
      >
        <ArrowDown className="h-4 w-4"/>
      </Button>
    </div>
  )
}

