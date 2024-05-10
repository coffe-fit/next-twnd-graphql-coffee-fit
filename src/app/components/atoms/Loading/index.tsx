
'use client'
import { useLoading } from "@/app/hooks/useLoading";
import { ReactNode, useEffect, useState } from "react";


interface props {
  children: ReactNode
}

export default function Loading({}:props) {
  const { loading } = useLoading();
  console.log('loading true', loading);
  
  return (
    <>
    {loading && 
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60">
        loading .......................
      </div>}
    </>
  );
}