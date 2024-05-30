'use client'
import { BoxWithTitle } from "@/app/layouts/BoxWithTitle"
import { language } from "@/lib/lenguage";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { useSelector } from "react-redux";

interface props {
  className?: string
}

export const Resume = ({className}:props) => {
  let rutineByDays = useSelector((state: any) => state.train.newRutine);

  const _language = language('español');


  const translateString = (text: string)=>{
    if (text in _language.rutineType) {
      const rutineTypeData: any = _language.rutineType
      return rutineTypeData[text as keyof any];
    }
    if (text in _language.exercises) {
      const exercisesData: any = _language.exercises
      return exercisesData[text as keyof any];
    }
    return text
  }
  // recuerda que el codigo de la autenticacion esta en el hook useAuth 
  useEffect(() => {
    console.log(rutineByDays);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rutineByDays]);
  return (
    <BoxWithTitle title={_language.resume}>
      <div className="relative overflow-x-hidden h-[calc(100%-40px)]">
      {_language.daysArray?.map((day, _index) => (
        <>
          {rutineByDays && rutineByDays[_index] && rutineByDays[_index].length !==0 && (
            <div className="pl-2">
              <p>{day.toUpperCase()}</p>
              {rutineByDays[_index].map((rutine: { exercises: { name: string }; }, index: number) => (
                <li key={`rutineByDays_${index}`}className="pl-3">{translateString(rutine?.exercises?.name)}</li>
              ))}
            </div>
          )}
        </>
      ))}
      </div>
    </BoxWithTitle>
  );
}