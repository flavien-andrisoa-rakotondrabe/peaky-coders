"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, authenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && authenticated) {
      router.replace("/home");
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return null;
  }

  return children;
}
