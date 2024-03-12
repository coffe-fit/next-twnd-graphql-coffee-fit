'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';

import { language } from '@/lib/lenguage';
import { CalendarDouble, DropdownList } from "@/app/components/atoms";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";
import { Option } from "@/app/components/atoms/DropdownList";

export const Client = ({ user
}:any) => {
  const [days, setDays] = useState(0);

  const _language = language('español');

  const handleClickCalendar = (day: CalendarDayInterface) => {
    console.log("termino fijo");
    
  }

  const handleClickDropDownList= (option: Option) => {
    console.log(option);
    
  }

  return (
    <div className={`
      flex flex-col items-center h-full pt-20
    `}>
      <span className="flex flex-col items-center w-full text-2xl pt-4 pb-4">
        {_language.users}
      </span>

      <span>
        <CalendarDouble onclick={handleClickCalendar} size="sm" selectedColor={true}/>
      </span>
      <span className="pt-4 w-48">
        <DropdownList 
          textIni= {_language.rutineTime}
          classNameInput="w-48"
          onSelect={handleClickDropDownList}
          options = {
          [
            { id: '0', name: `${days === 0 ? _language.select : days} ${_language.days}`},
            { id: '1', name: `20 ${_language.days}`},
            { id: '2', name: `40 ${_language.days}`},
            { id: '3', name: `60 ${_language.days}`},
          ]
        }/>
      </span>
    </div>
  );
};
