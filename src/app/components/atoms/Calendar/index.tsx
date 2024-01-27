'use client'
import { getDaysInMonth } from "@/lib/util";
//import { DayCircule as DayBox } from "./DayCircule";
//import { DayBoxWired as DayBox } from "./DayBoxWired";
import { DayBox } from "./DayBox";
import { useState } from "react";
import { Input } from "../Input";
import { language } from '@/lib/lenguage';
import { HeaderMonths } from "./HeaderMonths";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";


interface props {
  size: 'sm' | 'lg' | 'xl',
  onclick?: (e: CalendarDayInterface)=>void
}

export const Calendar = ({size, onclick}:props) => {
  const [month, setmonth] = useState<number>(new Date().getMonth()+1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const _language = language('español');


  const matrizDays: CalendarDayInterface[][] = getDaysInMonth(month, year);
  // console.log(matrizDays);

  const handleChangemonth = (m: number) => setmonth(m);
  const handleChangeYear = (y: number) => setYear(y);

  const onClickDay = (day: CalendarDayInterface)=>{
    try {
      onclick && onclick(day)
    } catch (error) {
      
    }
  }
  
  return (
    <>
      <HeaderMonths
        month={month}
        year={year}
        onChangemonth={handleChangemonth}
        onChangeYear={handleChangeYear}/>
      <div
        id="1"
        className="
          flex
          flex-col
        "
      >
        <div className="
          flex
          flex-row
          cff-border-1
          dark:cff-bg-color-blue-800
          cff-bg-color-green-600
        ">
          {_language.daysArray.map((day, index)=>(
            <span 
            id="2"
            key={`week_${index}`}
            className={`
            cff-flex-row-center
            flex-col
            ${size === 'lg' && 'md:h-10 md:w-16'}
            ${size === 'sm' && 'md:h-6 md:w-12'}
            ${size === 'xl' && 'md:h-10 md:w-20'}
            h-6 w-12
            md:text-lg
            text-xs
            `}
            >
              <span className={`${size === 'xl' ? 'max-sm:hidden': 'hidden'}`}>{day}</span>
              <span className={`${size === 'xl' ? 'sm:hidden': ''}`}>{day.split('')[0]}</span>
            </span>
            ))
          }
        </div>
        
        {matrizDays.map((week, indexW)=>(
          <div 
            id="2"
            key={`week_${indexW}`}
            className="
              flex
              flex-row
            "
          >
            {week.map((day, indexD)=>(
              <div
                key={`day_${indexD}`}
                onClick={()=>onClickDay(day)}
              >
                <DayBox
                  size={size} 
                  numberDay={day.dayNumber}
                  partyDay={(day.dayName === _language.daysArray[0] || day.dayName === 'partyDay')}
                  disabled={!day.isCurrentMonth}
                  arrayColors={[
                  // (month%2 === 0 || indexD%2 === 0 ? 'red' : 'blue'),
                  // (month%2 === 0 ? 'blue' : 'blue'),
                  // (month%2 === 0 ? 'red' : 'green'),
                  ]}></DayBox>
              </div> 
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
