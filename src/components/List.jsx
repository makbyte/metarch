import clsx from 'clsx'

import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function List({ children, className }) {
  return (
    <FadeInStagger>
      <ul
        role="list"
        className={clsx('text-base text-[var(--bgSofter)]', className)}
      >
        {children}
      </ul>
    </FadeInStagger>
  )
}

export function ListItem({ children, title }) {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <Border className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
          {title && (
            <strong className="font-semibold text-[var(--bg)]">{`${title}. `}</strong>
          )}
          {children}
        </Border>
      </FadeIn>
    </li>
  )
}
