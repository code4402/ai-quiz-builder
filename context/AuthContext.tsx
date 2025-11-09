'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type User = {
  id: string
  email: string
  role?: string
} | null

type AuthContextType = {
  user: User
  loading: boolean
  signIn: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  // ✅ Load current session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      const currentUser = data.session?.user

      if (currentUser) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', currentUser.id)
          .single()
        setUser(userData)
      }
      setLoading(false)
    }

    getSession()

    // ✅ Listen to login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getSession()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // ✅ Magic link sign-in
  const signIn = async (email: string) => {
    await supabase.auth.signInWithOtp({ email })
    alert('Magic link sent! Check your email.')
  }

  // ✅ Logout
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
