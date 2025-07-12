import { RootLayout } from '@/components/RootLayout'

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
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
