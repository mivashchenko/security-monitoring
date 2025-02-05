'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { FaKey } from 'react-icons/fa6'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FaBookReader } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { LuSettings } from 'react-icons/lu'
import {navigationItems} from "@/app/constants";

export const NavigationMobile = () => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden'>
          <MdMenu className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='sm:max-w-xs'>
        <nav className='grid gap-6 text-lg font-medium'>
          <Link
            href='/admin'
            className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
          >
            <FaBookReader className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>MossBook Inc</span>
          </Link>
          {navigationItems.map(({ title, icon, href }) => {
            const isActive = pathname === href

            const activeClassname = isActive
              ? 'text-accent-foreground'
              : 'text-muted-foreground'
            return (
              <SheetClose key={title} asChild>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-4 px-2.5 hover:text-foreground',
                    activeClassname
                  )}
                >
                  {icon}
                  {title}
                </Link>
              </SheetClose>
            )
          })}

          <SheetClose asChild>
            <Link
              href='/admin/settings'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <LuSettings className='h-5 w-5' />
              Settings
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}