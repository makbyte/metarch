import Link from 'next/link'
import clsx from 'clsx'
import '../styles/global.css'
export function Button({
  invert = false,
  className,
  children,
  flex,
  ...props
}) {
  className = clsx(
    `${flex ? 'flex justify-self-end' : 'inline-flex'} rounded-full px-4 py-1.5 text-sm font-semibold transition bg-[var(--bg)] text-white hover:bg-[var(--bgSofter)]`,
    className,
  )
  // invert
  //     ? 'bg-[var(--bgBlue)] text-[var(--bg)] hover:bg-blue-600'
  //     : 'bg-[var(--bgBlue)] text-white hover:bg-blue-600',
  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
