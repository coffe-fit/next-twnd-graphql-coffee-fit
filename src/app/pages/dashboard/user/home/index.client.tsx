'use client'

import useCustomRouter  from '@/app/hooks/useCustomRouter';
import { format } from "url";
import { useDispatch } from "react-redux"; 

import { ExerciseType } from "@/app/components";
import { RutineTypeBox } from "@/app/components/RutineTypeBox";
import { Calendar } from "@/app/components/atoms";

import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";

import { addRutineSelected } from "@/provider/redux/userSlice";
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
import { useLoading } from '@/app/hooks/useLoading';
import { useEffect } from 'react';

export const ClientHome = ({
  rutineType, rutineDay
}:any) => {
console.log(rutineType, rutineDay);

  const router = useCustomRouter();
  const dispatch = useDispatch();
  const todayreal = new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').split(',')[0]
  const todayNum = new Date(todayreal).getUTCDay()
  const customSessionStorage = CustomSessionStorage();

  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleClickCalendar = (day: CalendarDayInterface) => {
    dispatch(addRutineSelected({
      rutines: rutineDay 
    }));
    const url = format({
      pathname: '/pages/dashboard/user/rutine_day',
      query: {
        id: customSessionStorage.getItem('auth_token'),
        day:  day.dayName
      }
    });
    router.push(url);
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
          justify-start
          h-full
          flex-row
          md:flex-col
          flex-wrap
        ">
          <span className="
            max-sm:hidden
            h-20
          ">

          </span>
          {rutineType.slice(0,3).map((item:any, index: number)=>(
            <span className="max-sm:hidden" key={index}>
              <RutineTypeBox
                rutines={item.exercises}
                name={item.rutineTypeName}
                id="123"
                bgColor={item.days.includes(todayNum) ? 'cff-bg-color-green-600': '' }
                keyProp={0}/>
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
        {rutineType.slice(3).map((item:any, index: number)=>(
          <span key={index}>
            <RutineTypeBox
              rutines={item.exercises}
              name={item.rutineTypeName}
              id="123"
              bgColor={item.days.includes(todayNum) ? 'cff-bg-color-green-600': '' }
              keyProp={index}
            />
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
            <RutineTypeBox
              rutines={item.exercises}
              name={item.rutineTypeName}
              id="123"
              bgColor={item.days.includes(todayNum) ? 'cff-bg-color-green-600': '' }
              keyProp={index}
            />
          </span>
        ))}
        <ExerciseType name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
      </span>
    </div>
  );
};
