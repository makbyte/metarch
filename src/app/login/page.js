'use client'

import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useId, useState } from 'react'
import { auth } from '../../../lib/firebase'
import Link from 'next/link'

function TextInput({ label, type, onChange, ...props }) {
  let id = useId()

  return (
    <div className="relative z-0 w-full">
      <input
        required
        onChange={(e) => onChange(e)}
        type={type}
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full rounded-xl border border-gray-300 bg-transparent px-4 pt-10 pb-3 text-base text-gray-900 ring-2 ring-transparent transition focus:border-blue-600 focus:ring-blue-100 focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-4 -mt-4 origin-left text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-blue-600"
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--bg)] px-4">
      <div className="absolute top-6 right-6">
        <Link
          href="/"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Home
        </Link>
      </div>

      <FadeIn className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
        >
          <h2 className="mb-8 text-center font-display text-2xl font-semibold text-gray-900">
            Welcome Back 👋
          </h2>

          <div className="space-y-6">
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
            <div className="mt-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              className="bg-blue-600 px-10 py-2 hover:bg-blue-700"
              flex={true}
            >
              Login
            </Button>
          </div>
        </form>
      </FadeIn>
    </div>
  )
}

export default Login
