import { ReactNode } from "react";
import { DashboardHeader as Header } from '@/app/components';

interface props {
  children: ReactNode
}

export default function DashboardLayout({children}:props) {
  return (
    <div className="flex flex-col items-center h-screen">
      <Header></Header>
      <span className="
        h-[calc(100%-2.5rem)]
        fixed top-9
        overflow-y-auto
        w-full
      ">{children}</span>
    </div>
  );
}