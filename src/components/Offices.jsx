import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm capitalize not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-[var(--bg)]'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Mira Road" invert={invert}>
          Gala no 01, DS patel compound, opp color pack company
          <br />
          Ghodbubder village, mira road East Mumbai
        </Office>
      </li>
    </ul>
  )
}
