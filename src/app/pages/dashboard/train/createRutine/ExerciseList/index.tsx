import { useState, useEffect, useCallback } from "react";
import { exerciseFindExcerciseByRutineTypeId } from "@/lib/services";
import customSessionStorage from "@/lib/util/CustomSessionStorage";
import { addExerciseSelected } from '@/provider/redux/trainSlice';
import { openPopup } from '@/provider/redux/popupSlice';

import { language } from "@/lib/lenguage";
import { ExerciseBox } from "./ExerciseBox";
import { BoxWithTitle } from "@/app/layouts/BoxWithTitle";
import { useDispatch, useSelector } from "react-redux";

interface RutineType {
  open: boolean;
  id: string;
  name: string;
  exercises: any[];
}

interface Props {
  dayName: string;
  rutineTypes: RutineType[];
  firstExercises: any[];
}

export const ExerciseList = ({ dayName, rutineTypes, firstExercises }: Props) => {
  const [_rutineTypes, setRutineTypes] = useState<RutineType[]>(rutineTypes);
  const _language = language('español');
  
  const dispatch =  useDispatch();
  

  const getExercisesFromService = async (id: string, index: number) => {
    const queryId = customSessionStorage();
    const exercises = await exerciseFindExcerciseByRutineTypeId(queryId.getItem('auth_token'), id);
    return exercises;
  };

  const handleClick = useCallback(
    async (id: string, index: number) => {
      const generatedExercises = await getExercisesFromService(id, index);
      setRutineTypes((prevRutineTypes) =>
        prevRutineTypes.map((rutineType, i) => ({
          ...rutineType,
          open: i === index ? !rutineType.open : rutineType.open,
          exercises: i === index ? generatedExercises : rutineType.exercises,
        }))
      );
    },
    [setRutineTypes]
  );

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

  useEffect(() => {
    setRutineTypes((prevRutineTypes) =>
      prevRutineTypes.map((rutineType, i) => ({
        ...rutineType,
        open: i === 0,
        exercises: i === 0 ? firstExercises : rutineType.exercises,
      }))
    );
  }, [firstExercises, setRutineTypes]);

  return (
    <BoxWithTitle title={dayName}>
      <div className="relative overflow-x-hidden h-[calc(100%-40px)]">
        {_rutineTypes.map((type, index) => (
          <li
            key={type.id}
            className={`
              relative
              flex
              flex-col
              items-start
              w-[calc(100%-2rem)]
              text-lg
              ml-7
              cursor-pointer
            `}
          >
            <span className="w-full hover:bg-gray-400 hover:bg-opacity-25" onClick={() => handleClick(type.id, index)}>
              <span className={`absolute -left-4 ${type.open ? 'rotate-90' : ''}`}>{'>'}</span>
              <p className="" >{translateString(type.name)}</p>
            </span>
            {type.open && type.exercises && (
              type.exercises.map((exercise, index) => (
                <div
                  className=""
                  onClick={()=>{
                    dispatch(openPopup());
                    //Se usará en el popoup
                    dispatch(addExerciseSelected({exerciseSelected: {
                      dayneme: dayName,
                      type: type.id,
                      exercise
                    }}));
                  }}>
                  <ExerciseBox
                    key={index}
                    id={index.toString()}
                    exerciseName={translateString(exercise.name)}
                    urlVideo={exercise.movie}
                    urlImageIntroduce={exercise.imgGood}
                    className="w-[calc(100%-30px)]"
                  />
                </div>
                
              ))
            )}
          </li>
        ))}
      </div>
    </BoxWithTitle>
  );
};
