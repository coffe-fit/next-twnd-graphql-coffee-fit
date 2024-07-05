'use client'
import { useState, useEffect } from "react";
import { GridLayout } from '@/app/components/atoms';
import { language } from '@/lib/lenguage';
import useCustomRouter from "@/app/hooks/useCustomRouter";
import CustomSessionStorage from "@/lib/util/CustomSessionStorage";
import { useDispatch } from "react-redux";
import { addUserSelected } from "@/provider/redux/trainSlice";
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
import { FooterButtons } from "./FooterControls/index.buttons";
import { UserInterface } from "@/lib/interfaces";

interface Props {
  _usersList: any;
}

export const Client = ({ _usersList }: Props) => {
  const [usersList, setUsersList] = useState(_usersList);
  const [cols2, setCols2] = useState<UserInterface[]>([]);
  const [showOnlyColumns, setShowOnlyColumns] = useState<string[]>(["email", "username"]); // Estado para gestionar las columnas a mostrar
  const router = useCustomRouter();
  const customSessionStorage = CustomSessionStorage();
  const _language = language('español');
  const dispatch = useDispatch();
  const [rendered, setRendered] = useState(false);
  const { setLoading } = useLoading();
  
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const btns = [
    {
      name: 'historiaClinica',
      imgDark: urlEditUserWhiteImg,
      img: urlEditUserImg,
      action: (e: any) => {
        dispatch(addUserSelected({ userSel: e }));
        router.push(`/pages/dashboard/physio/clinicalHistory?id=${customSessionStorage.getItem('auth_token')}`);
      }
    },
    {
      name: 'valoracion',
      imgDark: urlGraficsWhite,
      img: urlGrafics,
      action: (e: any) => {
        dispatch(addUserSelected({ userSel: e }));
        router.push(`/pages/dashboard/train/progressCharts?id=${customSessionStorage.getItem('auth_token')}&user=${e.userId}`);
      }
    }
  ];

  const filterInputBy = "email";

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    }
  }, [rendered]);

  const findNewUsers = async () => {
    setLoading(true);
    const newUsersList = await findAllByRoleClient(customSessionStorage.getItem('auth_token'));
    setUsersList(newUsersList);

    const usersNew = usersList.filter((item: { role: { name: string; }; }) => 
      item.role.name === "NEW_CLIENT"
    );

    const usersActive = usersList.filter((item: { role: { name: string; }; }) => 
      item.role.name === "CLIENT" || item.role.name === "TRAIN" 
    );

    setCols2([...usersNew, ...usersActive]);
    setLoading(false);
  };

  useEffect(() => {
    findNewUsers();
  }, []);

  // Calcular si la fila o el botón va resaltado
  useEffect(() => {
    try {
      if (cols2.length > 0) {
        cols2.forEach((user: UserInterface) => {
          if (user.role.name === 'NEW_CLIENT' && (!user.resalt)) {
            user.resalt = true;
          } else {
            if (user.rutines.length === 0 && (!user.resaltBtn0)) {
              user.resaltBtn0 = true;
            }
            if (user.email, user.username, user.phone, user.document === '' || user.age === 0 && (!user.resaltBtn2)) {
              user.resaltBtn2 = true;
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [cols2]);

  // Hook para cambiar columnas a mostrar basado en el tamaño de la ventana
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) {
        setShowOnlyColumns(["email"]); // Solo mostrar columna de email en modo móvil
      } else {
        setShowOnlyColumns(["email", "username"]); // Mostrar columnas de email y username en modo escritorio
      }
    };

    updateColumns(); // Ejecutar en el primer renderizado
    window.addEventListener('resize', updateColumns); // Agregar event listener

    return () => {
      window.removeEventListener('resize', updateColumns); // Limpiar event listener
    };
  }, []);

  return (
    <MainLayout>
      {rendered && cols2 && (
        <div className={`
          flex flex-col items-center h-full px-3 pt-3
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
            filterInputByText={_language.seekUsers}
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