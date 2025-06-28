// app/ClientLayout.tsx
"use client"; // Required for using usePathname

import './globals.css'
import Header from '@/components/header'
import { usePathname } from 'next/navigation'
import Footer from '@/components/footer';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <html lang="en">
      <body>
        {
          !pathname.startsWith("/dashboard") &&
          <Header />
        }

        <main>
          {children}
        </main>
        <footer>
          {!pathname.startsWith("/dashboard") && <Footer />}
        </footer>
      </body>
    </html>
  )
}