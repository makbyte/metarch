'use client'
import { cn } from '../../lib/utlis'

export function Card({ data }) {
  return (
    <div className="group/card mt-12 w-full max-w-xs">
      <div
        className={cn(
          'card backgroundImage relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col justify-end overflow-hidden rounded-md p-4 shadow-xl',
          'bg-cover',
        )}
        style={{ backgroundImage: `url(${data?.bgSrc ?? '/fallback.jpg'})` }}
      >
        {/* <div className="absolute top-0 left-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
        <div className="z-10 flex flex-row items-center space-x-4">
          <img
            height="100"
            width="100"
            alt="Avatar"
            src="/manu.png"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="relative z-10 text-base font-normal text-gray-50">
              Manu Arora
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div> */}
        <div className="text content">
          <h1 className="text-md relative z-10 inline-block rounded-2xl bg-gray-100 px-2 py-1 font-bold text-[var(--bg)] md:text-lg">
            Author Card
          </h1>
        </div>
      </div>
    </div>
  )
}
