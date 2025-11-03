import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude 101',
  description: 'A Next.js learning project with TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
