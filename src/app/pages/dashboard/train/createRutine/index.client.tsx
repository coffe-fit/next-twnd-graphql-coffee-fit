'use client'
// Librerías React
import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

// Librerías externas
import Image from 'next/image';

// Librerías propias
import { language } from '@/lib/lenguage';
import { Button, CalendarDouble, DropdownList } from "@/app/components/atoms";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";
import { DayBox } from "@/app/components/atoms/Calendar/DayBox";

// Componentes propios
import { ExerciseList } from './ExerciseList';
import { Resume } from "./Resume";
import { PopUpExercise } from "./PopUpExercise";

// Imágenes
import urlCalendar from '@/app/images/icons/calendar-99-80s.png';
import urlCalendarWhite from '@/app/images/icons/calendar-white-99-80s.png';
import urlResume from '@/app/images/icons/lista-99-80s.png';
import urlResumeWhite from '@/app/images/icons/lista-white-99-80s.png';
import urlSave from '@/app/images/icons/salvar-99-80s.png';
import urlSaveWhite from '@/app/images/icons/salvar-white-99-80s.png';
import urlList from '@/app/images/icons/lista-imgs-99-80s.png';
import urlListWhite from '@/app/images/icons/lista-imgs-white-99-80s.png';

// Métodos propios
import { closePopup } from "@/provider/redux/popupSlice";
import { addRutineSelected } from "@/provider/redux/userSlice"; 
import { PopUpSaveRutine } from "./PopUpSaverutine";
import customSessionStorage from "@/lib/util/CustomSessionStorage";
import { rutineCreateWithExercises } from "@/lib/services/graphql/rutines/createWithExercises.services";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { format } from "url";
import MainLayout from "@/app/layouts/MainWithLoading";
// import { useLoading } from "@/app/hooks/useLoading";

interface Props {
  idPage: string;
  userSelected: any;
  rutineTypes: any;
  firstExercises: any;
}

export const Client = ({ idPage, userSelected, rutineTypes, firstExercises }: Props) => {
  
  const [days, setDays] = useState(0);
  const [dateIni, setDateIni] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [dayWeekComponentSelectes, setDayWeekComponentSelectes] = useState("");
  const [sizeShedule, setSizeShedule] = useState<"sm"|"xs">("sm");
  const [classCalendar, setClassCalendar] = useState<string>("");

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showDayBox, setShowDayBox] = useState<boolean>(false);
  const [showExerciseList, setShowExerciseList] = useState<boolean>(false);
  const [showResume, setShowResume] = useState<boolean>(false);
  const [showButtonNext, setShowButtonNext] = useState<boolean>(false);
  const [showButtonsEndPage, setShowButtonsEndPage] = useState<boolean>(false);
  const [showPopupSave, setShowPopupSave] = useState<boolean>(false);
  const [statePage, setStatePage] = useState(0);


  
  let rutineByDays = useSelector((state: any) => state.train.newRutine);
  let popup1 = useSelector((state: any) => state.popup);
  const dispatch = useDispatch();

  const router = useCustomRouter();
  

  const _language = language('español');

  const sortDaysOfWeek = (startDate: string, daysOfWeek: string[]) => {
    const startDay = new Date(startDate);
    const startDayIndex = startDay.getDay(); // Obtiene el índice del día de la semana (0 para Domingo, 1 para Lunes, etc.)
    // Mueve los días de la semana para que comiencen desde el día especificado
    const sortedDays = [...daysOfWeek.slice(startDayIndex), ...daysOfWeek.slice(0, startDayIndex)];
    return sortedDays;
  }

  useEffect(() => {
    setStatePage(0);
    dispatch(closePopup()); //para limpiar el estado del popup
    dispatch(addRutineSelected({ rutines: [[]] }));
  }, [dispatch]);

  useEffect(() => {
    setSizeShedule('sm');
    setClassCalendar("");
    setShowCalendar(false); //oculta calendario
    setShowDayBox(false) // oculta 7 las cajas de la semana
    setShowExerciseList(false); // oculta lista de los ejercicios
    setShowResume(false); //oculta el resumen
    setShowButtonsEndPage(false);
    setShowPopupSave(false);
    setShowButtonNext(false);
    if (statePage === 0) {
      setShowCalendar(true); //muestra calendario doble
    } else if (numFilterEjeAllWeek(rutineByDays)!==null) {
      setShowButtonsEndPage(true);
      setShowResume(true); //muestra el resumen
    }
    if (statePage === 1) {
      setSizeShedule('xs');
      setClassCalendar('relative');
      setShowCalendar(true); //muestra calendario sencillo
      setShowDayBox(true) // muestra 7 las cajas de la semana
    }
    if (statePage === 2) {
      setSizeShedule('xs');
      setClassCalendar('absolute -translate-x-[20rem] -translate-y-[3rem] max-md:-translate-y-[0rem] delay-150');
      setShowCalendar(true); //muestra calendario sencillo
      setShowDayBox(true) // muestra 7 las cajas de la semana
      setShowExerciseList(true);
    }
    if (statePage === 3) {
      setShowResume(true); //muestra el resumen
      setSizeShedule('xs');
      setClassCalendar('absolute -translate-x-[20rem] -translate-y-[3rem] delay-150');
      setShowCalendar(true); //muestra calendario sencillo
      setShowDayBox(true) // muestra 7 las cajas de la semana
      setShowExerciseList(true); // muestra lista de los ejercicios
      // setShowPopupSave(true); //muestra el popup si en el redux esta activo
    }
    if (statePage === 4) {
      setSizeShedule('xs');
      setClassCalendar('hidden');
      setShowCalendar(false); //muestra calendario sencillo
      setShowDayBox(false) // muestra 7 las cajas de la semana
      setShowExerciseList(false); // muestra lista de los ejercicios
      setShowResume(true); //muestra el resumen
      // setShowPopupSave(true); //muestra el popup si en el redux esta activo
    }
  }, [
    rutineByDays, statePage
  ]);

  const handleNumDays= (numDays: number) => {
    if(numDays) {
      setDays(numDays);
      numDays && numDays > 1 && statePage === 0 && setShowButtonNext(true);
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
    dayWeekComponentSelectes === '' ? setStatePage(1): setStatePage(2);// se pasa al estado 1 o 2 donde en el efect se prende el daybox 
    setShowButtonNext(false);
  }

  const handleClickDayOfWeek = (day: string) =>{
    setStatePage(2);// se muestrala lista de ejercicios
    setDayWeekComponentSelectes(day)
  }

  const numFilterEjeAllWeek2 = (arr: any[]) => {
    let contador = 0; // Inicializamos el contador en 1
    let arr2= []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        for (let j = 0; j < arr[i].length; j++) {
          if(arr[i][j].length !==0) {
            arr2.push({days: i, ...arr[i][j]})
            contador++; // Incrementamos el contador
          }
        }
      }
    }
    console.log(arr2);
    
    return arr2.length !== 0? arr2 : []; // Devolvemos el nuevo array con los espacios numerados
  };

  const numFilterEjeAllWeek = (arr: any[]) => {
    let contador = 0; // Inicializamos el contador en 1
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        for (let j = 0; j < arr[i].length; j++) {
          if(arr[i][j].length !==0) contador++; // Incrementamos el contador
        }
      }
    }
    return contador !== 0? contador : null; // Devolvemos el nuevo array con los espacios numerados
  };
  const numFilterEjeDay = (arr: any[], day: string) => {
    let contador = 0; // Inicializamos el contador en 1
    const index = _language.daysArray.indexOf(day);
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && i === index) {
        for (let j = 0; j < arr[i].length; j++) {
          if(arr[i][j].length !==0) contador++; // Incrementamos el contador
        }
      }
    }
    return contador !== 0? contador : null; // Devolvemos el nuevo array con los espacios numerados
  };

  const handleSendService = async (obs: string, heartRate: string) => {
    const queryId = customSessionStorage();
    const dataSend:any = {
      dateIni,
      dateEnd,
      days,
      name: "first",
      obs,
      roleId1: "42736697-5e42-405f-8fef-64c8fc355d0d",
      userId: userSelected.userId,
      exercises: rutineByDays && numFilterEjeAllWeek2(rutineByDays) ? numFilterEjeAllWeek2(rutineByDays).map((rutine: any)=>{
        return {
          "amountRepeat": rutine.amountMax,
          "break": rutine.breakTime.toString(),
          "exerciseId": rutine.exercises.id,
          "rutineTypeId": rutine.type,
          "weightByKilos": 12,
          "weightByKilosMax": 12,
          "amountRepeatMax": [12],
          "days": rutine.days,
          "series":rutine.series
        }
      }) : null
    } 
    try {
      const rutine = await rutineCreateWithExercises(queryId.getItem('auth_token'), dataSend);
      if (rutine.id) router.push(`/pages/dashboard/train/usersList?id=${idPage}`);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <MainLayout>
    <Suspense fallback={<div>cargando ButonsSocialMedia...</div>}>
    <div className="">
      <div className={`
        mt-2
        flex flex-col items-center
        overflow-auto md:pt-10 relative
      `}>
        {showCalendar && 
          <>
            {/* si no hay una clase que defina que es calendario pequeño entonces muestra el titulo */}
            {classCalendar === '' &&
              <span className="flex flex-col items-center w-full text-xl pt-4 pb-4 ">
                {_language.rutineDateSelect}
              </span>
            }
            <span className={`transition-all  ${classCalendar} duration-1000 ease-in-out mb-10 ${ sizeShedule ===  'xs' && classCalendar === '' ?'max-md:hidden lg:block': ''}`}>
              <CalendarDouble
                size={sizeShedule}
                selectedColor={true}
                numDaysSelected={handleNumDays}
                selectedDates={handleSelectedDates}
                dateIni={dateIni}
                dateEnd={dateEnd}
                showAll={classCalendar === "" ? 'twoTables' : undefined}
              />
            </span>
          </>
        }
        {showDayBox && 
          <>
            <span className=" -translate-y-[0rem] delay-150 duration-1000 ease-in-out  flex justify-center ">
              {sortDaysOfWeek(dateIni, _language.daysArray).map((day, indexD: number)=>(
                <div key={indexD} className="relative">
                  <div className="flex justify-center">{indexD+1}</div>
                  <DayBox
                    size={'sm'}
                    numberDay={day.split('')[0]}
                    arrayColors={[]}
                    onClick={()=>handleClickDayOfWeek(day)}
                    selected={dayWeekComponentSelectes === day}
                    ></DayBox>
                    <div className="absolute top-6 right-1">
                      <p className="text-sm text-green-500">{numFilterEjeDay(rutineByDays, day)}</p>
                    </div>
                </div> 
              ))}
            </span>
          </>
        }
        {showExerciseList && 
          <>
            <span className={`transition-opacity  -translate-y-[0rem] delay-150  duration-1000 ease-in flex justify-center h-[calc(100%-100px)]`}>
              <ExerciseList
                dayName={dayWeekComponentSelectes}
                rutineTypes={rutineTypes}
                firstExercises={firstExercises}
              />
            </span> 
          </>
        }
        {showResume && 
          <>
            <span className={`${statePage === 2 && "max-md:hidden"} md:translate-x-96 md:-translate-y-[0rem] delay-150 flex justify-center md:absolute md:block`}>
              <Resume />
            </span>
          </>
        }
      </div>
      {/* boton siguiente en el inicio del flujo */}
      {showButtonNext && (
        <span className="absolute bottom-3 flex justify-center w-full">
          <Button
            size="lg"
            className="bottom-0"
            bgColor={true}
            onclick={handleButtonNext}
          >{`${_language.nextStep}`}
          </Button>
        </span>
      )}
      
      {showButtonsEndPage && 
        <>
          {/* boton siguiente despues de seleccionar un ejercicio */}
          <span className="absolute bottom-1 flex justify-center w-full ">
            <Button size="lg"
              className="md:hidden bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14"
              onclick={()=>setStatePage(0)}
            >
              <Image className={"block dark:hidden"} src={urlCalendar} alt={'alt'} width={45} height={45}/>
              <Image className={"hidden dark:block"} src={urlCalendarWhite} alt={'alt'} width={45} height={45}/>
            </Button>
            {statePage !== 4 && <Button size="lg"
              className="md:hidden bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14 relative"
              onclick={()=>setStatePage(4)}
            >
              <Image className={"block dark:hidden"} src={urlResume} alt={'alt'} width={45} height={45}/>
              <Image className={"hidden dark:block"} src={urlResumeWhite} alt={'alt'} width={45} height={45}/>
              <div className="absolute -top-2 right-1">
                <p className="text-sm">{numFilterEjeAllWeek(rutineByDays)}</p>
              </div>
            </Button>}
            {statePage === 4 && <Button size="lg"
              className="md:hidden bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14 relative"
              onclick={()=>setStatePage(2)}
            >
              <Image className={"block dark:hidden"} src={urlList} alt={'alt'} width={45} height={45}/>
              <Image className={"hidden dark:block"} src={urlListWhite} alt={'alt'} width={45} height={45}/>
              <div className="absolute -top-2 right-1">
                <p className="text-sm">{numFilterEjeAllWeek(rutineByDays)}</p>
              </div>
            </Button>}
            <Button size="lg"
              className="bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14 "
              onclick={()=>{setShowPopupSave(true)}}
            >
              <Image className={"block dark:hidden animate-pulse"} src={urlSave} alt={'alt'} width={45} height={45}/>
              <Image className={"hidden dark:block animate-pulse"} src={urlSaveWhite} alt={'alt'} width={45} height={45}/>
            </Button>
          </span>
        </>
      }
      {/* se abre en el ExerciseList */}
      <PopUpExercise />
      {/* se abre dentro del componente*/}
      <PopUpSaveRutine
        isOpen={showPopupSave}
        onClose={()=>setShowPopupSave(false)}
        onSendService={handleSendService}
      />
    </div>

      
    </Suspense>
    </MainLayout>
  );
};
