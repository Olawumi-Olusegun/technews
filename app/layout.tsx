import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { NextAuthProvider } from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech News',
  description: 'Get latest news reports in tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className='lg:max-w-[900px] px-5  lg:px-16 mx-auto py-8 shadow-md min-h-screen flex flex-col '>
            <Navbar />
              <main className='flex-auto'>{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
