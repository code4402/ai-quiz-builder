"use client";
import Link from "next/link";
import { useAuth } from "@/app/context/authcontext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link href="/">Home</Link>

      <div style={{ float: "right" }}>
        {!user ? (
          <>
            <Link href="/auth/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
            <Link href="/auth/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link href="/teacher" style={{ marginRight: "1rem" }}>
              Teacher Dashboard
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
