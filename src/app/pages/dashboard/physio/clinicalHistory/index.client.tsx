'use client'
import { UserForm } from "@/app/components/UserForm";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import MainLayout from "@/app/layouts/MainWithLoading";
import { UserInterface } from "@/lib/interfaces/user.inteface";
import { user_update } from "@/lib/services/graphql/users/update.service";
import { user_create } from "@/lib/services/graphql/users/create.service";
import { useSelector } from "react-redux";

export const Client = ({idPage, roleList}:any) => {
  const router = useCustomRouter();
  let userSelected = useSelector((state: any) => state.train.newUserSelected);

  
  return (
    <MainLayout>
      hola
    </MainLayout>
  );
};
