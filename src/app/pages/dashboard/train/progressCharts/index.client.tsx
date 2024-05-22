'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import MainLayout from "@/app/layouts/MainWithLoading";
import { DataForm } from "./DataForm";
import { Chart } from "./Chart";
import { language } from "@/lib/lenguage";
import { progress_create, progress_find_by_user_id, progress_update } from "@/lib/services";
import customSessionStorage from "@/lib/util/CustomSessionStorage";
import { Button } from "@/app/components/atoms";

import urlGrafics from '@/app/images/icons/barra-grafica-99-80s.png';
import urlGraficsWhite from '@/app/images/icons/barra-grafica-white-99.png';

interface Props {progressList: any, userSelected: string}

export const Client = ({
  progressList, userSelected
}:Props) => {
  const [stateProgressList, setStateProgressList] = useState(progressList || []);
  const [showDataForm, setShowDataForm] = useState(false);
  const [showChart, setShowChart] = useState(true);

  const _language = language('español');

  console.log(stateProgressList);
  
  useEffect(() => {
    if (stateProgressList.length === 0) {
      console.log("Componente Client renderizado por primera vez");
      setShowDataForm(true);
      setShowChart(false)
    }
  }, [stateProgressList]);

  const handleCreateProgress = async (data: any)=>{
    
    const queryId = customSessionStorage();
    const dataSend:any = {
      userId: userSelected,
      ...data
    } 
    try {
      const progressCreated = await progress_create({token: queryId.getItem('auth_token'), _data: dataSend });
      if (progressCreated.id) {setShowDataForm(false); setShowChart(true)}
      await getData()
    } catch (error) {
      console.error(error);
    }
  }

  const getData = async ()=>{

    const queryId = customSessionStorage();
    try {
      const progressList = await progress_find_by_user_id({token: queryId.getItem('auth_token'), _data: {userId: userSelected, numProgress: 2}});
      if (progressList) setStateProgressList(progressList);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateProgress = async (data: any)=>{
    // const queryId = customSessionStorage();
    // const dataSend:any = {
    //   userId: userSelected,
    //   ...data
    // } 
    // try {
    //   const progressUpdated = await progress_update({token: queryId.getItem('auth_token'), _data: dataSend });
    //   if (progressUpdated.id) setShowDataForm(false);
    //   const progressList = await progress_find_by_user_id({token: queryId.getItem('auth_token'), _data: {userId: userSelected, numProgress: 2}});
    //   if (progressList) setStateProgressList(progressList);
    // } catch (error) {
    //   console.error(error);
    // }
  }
  return (
    <MainLayout>
      {showDataForm &&  stateProgressList.length ===0 && 
        <DataForm
          buttonText1={_language.create}
          onClickButton1={handleCreateProgress}
        ></DataForm>
      }
      {showDataForm &&  stateProgressList.length !==0 && 
        <DataForm
          buttonText1={_language.create}
          onClickButton1={handleCreateProgress}
          buttonText2={_language.cancel}
          onClickButton2={()=>{
            setShowDataForm(false);
            setShowChart(true);
          }}
        ></DataForm>
      }
      {stateProgressList && stateProgressList.length !==0 && showChart &&
        <div>
          <Chart 
            progressList={stateProgressList}
            onDataFrom={()=>{}}
          ></Chart>
          {/* boton siguiente despues de seleccionar un ejercicio */}
          <span className="absolute bottom-1 flex justify-center w-full ">
            <Button size="lg"
              className="bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14 "
              onclick={()=>{setShowDataForm(true);setShowChart(false);}}
            >
              <Image className={"block dark:hidden "} src={urlGrafics} alt={'alt'} width={45} height={45}/>
              <Image className={"hidden dark:block "} src={urlGraficsWhite} alt={'alt'} width={45} height={45}/>
              <div className="absolute -top-2 right-1">
                <p className="text-sm">+</p>
              </div>
            </Button>
          </span>
        </div>
      }
    </MainLayout>
  );
};
