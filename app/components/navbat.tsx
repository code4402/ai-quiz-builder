"use client";

import Link from "next/link";
import { useAuth } from "../context/authcontext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "15px" }}>
      <Link href="/">Home</Link>

      {/* If user is logged in */}
      {user ? (
        <>
          <Link href="/teacher">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
