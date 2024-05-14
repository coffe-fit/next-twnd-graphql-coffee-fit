'use client'
import { UserForm } from "@/app/components/UserForm";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { useLoading } from "@/app/hooks/useLoading";
import MainLayout from "@/app/layouts/MainWithLoading";
import { UserInterface } from "@/lib/interfaces/user.inteface";
import { user_update } from "@/lib/services/graphql/users/update.service";
import customSessionStorage from "@/lib/util/CustomSessionStorage";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

export const Client = ({idPage, roleList, companyList}:any) => {
  const router = useCustomRouter();
  let userSelected = useSelector((state: any) => state.train.newUserSelected);
  

  const handleClickButton1= async (data: UserInterface)=>{
    try {
      // console.log(userSelected, '111111111111111');
      // console.log(data, '----------------');
      
      const rutine = await user_update({token: idPage, _data: data});
      if (rutine.id) router.push(`/pages/dashboard/train/usersList?id=${idPage}`);
    } catch (error) {
      console.error(error);
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
