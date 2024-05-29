'use client'
import { useSelector } from "react-redux";

import { language,translateString } from "@/lib/lenguage";
import { RutineTypeTodo } from "@/app/components/RutineTypeTodo";

import sentadilla from '@/app/images/exercises/sentadilla.png';
import MainLayout from "@/app/layouts/MainWithLoading";
// import { useLoading } from "@/app/hooks/useLoading";
// import { useEffect } from "react";

export const ClientRutineDay = ({
  day
}:any) => {
  const _language = language('español');
  let rutines = useSelector((state: any) => state.user.rutines);
  
  // const { setLoading } = useLoading();
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  const dayNumber = _language.daysArray.indexOf(day);
  const rutinesDay = rutines && rutines.filter((item: { day: number; }) => item.day === dayNumber);
  const rutinesByType = rutinesDay && rutinesDay[0] && rutinesDay[0].rutineType;

  return (
    <MainLayout>
    <div className="cff-border-1 !rounded-3xl flex flex-col items-center h-auto pb-4">
      <div className=" w-80">
        <span className=" flex flex-col items-center w-full text-2xl font-semibold">
          {day}
        </span>
        {rutinesByType && rutinesByType.map((item: any, index: number) =>(
          <span key={`${index}_${item.id}`}>
            <span className="
              flex
              flex-col
              items-start
              w-auto
              text-xl
             text-black
            dark:bg-green-500
              cff-bg-color-green-600
              !rounded-md
              mx-1
              px-2
            ">
              {translateString(_language, item.rutineTypeName)}
            </span>
            {item.exercises && item.exercises.map((itemRutine: any, index: number) =>(
              <span key={`${index}_${item.id}`}>
                <RutineTypeTodo 
                  id={`${itemRutine.id}`}
                  exerciseName={translateString(_language, itemRutine.exercise.name)}
                  serie={itemRutine.series}
                  amountMax={itemRutine.amountRepeat}
                  urlVideo={itemRutine.exercise.movie}
                  urlImageIntroduce={itemRutine.exercise.imgGood || sentadilla}
                  breakOwn={itemRutine.break}  
                 
                />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
    </MainLayout>
  );
};
