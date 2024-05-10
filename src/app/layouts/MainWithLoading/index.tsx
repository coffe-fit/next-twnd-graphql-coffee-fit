'use client'
import Loading from "@/app/components/atoms/Loading";
import { useLoading } from "@/app/hooks/useLoading";
import { useLayoutEffect, useInsertionEffect, useEffect } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setLoading } = useLoading();

  useEffect(() => {
    console.log('false desde layout4');
    setLoading(false);
  }, []);

  
  return (
    <>
      {children}
    </>
  );
}