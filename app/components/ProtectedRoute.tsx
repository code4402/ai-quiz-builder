"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/signin"); // user not logged in
      }
      else if (role && user.role !== role) {
        router.push("/unauthorized"); // role mismatch
      }
    }
  }, [user, loading, router, role]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
