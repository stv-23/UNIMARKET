"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.replace("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
