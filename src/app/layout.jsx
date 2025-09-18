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
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
        {/* Main content */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Metarch
            </h1>
            <p className="text-lg text-gray-600">
              We build thoughtful products for ambitious teams.
            </p>

            <div className="my-6 border-t border-gray-300"></div>

            <h2 className="rounded-lg bg-gray-100 p-4 text-2xl font-semibold text-gray-800 shadow-sm">
              🚧 Our website is under construction 🚧
            </h2>

            <p className="text-lg leading-relaxed text-gray-700">
              We&apos;re crafting something exceptional. Check back soon — or
              leave your email and we&apos;ll let you know the moment we launch.
            </p>

            <form className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 sm:w-72"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow hover:bg-blue-700 sm:w-auto"
              >
                Notify Me
              </button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-300 bg-gray-50 py-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Metarch. All rights reserved.</p>
          <p className="mt-1">
            Powered by{' '}
            <a
              href="https://makbyte.io"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              MAK Byte
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}
