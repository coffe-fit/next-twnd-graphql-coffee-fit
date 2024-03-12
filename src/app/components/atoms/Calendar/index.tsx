'use client'
import { getDaysInMonth } from "@/lib/util";
//import { DayCircule as DayBox } from "./DayCircule";
//import { DayBoxWired as DayBox } from "./DayBoxWired";
import { DayBox } from "./DayBox";
import { useEffect, useRef, useState } from "react";
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
  const today = new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').split(',')[0];
  const monthString = `${month.toString().length === 1 ? `0${month}`: month}`
  

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const startOptionRef = useRef<any>(null);

  let matrizDays: CalendarDayInterface[][] = getDaysInMonth(month, year);
    // // recuerda que el codigo de la autenticacion esta en el hook useAuth 
    useEffect(() => {
      matrizDays= getDaysInMonth(month, year);
    }, [selectedOptions]);
  const handleChangemonth = (m: number) => setmonth(m);
  const handleChangeYear = (y: number) => setYear(y);

  const onClickDay = (day: CalendarDayInterface)=>{
    try {
      onclick && onclick(day)
    } catch (error) {
      console.log('Calendar', error);
    }
  }

  const handleMouseDown = (option: any) => {
    setIsSelecting(true);
    startOptionRef.current = option;
    setSelectedOptions([option]);
  };

  const handleMouseMove = (option: any) => {

    if (isSelecting && startOptionRef.current) {
      if(selectedOptions && !selectedOptions?.includes(option)){
        selectedOptions.push(option)
        setSelectedOptions(selectedOptions);
      }
console.log(matrizDays);
console.log(selectedOptions);
      // const startIndex = options.findIndex((opt) => opt.id === startOptionRef.current!.id);
      // const endIndex = options.findIndex((opt) => opt.id === option.id);
      // const selectedOpts = options.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1);
      // setSelectedOptions(selectedOpts);
    }
  };
  

  const handleMouseUp = () => {
    setIsSelecting(false);
    startOptionRef.current = null;
  };
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
          dark:bg-green-500
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
                  onMouseDown={()=>{handleMouseDown(day)}}
                  onMouseUp={()=>{ handleMouseUp()}}
                  onMouseMove={()=>{handleMouseMove(day)}}
                  // onMouseEnter={()=>{return console.log(day)}}
                  selected={selectedOptions.includes(day)}
                  numberDay={day.dayNumber}
                  partyDay={(day.dayName === _language.daysArray[0] || day.dayName === 'partyDay')}
                  disabled={!day.isCurrentMonth}
                  borderColor={`${year}-${monthString}-${day.dayNumber.toString().length === 1 ? `0${day.dayNumber}`: day.dayNumber}` === today ? 'cff-bg-color-green-600' : null}
                  arrayColors={[
                  // (month%2 === 0 || indexD%2 === 0 ? 'red' : 'blue'),
                  // (month%2 === 0 ? 'blue' : 'blue'),
                  // (month%2 === 0 ? 'red' : 'green'),
                  ]}
                  
                  ></DayBox>
              </div> 
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
