'use client'

export default function LoadingSpinner({
  fullPage = false,
  message = 'Loading, please wait...',
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullPage ? 'min-h-screen' : 'py-10'
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        {/* Message */}
        {message && (
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        )}
      </div>
    </div>
  )
}
