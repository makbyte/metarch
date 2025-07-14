'use client'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { useRouter } from 'next/navigation'
import React, { useId, useState } from 'react'
function TextInput({ label, type, onChange, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        onChange={(e) => onChange(e)}
        type={type}
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

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const handleLogin = (e) => {
    e.preventDefault()

    if (loginData.email && loginData.password) {
      router.push('/addProduct')
    } else if (loginData.email === '' && loginData.password) {
      setError('Email field is empty!!!')
    } else if (loginData.password === '' && loginData.email) {
      setError('Password field is empty!!!')
    } else {
      setError('both field are empty!!!')
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
    <Container className="mt-20 w-3/4 md:w-1/2">
      <FadeIn className="w-full lg:order-last">
        <form onSubmit={handleLogin}>
          <h2 className="text-center font-display text-4xl font-semibold text-white">
            Welcome to Login Form
          </h2>
          <div className="isolate mt-6 -space-y-px rounded-2xl bg-white">
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
              autoComplete="password"
              onChange={inputChange}
            />
          </div>
          {error && (
            <div className="mt-3 flex items-center justify-center rounded-xl bg-white p-4">
              <span className="text-center text-xl text-red-600 capitalize">
                {error}
              </span>
            </div>
          )}
          <Button
            type="submit"
            className="mt-10 flex justify-self-end bg-blue-500 px-10 hover:bg-blue-600"
            flex={true}
          >
            Login
          </Button>
        </form>
      </FadeIn>
    </Container>
  )
}

export default Login
