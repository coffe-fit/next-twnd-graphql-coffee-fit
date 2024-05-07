'use client'
import { ReactNode, useEffect, useState } from "react";
import { useLoading } from "./hooks/useLoading";

interface props {
  children: ReactNode
}

export default function Loading({children}:props) {
  const { loading, setLoading } = useLoading();
  return (
    <>
    {loading && 
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60">
        loading .......................
      </div>}
    </>
  );
}