'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const router = useRouter()
  const { user, signOut } = useAuth()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">AI Quiz Builder</h1>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        {user ? (
          <>
            {user.role === 'teacher' && <Link href="/teacher">Teacher</Link>}
            {user.role === 'student' && <Link href="/student">Student</Link>}
            <button onClick={signOut} className="text-red-400">
              Logout
            </button>
          </>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </nav>
  )
}
