'use client'

import { useState, useEffect } from "react";
import { GridLayout } from '@/app/components/atoms';
import { language } from '@/lib/lenguage';
import useCustomRouter from "@/app/hooks/useCustomRouter";
import CustomSessionStorage from "@/lib/util/CustomSessionStorage";
import { useDispatch } from "react-redux";
import { addUserSelected, resetExerciseSelected, addExerciseSelected, addExerciseSelectedFromEList } from "@/provider/redux/trainSlice";
import { useLoading } from "@/app/hooks/useLoading";

// Importar las imágenes necesarias
import urlEditUserImg from '@/app/images/icons/editar-usuario-99-80s.png';
import urlEditUserWhiteImg from '@/app/images/icons/editar-usuario-white-99-80s.png';
import MainLayout from "@/app/layouts/MainWithLoading";
import { FooterButtons } from "./FooterControls";
import { UserInterface } from "@/lib/interfaces";
import { findAllExercise } from "@/lib/services/graphql/exercises/findAll.service";

export const Client = () => {
  const [exercisesList, setExercisesList] = useState([]);
  const [cols2, setCols2] = useState<UserInterface[]>([]);
  const router = useCustomRouter();
  const customSessionStorage = CustomSessionStorage();
  const _language = language('español');
  const dispatch = useDispatch();
  const [rendered, setRendered] = useState(false);
  const { setLoading, setButtonsList, registerAction } = useLoading();

  useEffect(() => {
    dispatch(resetExerciseSelected());
    setLoading(false);
  }, []);

  const btns = [
    {
      name: 'detail',
      imgDark: urlEditUserWhiteImg,
      img: urlEditUserImg,
      action: (e: any) => {
        console.log(e);
        dispatch(addExerciseSelectedFromEList({ exerciseSelected: e }));
        router.push(`/pages/dashboard/train/exerciseCUForm?id=${customSessionStorage.getItem('auth_token')}`);
      },
    },
  ];

  const showOnlyColumns = ["name"];
  const filterInputBy = "name";

  const findNewExercises = async () => {
    setLoading(true);
    const newExercisesList = await findAllExercise(customSessionStorage.getItem('auth_token'));
    setExercisesList(newExercisesList);
    setLoading(false);
  };

  useEffect(() => {
    findNewExercises();
  }, []);

  return (
    <MainLayout>
      {exercisesList && (
        <div className="flex flex-col items-center h-full px-3 pt-3">
          <span className="flex flex-col items-center w-full h-full text-2xl pt-4 pb-4">
            {_language.exersicesText}
          </span>
          <GridLayout 
            cols={exercisesList}
            btns={btns}
            hideHeader={true}
            showOnlyColumns={showOnlyColumns}
            filterInputBy={'name'}
            filterInputByText={_language.seekExercise}
            classNameContainer="h-[calc(100vh-9rem)] md:w-[calc(100vw-31rem)] max-md:w-full"
            classNameGrid="h-[calc(100vh-13rem)] overflow-y-auto"
            classNameRow="!flex flex-row justify-between pr-2"
          />
        </div>
      )}
      <FooterButtons />
    </MainLayout>
  );
};