'use client'
import { useId } from 'react'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { useForm, ValidationError } from '@formspree/react'
function TextInput({ label, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-[var(--bg)] ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-[var(--bg)] peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-[var(--bg)]"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({ label, ...props }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-[var(--bg)]">{label}</span>
    </label>
  )
}
import { useEffect, useRef } from 'react'

function ContactForm() {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID
  const [state, handleSubmit] = useForm(id)
  const formRef = useRef(null)

  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset()
    }
  }, [state.succeeded])

  return (
    <FadeIn className="lg:order-last">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-[var(--bg)]">
          Work inquiries
        </h2>

        {state.succeeded && (
          <p className="mb-4 text-green-600">✅ Thanks for Connecting!</p>
        )}

        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
          <TextInput label="Message" name="message" />
        </div>

        <Button type="submit" className="mt-10" disabled={state.submitting}>
          {state.submitting ? 'Sending...' : 'Let’s work together'}
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-[var(--bg)]">
        Our offices
      </h2>
      <p className="mt-6 text-base text-[var(--bgSofter)] capitalize">
        for a free consultation with our technical experts.
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-[var(--bg)]">
          Email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Mail to', 'metarch92@gmail.com'],
            ['Contact', '+918591030313'],
          ].map(([label, item]) => (
            <div key={item}>
              <dt className="font-semibold text-[var(--bg)]">{label}</dt>
              <dd>
                {item.split('').includes('@') ? (
                  <Link
                    href={`mailto:${item}`}
                    className="text-[var(--bgSofter)] hover:text-[var(--bg)]"
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    href={`tel:${item}`}
                    className="text-[var(--bgSofter)] hover:text-[var(--bg)]"
                  >
                    {item}
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-[var(--bg)]">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact us" title="Let’s work together">
        <p>We can’t wait to hear from you.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
