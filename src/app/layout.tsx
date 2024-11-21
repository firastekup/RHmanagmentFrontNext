import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/navbar'

export const metadata: Metadata = {
  title: 'SysLearn - Plateforme d\'apprentissage',
  description: 'Plateforme innovative d\'apprentissage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}