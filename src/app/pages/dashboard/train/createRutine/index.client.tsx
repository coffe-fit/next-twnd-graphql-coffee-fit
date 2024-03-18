'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';

import { language } from '@/lib/lenguage';
import { Button, CalendarDouble, DropdownList } from "@/app/components/atoms";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";
import { DayBox } from "@/app/components/atoms/Calendar/DayBox";
import { CalendarByDay } from "@/app/components/atoms/CalendarByDay";

export const Client = ({ user, rutineTypes
}:any) => {
  const buttonNextStates = [
    "Calendar",
    "WeekBox",
    "DayBox",
    "End"
  ]
  
  const [days, setDays] = useState(0);
  const [buttonNext, setButtonNext] = useState<string>(buttonNextStates[0]);
  const [showButtonNext, setShowButtonNext] = useState<boolean>(false);
  const [dateIni, setDateIni] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [dayWeekComponentSelectes, setDayWeekComponentSelectes] = useState("");
  const [sizeShedule, setSizeShedule] = useState<"sm"|"xs">("sm");
  const [classCalendar, setClassCalendar] = useState<string>("");

  const _language = language('español');

  const sortDaysOfWeek = (startDate: string, daysOfWeek: string[]) => {
    const startDay = new Date(startDate);
    const startDayIndex = startDay.getDay(); // Obtiene el índice del día de la semana (0 para Domingo, 1 para Lunes, etc.)
    
    // Mueve los días de la semana para que comiencen desde el día especificado
    const sortedDays = [...daysOfWeek.slice(startDayIndex), ...daysOfWeek.slice(0, startDayIndex)];
    
    return sortedDays;
}

  useEffect(() => {
    if (buttonNext === 'WeekBox') {
      setSizeShedule('xs');
    } else if  (buttonNext === 'DayBox') {
      setClassCalendar('absolute -translate-x-[20rem] -translate-y-[3rem] delay-150');
    }else {
      setSizeShedule('sm');
      setClassCalendar('')
    }
  }, [buttonNext]);

  const handleClickCalendar = (day: CalendarDayInterface) => {
    console.log("handleClickCalendar");
  }

  const handleNumDays= (numDays: number) => {
    if(numDays) {
      setDays(numDays);
      numDays && numDays > 1 && setShowButtonNext(true);
    }
    else {
      setDays(0);
      setShowButtonNext(false);
    }
  }

  const handleSelectedDates= (Days: string[]) => {
    if(Days && Days[0]) setDateIni(Days[0])
    if(Days && Days[1]) setDateEnd(Days[1]);
    sortDaysOfWeek(dateIni, _language.daysArray)
  }

  const handleButtonNext = () => {
    const index = buttonNextStates.indexOf(buttonNext);
    setButtonNext(buttonNextStates[index+1]);
    setShowButtonNext(false);
  }

  const handleClickDayOfWeek = (day:string) =>{
    setButtonNext('DayBox');
    setDayWeekComponentSelectes(day)
  }
  return (
    <div className={`
      flex flex-col items-center h-full md:pt-20 relative
    `}>
      {buttonNext === 'Calendar' && <span className="flex flex-col items-center w-full text-xl pt-4 pb-4">
        {_language.rutineDateSelect}
      </span>}
      <span className={`transition-all  ${classCalendar} duration-1000 ease-in-out`}>
        <CalendarDouble
          onclick={handleClickCalendar}
          size={sizeShedule}
          selectedColor={true}
          numDaysSelected={handleNumDays}
          selectedDates={handleSelectedDates}
          dateIni={dateIni}
          dateEnd={dateEnd}
          showAll={buttonNext === "Calendar" ? 'twoTables' : undefined}
        />
      </span>
      {buttonNext === 'DayBox' && !showButtonNext && <span className={`transition-opacity  -translate-y-[0rem] delay-150  duration-1000 ease-in flex justify-center`}>
        <CalendarByDay dayName={dayWeekComponentSelectes}>
          <div className={``}>
            {rutineTypes && rutineTypes.map((type: any, index:number)=>(
                <li className="
                  flex
                  flex-col
                  items-start
                  w-full
                  text-lg
                  pl-2
                ">
                  {type.name}
                </li>
            ))}
          </div>
        </CalendarByDay>
      </span>}
      {buttonNext !== 'Calendar' && !showButtonNext && <span className=" flex justify-center absolute bottom-4">
        {sortDaysOfWeek(dateIni, _language.daysArray).map((day, indexD: number)=>(
          <div key={indexD}>
            <div className="flex justify-center">{indexD+1}</div>
            <DayBox
              size={'sm'}
              numberDay={day.split('')[0]}
              arrayColors={[]}
              onClick={()=>handleClickDayOfWeek(day)}
              ></DayBox>
          </div> 
        ))}
      </span>}
      {showButtonNext && (
        <Button
          size="lg"
          className="!absolute bottom-0"
          bg_color={true}
          onclick={handleButtonNext}
        >{`${_language.nextStep}`}
        </Button>
      )}
    </div>
  );
};
