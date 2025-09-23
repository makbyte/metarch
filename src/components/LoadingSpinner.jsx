'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex h-3/4 items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Loading, please wait...
        </p>
      </div>
    </div>
  )
}
