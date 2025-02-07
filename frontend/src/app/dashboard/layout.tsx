import {
  TooltipProvider,
} from '@/components/ui/tooltip'
import {ReactNode} from 'react'
import {ThemeModeToggle} from '@/components/theme-mode-toggler'
import {Navigation} from "@/components/navigation";
import {NavigationMobile} from "@/components/navigation-mobile";
import {MessagesStoreProvider} from "@/providers/messages-store-provider";
import {Toaster} from "@/components/ui/toaster";

export default function ProtectedLayout({children}: { children: ReactNode }) {
  return (
      <MessagesStoreProvider>
        <TooltipProvider>
          <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
              <Navigation/>
            </aside>
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
              <header
                className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
                <span className='text-lg font-semibold uppercase'>Akhenaten</span>
                <NavigationMobile/>
                <div className='ml-auto flex items-center'>
                  <div className={'mr-2'}>
                    <ThemeModeToggle/>
                  </div>
                </div>
              </header>
              <main className='flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
                {children}
              </main>
              <Toaster />
            </div>
          </div>
        </TooltipProvider>
      </MessagesStoreProvider>
  )
}