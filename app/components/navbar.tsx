'use client'
import { User } from '@supabase/supabase-js';

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {
 const [user, setUser] = useState<User | null>(null);


  // ✅ Load user state from Supabase
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white">
      <h1 className="font-bold text-lg">🧠 AI Quiz Builder</h1>

      <div className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/teacher">Teacher</Link>
        <Link href="/student">Student</Link>

        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/signin"
            className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
