'use client'
import { getDaysInMonth } from "@/lib/util";
//import { DayCircule as DayBox } from "./DayCircule";
//import { DayBoxWired as DayBox } from "./DayBoxWired";
import { DayBox } from "./DayBox";
import { useState } from "react";
import { Input } from "../Input";
import { language } from '@/lib/lenguage';


interface props {}

export const Calendar = ({}:props) => {
  const [mont, setMont] = useState<number>(1);
  const _language = language('español');


  const matrizDays: any[][] = getDaysInMonth(mont, 2024);
  // console.log(arrayDays);
  
  return (
    <>
      <br />Calendar {mont}
      <Input
        type="number"
        value={mont}
        onChange={(e) => setMont(+e.target.value)}
        name={"ss"} id={"sss"} bg_color={true}
      ></Input>
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
            className="
              cff-flex-row-center
              flex-col
              md:h-10 md:w-20
              h-6 w-12
              md:text-lg
              text-xs
            "
            >
              <span className="max-sm:hidden">{day}</span>
              <span className="sm:hidden">{day.split('')[0]}</span>
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
              >
                <DayBox 
                  numberDay={day.dayNumber}
                  partyDay={(day.dayName === _language.daysArray[0] || day.dayName === 'partyDay')}
                  disabled={!day.isCurrentMonth}
                  arrayColors={[
                  // (mont%2 === 0 || indexD%2 === 0 ? 'red' : 'blue'),
                  // (mont%2 === 0 ? 'blue' : 'blue'),
                  // (mont%2 === 0 ? 'red' : 'green'),
                  ]}></DayBox>
              </div> 
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
