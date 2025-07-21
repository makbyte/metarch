import { RootLayout } from '@/components/RootLayout'
import { AuthProvider } from '@/context/AuthContext'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: 'Metarch',
    default: 'Metarch - Smart Machines Seamless forming Capabilites',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-[var(--bg)] text-base antialiased">
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <RootLayout>{children}</RootLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
