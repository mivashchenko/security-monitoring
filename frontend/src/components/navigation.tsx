'use client'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {navigationItems} from "@/app/constants";



export const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className='flex flex-col items-center gap-4 px-2 py-4'>
      <Link
        href='#'
        className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
      >
        <svg className='lucide lucide-pyramid font-light size-8 h-4 w-4 transition-all group-hover:scale-110' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"></path>
          <path d="M12 2v20"></path>
        </svg>
        <span className='sr-only'>Akhenaten</span>
      </Link>
      {navigationItems.map(({title, icon, href}) => {
        const isActive = pathname === href

        const activeClassname = isActive
          ? 'text-accent-foreground'
          : 'text-muted-foreground'
        return (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className={cn(
                'flex h-9 w-9 items-center justify-center' +
                    ' rounded-lg' +
                    ' transition-colors hover:text-foreground md:h-8 md:w-8',
                  activeClassname
                )}
              >
                {icon}
                <span className='sr-only'>{title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>{title}</TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}