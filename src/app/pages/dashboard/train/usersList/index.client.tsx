'use client'
import { useState, useEffect } from "react";
import {GridLayout } from '@/app/components/atoms';
import { language } from '@/lib/lenguage';
import useCustomRouter from "@/app/hooks/useCustomRouter";
import CustomSessionStorage from "@/lib/util/CustomSessionStorage";
import { useDispatch } from "react-redux";
import { addUserSelected, resetUserSelected } from "@/provider/redux/trainSlice";
import { useLoading } from "@/app/hooks/useLoading";

// Importar las imágenes necesarias
import urlEditUserImg from '@/app/images/icons/editar-usuario-99-80s.png';
import urlEditUserWhiteImg from '@/app/images/icons/editar-usuario-white-99-80s.png';
import urlGrafics from '@/app/images/icons/barra-grafica-99-80s.png';
import urlGraficsWhite from '@/app/images/icons/barra-grafica-white-99.png';
import urlRutine from '@/app/images/icons/rutina-de-ejercicios-99.png';
import urlRutineWhite from '@/app/images/icons/rutina-de-ejercicios-white-99.png';
import MainLayout from "@/app/layouts/MainWithLoading";
import { findAllByRoleClient } from "@/lib/services";
import { ButtonItem} from "@/app/hooks/useFooter";
import { FooterButtons } from "./FooterControls/index.buttons";


interface Props {
  _usersList: any;
}

export const Client = ({
  _usersList
}:Props) => {
  const [usersList, setUsersList] = useState(_usersList);
  const [cols2, setCols2] = useState<any>([]);
  const router = useCustomRouter();
  const customSessionStorage = CustomSessionStorage();
  const _language = language('español');
  const dispatch = useDispatch();
  const [rendered, setRendered] = useState(false);
  const { setLoading, setButtonsList, registerAction  } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);
  

  // Calcular si la fila o el botón va resaltado
  useEffect(() => {
    if (cols2.length > 0 ) {
      cols2.forEach((user: any) => {
        if (user.role.name === 'NEW_CLIENT' && (!user.resalt)) {
          user.resalt = true;
        } else {
          if(user.rutines.length === 0&& (!user.resaltBtn0)) {
            user.resaltBtn0 = true;
          }
          if (user.email, user.username, user.phone, user.document === '' || user.age === 0 && (!user.resaltBtn2)) {
            user.resaltBtn2 = true;
          }
        }
      });
    }

  }, [cols2]);

  const btns= [
    {
      name: 'editar',
      imgDark: urlEditUserWhiteImg,
      img: urlEditUserImg,
      action:  (e: any)=>{
        dispatch(addUserSelected({userSel: e}));
        router.push(`/pages/dashboard/train/userCUForm?id=${customSessionStorage.getItem('auth_token')}`);
      }
    },
    {
      name: 'rutine',
      imgDark: urlRutineWhite,
      img: urlRutine,
      action: (e: any)=>{
        router.push(`/pages/dashboard/train/createRutine?id=${customSessionStorage.getItem('auth_token')}&user=${e.userId}`);
      }
    },
    {
      name: 'valoracion',
      imgDark: urlGraficsWhite,
      img: urlGrafics,
      action: (e: any)=>{
        dispatch(addUserSelected({userSel: e}));
        router.push(`/pages/dashboard/train/progressCharts?id=${customSessionStorage.getItem('auth_token')}&user=${e.userId}`);
      }
    }
  ];

  const showOnlyColumns = ["email", "username"];
  const filterInputBy = "email";

  useEffect(() => {
    if (!rendered) {
      console.log("Componente Client renderizado por primera vez");
      setRendered(true);
    }
  }, [rendered]);


  const findNewUsers = async ()=>{
    setLoading(true);
    const newUsersList = await findAllByRoleClient(customSessionStorage.getItem('auth_token'));
    setUsersList(newUsersList);
    // Filtrar usuarios nuevos y activos
    let usersNew = usersList.filter((item: { role: { name: string; }; }) => 
      item.role.name === "NEW_CLIENT" 
    );

    const usersActive = usersList.filter((item: { role: { name: string; }; }) => 
      item.role.name === "CLIENT" || item.role.name === "TRAIN"
    );

    setCols2([...usersNew, ...usersActive]);
    setLoading(false);
  }
  useEffect(() => {
    findNewUsers();
  }, []);


  return (
    <MainLayout>
      {rendered && cols2 && (
        <div className={`
          flex flex-col items-center h-full px-3 pt-3'}
        `}>
          <span className="flex flex-col items-center w-full h-full text-2xl pt-4 pb-4">
            {_language.users}
          </span>
          <GridLayout 
            cols={cols2}
            btns={btns}
            hideHeader={true}
            showOnlyColumns={showOnlyColumns}
            filterInputBy={filterInputBy}
            classNameContainer="h-[calc(100vh-9rem)] "
            classNameGrid="h-[calc(100vh-13rem)] overflow-y-auto"
          />
        </div>
      )}
      <FooterButtons/>
    </MainLayout>
  );
};

