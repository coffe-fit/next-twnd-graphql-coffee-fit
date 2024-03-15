'use client'
import { useEffect, useMemo, useRef, useState } from "react";

import { getDateFromNumDays, getDaysInMonth } from "@/lib/util";
import { language } from '@/lib/lenguage';

import { DayBox } from "@/app/components/atoms/Calendar/DayBox";
import { HeaderMonths } from "@/app/components/atoms/Calendar/HeaderMonths";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";
import { DropdownList } from "..";


interface props {
  size: 'sm' | 'md' | 'lg' | 'xl'| 'xs',
  selectedColor?: boolean,
  onclick?: (e: CalendarDayInterface)=>void,
  selectedDates?: (dates:any)=> void ,
  numDaysSelected?: (numDays: number)=> void,
  dateIni?: string,
  dateEnd?: string,
  showAll?: string,
}

export const CalendarDouble = ({
  size,
  selectedColor,
  onclick,
  dateIni,
  dateEnd,
  selectedDates,
  numDaysSelected,
  showAll
}:props) => {

  const actualMonth = new Date().getMonth()+1
  const actualYear = new Date().getFullYear()

  const [month, setmonth] = useState<number>(actualMonth+1);
  const [year, setYear] = useState<number>(actualYear);
  const _language = language('español');
  const today = new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').split(',')[0];
  const monthString = `${month.toString().length === 1 ? `0${month}`: month}`
  const actualMonthString = `${actualMonth.toString().length === 1 ? `0${actualMonth}`: actualMonth}`
  const initalSelction = dateIni && dateEnd? [dateIni, dateEnd] : [];
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initalSelction);
  const [isSelecting, setIsSelecting] = useState(false);
  const touchStartPosition = useRef<number | null>(null);
  const startOptionRef = useRef<any>(null);


  const numDays = ()=>{
    const fechaInicial = new Date(selectedOptions[0]);
    const fechaFinal = new Date(selectedOptions[selectedOptions.length-1]);

    // Calcular la diferencia en milisegundos
    const diferenciaEnMS = fechaFinal.getTime() - fechaInicial.getTime();

    // Calcular el número de días redondeando hacia abajo
    return selectedOptions[0] ? Math.floor(diferenciaEnMS / (1000 * 60 * 60 * 24)) + 1 : 0;
  }

  useEffect(() => {
    if( selectedDates ) selectedDates(selectedOptions);
    if( numDaysSelected ) numDaysSelected(numDays()+1);
  }, [selectedOptions]);

  const actualMatrizDays = useMemo(() => getDaysInMonth(actualMonth, actualYear), [actualMonth, actualYear]);
  const matrizDays = useMemo(() => getDaysInMonth(month, year), [month, year]);


  // // recuerda que el codigo de la autenticacion esta en el hook useAuth 
  const handleChangemonth = (m: number) => {
    setmonth(m)
  }
  const handleChangeYear = (y: number) => {
    setYear(y);
  }

  const pushDaySelected = (dayFull: string)=> {
    const dayDate = new Date(dayFull);
    const today = new Date();
    if (dayDate >= today) {
      const _selectedOptions = selectedOptions.map((fecha) => new Date(fecha));
      _selectedOptions[1] = dayDate;

      const _compareDate = (date1: Date, date2: Date) => {
        return date1.getTime() - date2.getTime();
      };
      _selectedOptions.sort(_compareDate);
      const orderDates: string[] = _selectedOptions.map((dateOrder) => dateOrder.toISOString().split('T')[0]);
      const newDates = [orderDates[0], orderDates[orderDates.length - 1]];

      setSelectedOptions(newDates);
    }
  }

  const onClickDay = (day: CalendarDayInterface)=>{
    try {
      onclick && onclick(day)
      // pushDaySelected(day)
    } catch (error) {
      console.log('Calendar', error);
    }
  }

  const handleMouseDown = (day: CalendarDayInterface) => {
    const dayDate = new Date(day.dayFull);
    const _dayDate = dayDate.toISOString().split('T')[0];

    const today = new Date();
    const _today = today.toISOString().split('T')[0];
    
    if (dayDate >= today || _dayDate === _today ) {
      setIsSelecting(true);
      startOptionRef.current = day;
      setSelectedOptions([day.dayFull]);
    }
  };

  const handleMouseMove = (day: CalendarDayInterface) => {
    if (isSelecting && startOptionRef.current) {
      if(selectedOptions && !selectedOptions?.includes(day.dayFull)){
        pushDaySelected(day.dayFull)
      }
    }
  };
  
  const handleMouseUp = (day: any) => {
    setIsSelecting(false);
    startOptionRef.current = null;
  };

  const handleTouchStart = (day: CalendarDayInterface, e: TouchEvent) => {
    touchStartPosition.current = e.touches[0].clientY;
    setSelectedOptions([day.dayFull]);
  };

  const handleTouchMove = (day: CalendarDayInterface, e: TouchEvent) => {
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY)as HTMLElement | null;;
    
    const getParentDayElement = (element: HTMLElement | null): HTMLElement | null => {
      let parent = element?.parentNode as HTMLElement | null;
      while (parent && !parent.title.includes('day')) {
        parent = parent.parentNode as HTMLElement | null;
      }
      return parent;
    };
  
    if (targetElement) {
      const dayElement = getParentDayElement(targetElement)
      if(dayElement) pushDaySelected(dayElement?.getAttribute('id') || '');
    }
  };

  const handleTouchEnd = (day: CalendarDayInterface) => () => {
    if (touchStartPosition.current !== null) {
    console.log('handleTouchEnd');
    console.log(day);
    }
  };

  const isSelected = (day: CalendarDayInterface) => {
    const dayDate = new Date(day.dayFull);
    const dateIni = new Date(selectedOptions[0]);
    const dateEnd = new Date(selectedOptions[selectedOptions.length-1]);
    return dateIni <= dayDate && dateEnd >= dayDate
  };

  const handleClickDropDownList= (option: any) => {
    const autcomeDays= getDateFromNumDays(+option.id - 1);
    setSelectedOptions([autcomeDays.dateIni, autcomeDays.dateEnd]);
  }

  const customCalendar = (
    matriz: CalendarDayInterface[][],
    month: number, year: number,
    monthString: string,
    monthFixed: boolean
  ) => {
    return (
      <div className="md:pr-4 md:pb-0 pb-3">
        <HeaderMonths
          month={month}
          year={year}
          onChangemonth={!monthFixed ? handleChangemonth : ()=>{}}
          onChangeYear={!monthFixed ? handleChangeYear : ()=>{}}/>
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
              ${size === 'md' && 'md:h-6 md:w-12'}
              ${size === 'sm' && 'sm:h-4 sm:w-10'}
              ${size === 'xl' && 'md:h-10 md:w-20'}
              ${size === 'xs' && 'h-4 w-8'}
              h-6 w-10
              md:h-6 md:w-12
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
          
          {matriz.map((week: CalendarDayInterface[], indexW: number)=>(
            <div 
              id="2"
              key={`week_${indexW}`}
              className="
                flex
                flex-row
              "
            >
              {week.map((day:CalendarDayInterface, indexD: number)=>(
                <div
                  key={`day_${indexD}`}
                  id={day.dayFull}
                  title="day"
                  onClick={()=>onClickDay(day)}

                  onMouseDown={()=>{handleMouseDown(day)}}
                  onMouseUp={()=>{ handleMouseUp(day)}}
                  onMouseMove={()=>{handleMouseMove(day)}}

                  onTouchStart={(e:any) => handleTouchStart(day, e)}
                  onTouchMove={(e:any) => handleTouchMove(day,e)}
                  onTouchEnd={handleTouchEnd(day)}
                >
                  <DayBox
                    size={size}
                    selected={selectedColor && isSelected(day)}
                    numberDay={day.dayNumber}
                    partyDay={(day.dayName === _language.daysArray[0] || day.dayName === 'partyDay')}
                    disabled={!day.isCurrentMonth}
                    borderColor={`${year}-${monthString}-${day.dayNumber.toString().length === 1 ? `0${day.dayNumber}`: day.dayNumber}` === today ? 'cff-bg-color-green-600' : null}
                    arrayColors={[]}
                    ></DayBox>
                </div> 
              ))}
            </div>
          ))} 
        </div>
      </div>
    )
  }
  return (
    <div >
      <span className="pt-4 flex w-full justify-center">
        {!showAll && numDays() + ' ' +_language.days}
      </span>
      <div className="md:flex md:flex-row flex-col ">
        {customCalendar(actualMatrizDays, actualMonth, actualYear, actualMonthString, true)}
        {showAll && customCalendar(matrizDays, month, year, monthString, false)}
      </div>
      {showAll && <span className="pt-4 flex w-full justify-center">
        <DropdownList 
          textIni= {`${numDays() === 0 ? _language.rutineTime : numDays() + ' ' +_language.days}`}
          classNameInput="w-48"
          onSelect={handleClickDropDownList}
          options = {
          [
            { id: `${numDays()}`, name: `${numDays()} ${_language.days}`},
            { id: '20', name: `20 ${_language.days}`},
            { id: '40', name: `40 ${_language.days}`},
            { id: '60', name: `60 ${_language.days}`},
          ]
        }/>
      </span>}

    </div>
  );
};
