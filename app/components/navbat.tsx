'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-blue-400">
          🧠 AI Quiz Builder
        </Link>
        <Link href="/teacher" className="hover:text-blue-300">Teacher Dashboard</Link>
        <Link href="/student" className="hover:text-blue-300">Student Dashboard</Link>
      </div>

      {/* Right Section */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">{user.email}</span>
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
