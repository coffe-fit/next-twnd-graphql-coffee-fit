'use client'
import { language } from '@/lib/lenguage';
import { ReactNode }from 'react';

interface props {
  dayName: string,
  children: ReactNode
}

export const CalendarByDay = ({
  dayName,
  children
}:props) => {
  const _language = language('español');
  
  return (
    <div className="flex flex-col items-center h-full">
      <div className="cff-border-1 w-80">
        <span className="flex flex-col items-center w-full text-2xl">
          {dayName}
        </span>
        <div className="cff-border-1 w-auto"></div>
        {children}
      </div>
    </div>
  );
};
