import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { auth } from '@/auth'
// import { SessionProvider } from 'next-auth/react'
// import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/app/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const session = await auth()

  return (
    // <SessionProvider session={session}>
      <html lang='en'>
        <body>
          <ThemeProvider attribute='class' defaultTheme='system'>
            {/*<Toaster />*/}
            {children}
          </ThemeProvider>
        </body>
      </html>
    // </SessionProvider>
  )
}