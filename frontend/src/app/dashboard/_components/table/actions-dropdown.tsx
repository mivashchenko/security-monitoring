import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {Message} from "@/stores/messages-store";

interface DashboardTableActionsDropdownProps {
  message: Message;
}

export const DashboardTableActionsDropdown = ({
                                                   message
                                                 }: DashboardTableActionsDropdownProps) => {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-[20px] w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(String(message.id))}
      >
        Copy data
      </DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>View user details</DropdownMenuItem>
      <DropdownMenuItem>Change severity</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}