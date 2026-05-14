"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {
      router.replace("/home");
    }
  }, [token, loading, router]);

  if (loading) {
    return null;
  }

  return children;
}
