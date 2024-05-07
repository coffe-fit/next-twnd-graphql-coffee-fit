'use client'
import { useSelector } from "react-redux";

import { language } from "@/lib/lenguage";
import { RutineTypeTodo } from "@/app/components/RutineTypeTodo";

import sentadilla from '@/app/images/exercises/sentadilla.png';
import { useLoading } from "@/app/hooks/useLoading";
import { useEffect } from "react";

export const ClientRutineDay = ({
  day
}:any) => {
  const _language = language('español');
  let rutines = useSelector((state: any) => state.user.rutines);
  
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);

  const dayNumber = _language.daysArray.indexOf(day);
  const rutinesDay = rutines && rutines.filter((item: { day: number; }) => item.day === dayNumber);
  const rutinesByType = rutinesDay && rutinesDay[0] && rutinesDay[0].rutineType;

  return (
    <div className="flex flex-col items-center h-full">
      <div className="cff-border-1 w-80">
        <span className="flex flex-col items-center w-full text-2xl">
          {day}
        </span>
        <div className="cff-border-1 w-auto"></div>
        {rutinesByType && rutinesByType.map((item: any, index: number) =>(
          <span key={`${index}_${item.id}`}>
            <span className="
              flex
              flex-col
              items-start
              w-full
              text-2xl
              pl-2

            dark:bg-green-500
              cff-bg-color-green-600
            ">
              {item.rutineTypeName}
            </span>
            <hr />
            {item.exercises && item.exercises.map((itemRutine: any, index: number) =>(
              <span key={`${index}_${item.id}`}>
                <RutineTypeTodo 
                  id={`${itemRutine.id}`}
                  exerciseName={itemRutine.exercise.name}
                  serie={itemRutine.series}
                  amountMax={itemRutine.amountRepeat}
                  urlVideo={itemRutine.exercise.movie}
                  urlImageIntroduce={sentadilla}
                  breakOwn={itemRutine.break}   
                />
                <hr />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};
