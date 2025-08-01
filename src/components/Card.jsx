'use client'

import Image from 'next/image'

export function Card({ data }) {
  const { bgSrc, title = 'Author Card' } = data || {}

  return (
    <div className="mt-12 w-full max-w-xs overflow-hidden rounded-2xl border border-gray-300 shadow-xl">
      <div className="relative h-60 w-full">
        <Image
          src={bgSrc?.src ?? '/fallback.jpg'}
          alt={title}
          fill
          className="object-cover transition-all duration-300 ease-in-out hover:scale-104"
        />
      </div>
      <div className="bg- bg-gray-100 p-4">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        {/* Optional: Add more content here */}
      </div>
    </div>
  )
}
