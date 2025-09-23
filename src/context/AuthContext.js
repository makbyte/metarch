'use client'

import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../lib/firebase'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ensure session persists across refresh
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser)
          setLoading(false)
        })

        return () => unsubscribe()
      })
      .catch((error) => {
        console.error('Error setting persistence:', error)
        setLoading(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
