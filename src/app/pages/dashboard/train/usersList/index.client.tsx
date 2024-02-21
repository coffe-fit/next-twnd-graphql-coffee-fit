'use client'
import useCustomRouter  from '@/app/hooks/useCustomRouter';
import { useDispatch } from "react-redux";

export const Client = ({
  usersList
}:any) => {

  const router = useCustomRouter();
  const dispatch = useDispatch();

  console.log(usersList, 'trs');
  
  
  return (
    <div className="flex flex-col items-center h-full">
      hola desde userList
    </div>
  );
};
