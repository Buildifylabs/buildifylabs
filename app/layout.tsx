// app/layout.tsx
import type { Metadata } from 'next'
import ClientLayout from './ClientLayout' // Import your client layout component
import './globals.css' // Ensure you still import your global CSS here or in ClientLayout

export const metadata: Metadata = {
  title: 'BuidifyLabs', // Your desired title
  description: 'craftung bespoke website that bring your brand to life and drive digital success', 

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}