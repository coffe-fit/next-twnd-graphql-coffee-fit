'use client'

import { ExerciseType } from "@/app/components";
import { RutineType } from "@/app/components/RutineType";
import { Calendar } from "@/app/components/atoms";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";
import { useRouter } from 'next/navigation';
import { format } from "url";

export const ClientHome = ({
  rutineType
}:any) => {

  const router = useRouter();
  
  console.log(rutineType);
  const handleClickCalendar = (day: CalendarDayInterface) => {

    const url = format({
      pathname: '/pages/dashboard/user/rutine_day',
      query: {id: day.dayName}
    })
    router.push(url)
  }
  
  return (
    <div className="flex flex-col items-center h-full">
      <span className="
        cff-flex-row-center
        flex-col
        md:flex-row
      ">
        <span>
          <Calendar onclick={handleClickCalendar} size="lg" />
        </span>
        <span className="
          flex
          justify-center
          h-full
          md:justify-end
          flex-row
          md:flex-col
          flex-wrap
        ">
          {rutineType.slice(0,2).map((item:any, index: number)=>(
            <span className="max-sm:hidden" key={index}>
              <RutineType rutines={item.rutines} name={item.rutines[0].rutineType.name} id="123" key={index}/>
            </span>
          ))}
          
        </span>
      </span>
      <span className="
        flex
        justify-center
        flex-row
        flex-wrap
        max-sm:hidden
      ">
        {rutineType.slice(2).map((item:any, index: number)=>(
          <span key={index}>
            <RutineType rutines={item.rutines} name={item.rutines[0].rutineType.name} id="123" key={index}/>
          </span>
        ))}
        <ExerciseType name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
      </span>
      {/* se repite la seccion anterior para lograr sincronia con el tamaño de las cajas*/}
      <span className="
        flex
        justify-center
        flex-row
        flex-wrap
        sm:hidden
      ">
        {rutineType.map((item:any, index: number)=>(
          <span key={index}>
            <RutineType rutines={item.rutines} name={item.rutines[0].rutineType.name} id="123" key={index}/>
          </span>
        ))}
        <ExerciseType name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
      </span>
    </div>
  );
};
