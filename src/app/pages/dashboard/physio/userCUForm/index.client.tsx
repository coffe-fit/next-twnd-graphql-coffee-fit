'use client'
import { UserForm } from "@/app/components/UserForm";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { useLoading } from "@/app/hooks/useLoading";
import MainLayout from "@/app/layouts/MainWithLoading";
import { UserInterface } from "@/lib/interfaces/user.inteface";
import { user_update } from "@/lib/services/graphql/users/update.service";
import { user_create } from "@/lib/services/graphql/users/create.service";
import customSessionStorage from "@/lib/util/CustomSessionStorage";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

export const Client = ({idPage, roleList, companyList}:any) => {
  const router = useCustomRouter();
  let userSelected = useSelector((state: any) => state.train.newUserSelected);
  

  const handleClickButton1= async (data: UserInterface)=>{
    try {
      let user:{id?: string} = {};
      if(userSelected.userId) {
        user = await user_update({token: idPage, _data: data});
      } else {
        user = await user_create({token: idPage, _data: data});
      }
      if (user.id) router.push(`/pages/dashboard/train/usersList?id=${idPage}&reload=${JSON.stringify(data)}`);
      else throw user
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  
  return (
    <MainLayout>
      <UserForm
      buttonText1={"Guardar"}
      onClickButton1={handleClickButton1}
      userData={userSelected}
      roleList={roleList}
      companyList={companyList}
    />
      
    </MainLayout>
  );
};
