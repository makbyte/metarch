'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useId, useState } from 'react'
import { auth } from '../../../lib/firebase'
import Link from 'next/link'

function TextInput({ label, type, onChange, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        required
        onChange={(e) => onChange(e)}
        type={type}
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base text-[var(--bg)] ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-none dark:border-neutral-600"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-[var(--bg)] peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-[var(--bg)]"
      >
        {label}
      </label>
    </div>
  )
}

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      if (loginData.email && loginData.password) {
        await signInWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password,
        )
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error.message)
      console.log('Error', error)
    }
  }

  const inputChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Container className="mt-16 w-full max-w-xl">
      {/* Top-right Home Button */}
      <div className="mb-4 flex justify-end">
        <Link
          href="/"
          className="rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-gray-100 hover:text-[var(--bg)]"
        >
          Home
        </Link>
      </div>

      <FadeIn className="w-full">
        <form
          onSubmit={handleLogin}
          className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800"
        >
          <h2 className="mb-6 text-center font-display text-3xl font-semibold text-gray-900 dark:text-white">
            Welcome to Login Form
          </h2>

          <div className="-space-y-px">
            <TextInput
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              onChange={inputChange}
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={inputChange}
            />
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-100 p-3 text-center text-sm text-red-600 dark:bg-red-400/10 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              className="bg-blue-600 px-10 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              flex={true}
            >
              Login
            </Button>
          </div>
        </form>
      </FadeIn>
    </Container>
  )
}

export default Login
