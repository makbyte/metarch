import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'

const navigation = [
  // {
  //   title: 'Work',
  //   links: [
  //     { title: 'FamilyFund', href: '/work/family-fund' },
  //     { title: 'Unseal', href: '/work/unseal' },
  //     { title: 'Phobia', href: '/work/phobia' },
  //     {
  //       title: (
  //         <>
  //           See all <span aria-hidden="true">&rarr;</span>
  //         </>
  //       ),
  //       href: '/work',
  //     },
  //   ],
  // },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Products', href: '/products' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-[var(--bg)]">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    target={section.title === 'Connect' && '_blank'}
                    className="transition hover:text-[var(--bg)]"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-[var(--bg)]">
        Stay Ahead with Metarch
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe for the latest updates on intelligent manufacturing,
        breakthrough technologies, and innovations — straight to your inbox.
      </p>
      {/* <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-[var(--bg)] ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-[var(--bg)] text-white transition hover:bg-[var(--bgSofter)]"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div> */}
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <span className="flex flex-col items-end">
            <p className="text-sm text-neutral-700">
              © Metarch Inc. {new Date().getFullYear()}
            </p>
            <p className="text-sm font-bold text-gray-800">
              Powered By{' '}
              <a
                href="https://makbyte.io/"
                target="_"
                className="text-blue-600 transition-all duration-200 ease-in-out hover:text-blue-700"
              >
                MAK &#123;Byte&#125;
              </a>
            </p>
          </span>
        </div>
      </FadeIn>
    </Container>
  )
}
