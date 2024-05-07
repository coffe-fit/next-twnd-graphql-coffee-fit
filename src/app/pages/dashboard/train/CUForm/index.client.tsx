'use client'
import { UserForm } from "@/app/components/UserForm";
// import { useLoading } from "@/app/hooks/useLoading";
import { UserInterface } from "@/lib/interfaces/user.inteface";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

export const Client = ({}:any) => {
  // const { setLoading } = useLoading();
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  let userSelected = useSelector((state: any) => state.train.newUserSelected);
  console.log(userSelected);
  

  const handleClickButton1= (data: UserInterface)=>{
    console.log(data);
    
  }

  return (
    <Suspense fallback={<div>cargando userUDForm</div>}>
      <UserForm
      buttonText1={"Guardar"}
      onClickButton1={handleClickButton1}
      userData={userSelected}
    />
    </Suspense>
  );
};
