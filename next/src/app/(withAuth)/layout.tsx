"use client";
import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";
import { useCookies } from "react-cookie";

export default function AuthLayout({ children }: PropsWithChildren<unknown>) {
  const { push } = useRouter();
  const [{ token }] = useCookies();
  useEffect(() => {
    if (!token) {
      push("/");
    }
  }, [token]);

  return children;
}
