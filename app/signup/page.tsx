'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) setError(error.message)
    else router.push('/signin') // Redirect to sign in

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSignUp} className="flex flex-col w-80 gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white rounded py-2"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-sm mt-2">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  )
}
