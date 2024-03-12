'use client'
import { getDaysInMonth } from "@/lib/util";
import { DayBox } from "@/app/components/atoms/Calendar/DayBox";
import { useEffect, useRef, useState } from "react";
import { language } from '@/lib/lenguage';
import { HeaderMonths } from "@/app/components/atoms/Calendar/HeaderMonths";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";


interface props {
  size: 'sm' | 'md' | 'lg' | 'xl',
  selectedColor?: boolean,
  onclick?: (e: CalendarDayInterface)=>void
}

export const CalendarDouble = ({size, selectedColor, onclick}:props) => {

  const actualMonth = new Date().getMonth()+1
  const actualYear = new Date().getFullYear()

  const [month, setmonth] = useState<number>(actualMonth+1);
  const [year, setYear] = useState<number>(actualYear);
  const _language = language('español');
  const today = new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').split(',')[0];
  const monthString = `${month.toString().length === 1 ? `0${month}`: month}`
  const actualMonthString = `${actualMonth.toString().length === 1 ? `0${actualMonth}`: actualMonth}`
  

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const startOptionRef = useRef<any>(null);

  let actualMatrizDays: CalendarDayInterface[][] = getDaysInMonth(actualMonth, actualYear);
  let matrizDays: CalendarDayInterface[][] = getDaysInMonth(month, year);
    // // recuerda que el codigo de la autenticacion esta en el hook useAuth 
    useEffect(() => {
      actualMatrizDays= getDaysInMonth(month, year);
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
    setSelectedOptions([option.dayFull]);
  };

  const handleMouseMove = (option: any) => {
    if (isSelecting && startOptionRef.current) {
      if(selectedOptions && !selectedOptions?.includes(option.dayFull)){
        const dayDate = new Date(option.dayFull);
        const _selectedOptions = selectedOptions.map(fecha => new Date(fecha));
        _selectedOptions.push(dayDate);

        const _compareDate = (date1: Date, date2: Date) => {
          return date1.getTime() - date2.getTime();
        };
        _selectedOptions.sort(_compareDate);
        const orderDates: string[] = _selectedOptions.map(dateOrder => dateOrder.toISOString().split('T')[0]);
        setSelectedOptions(orderDates);
      }
    }
  };
  

  const handleMouseUp = () => {
    setIsSelecting(false);
    startOptionRef.current = null;
  };

  const isSelected = (day: any) => {
    // console.log(selectedOptions);
    const dayDate = new Date(day.dayFull);
    const dateIni = new Date(selectedOptions[0]);
    const dateEnd = new Date(selectedOptions[selectedOptions.length-1]);
    return dateIni <= dayDate && dateEnd >= dayDate
  };

  const handleTouchStart = (day: CalendarDayInterface) => {
    setIsSelecting(true);
    setSelectedOptions([day.dayFull]);
    // Lógica para manejar el inicio del toque en un día
  };

  const handleTouchMove = (day: CalendarDayInterface) => {
    if (isSelecting) {
      console.log(day);
      if(selectedOptions && !selectedOptions?.includes(day.dayFull)){
        console.log(selectedOptions);
        
        const dayDate = new Date(day.dayFull);
        const _selectedOptions = selectedOptions.map(fecha => new Date(fecha));
        _selectedOptions.push(dayDate);

        const _compareDate = (date1: Date, date2: Date) => {
          return date1.getTime() - date2.getTime();
        };
        _selectedOptions.sort(_compareDate);
        const orderDates: string[] = _selectedOptions.map(dateOrder => dateOrder.toISOString().split('T')[0]);
        setSelectedOptions(orderDates);
      }
    }
    // Lógica para manejar el movimiento del toque en un día
  };

  const handleTouchEnd = (day: CalendarDayInterface) => {
    setIsSelecting(false);
        
        const dayDate = new Date(day.dayFull);
        const _selectedOptions = selectedOptions.map(fecha => new Date(fecha));
        _selectedOptions.push(dayDate);

        const _compareDate = (date1: Date, date2: Date) => {
          return date1.getTime() - date2.getTime();
        };
        _selectedOptions.sort(_compareDate);
        const orderDates: string[] = _selectedOptions.map(dateOrder => dateOrder.toISOString().split('T')[0]);
        setSelectedOptions(orderDates);

    console.log(orderDates);
    // Lógica para manejar el final del toque en un día
    onClickDay(day);
  };
  return (
    <div className="md:flex md:flex-row flex-col ">
    <div className="md:pr-4 md:pb-0 pb-3">
    <HeaderMonths
        month={actualMonth}
        year={actualYear}
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
            ${size === 'md' && 'md:h-6 md:w-12'}
            ${size === 'sm' && 'sm:h-4 sm:w-10'}
            ${size === 'xl' && 'md:h-10 md:w-20'}
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
        
        {actualMatrizDays.map((week, indexW)=>(
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
                  
                  onTouchStart={() => handleTouchStart(day)}
                  onTouchMove={() => handleTouchMove(day)}
                  onTouchEnd={() => handleTouchEnd(day)}
                  // onMouseEnter={()=>{return console.log(day)}}
                  selected={selectedColor && isSelected(day)}
                  numberDay={day.dayNumber}
                  partyDay={(day.dayName === _language.daysArray[0] || day.dayName === 'partyDay')}
                  disabled={!day.isCurrentMonth}
                  borderColor={`${actualYear}-${actualMonthString}-${day.dayNumber.toString().length === 1 ? `0${day.dayNumber}`: day.dayNumber}` === today ? 'cff-bg-color-green-600' : null}
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
    </div>
    <div className="md:pl-4 md:pt-0 pt-3">
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
            ${size === 'md' && 'md:h-6 md:w-12'}
            ${size === 'sm' && 'sm:h-6 sm:w-10'}
            ${size === 'xl' && 'md:h-10 md:w-20'}
            h-6 w-10
            md:w-12
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
                  
                  onTouchStart={() => handleTouchStart(day)}
                  onTouchMove={() => handleTouchMove(day)}
                  onTouchEnd={() => handleTouchEnd(day)}
                  // onMouseEnter={()=>{return console.log(day)}}
                  selected={selectedColor && isSelected(day)}
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
    </div>
    </div>
  );
};
