'use client'
import { UserForm } from "@/app/components/UserForm";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import MainLayout from "@/app/layouts/MainWithLoading";
import { useSelector } from "react-redux";
import { useForm } from "@/app/hooks/useForm";
import BoxToFormLayout from "@/app/layouts/BoxToForm";
import { CheckBoxWithLabel, Input } from "@/app/components/atoms";
import { language } from "@/lib/lenguage";
import { useState } from "react";
import CheckBoxGroup from "./CheckBoxGroup";

export const Client = ({idPage, roleList}:any) => {
  const router = useCustomRouter();
  let userSelected = useSelector((state: any) => state.train.newUserSelected);
  const _language = language('español');
  const [checkedValues, setCheckedValues] = useState<{ [key: string]: boolean }>({});

  const handleFormSubmit = (formData: any) => {
    console.log('Datos del formulario:', formData);
    // Aquí puedes realizar acciones como enviar los datos al servidor
  };

  const { values, handleChange, handleSubmit } = useForm({
    initialState: {
      name: '',
      documentdId: '',
      age: '',
      gender: '',
      phone: '',
      suffersIllness: '',
      takeMedications: '',
      foodAlergies: '',
      doExercises: '',
      consumeAlcohol: '',
      consumetabacco: '',
      obesity: ''
    },
    onSubmit: handleFormSubmit,
  });
  
  const handleCheckboxChange = (name: string, value: boolean, checked: boolean) => {
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="">
        <BoxToFormLayout className="m-3 !relative">
          <div className="my-3">
            <Input
              type="text"
              name="name"
              value={ values.name}
              onChange={handleChange}
              placeholder={_language.name}
              required
              pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
              title={`${_language.messageValidInput} ${_language.name}.`}
              id={"tes"}
              size={'sm'}
              bgColor={true}
              className="!w-full"
            />
          </div>
          <div className="my-3">
            <Input
              type="text"
              name="documentdId"
              value={ values.documentdId }
              onChange={handleChange}
              placeholder={_language.documentdId}
              required
              pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
              title={`${_language.messageValidInput} ${_language.documentdId}.`}
              id={"tes"}
              size={'sm'}
              bgColor={true}
              className="!w-full"
            />
          </div>
          <div className="my-3 flex flex-row justify-between">
          <div className="pr-2">
              <Input
                type="text"
                name="age"
                value={ values.age }
                onChange={handleChange}
                placeholder={_language.age}
                required
                pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
                title={`${_language.messageValidInput} ${_language.age}.`}
                id={"tes"}
                size={'sm'}
                bgColor={true}
                className="!w-full"
              />
            </div>
            <div className="pl-2">
              <Input
                type="text"
                name="gender"
                value={ values.gender }
                onChange={handleChange}
                placeholder={_language.gender}
                required
                pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
                title={`${_language.messageValidInput} ${_language.gender}.`}
                id={"tes"}
                size={'sm'}
                bgColor={true}
                className="!w-full"
              />
            </div>
          </div>
          <div className="my-3">
            <Input
              type="text"
              name="phone"
              value={ values.phone }
              onChange={handleChange}
              placeholder={_language.phone}
              required
              pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
              title={`${_language.messageValidInput} ${_language.phone}.`}
              id={"tes"}
              size={'sm'}
              bgColor={true}
              className="!w-full"
            />
          </div>
        </BoxToFormLayout>
        <BoxToFormLayout className="m-3 !relative">
          <div className="my-3">
            <Input
              type="text"
              name="suffersIllness"
              value={ values.suffersIllness}
              onChange={handleChange}
              placeholder={_language.suffersIllness}
              required
              pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
              title={`${_language.messageValidInput} ${_language.suffersIllness}.`}
              id={"tes"}
              size={'sm'}
              bgColor={true}
              className="!w-full"
            />
          </div>
          <div className="my-3">
            <Input
              type="text"
              name="takeMedications"
              value={ values.takeMedications }
              onChange={handleChange}
              placeholder={_language.takeMedications}
              required
              pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
              title={`${_language.messageValidInput} ${_language.takeMedications}.`}
              id={"tes"}
              size={'sm'}
              bgColor={true}
              className="!w-full"
            />
          </div>
          <div className="my-3">
            <Input
              type="text"
              name="foodAlergies"
              value={ values.foodAlergies }
              onChange={handleChange}
              placeholder={_language.foodAlergies}
              required
              pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
              title={`${_language.messageValidInput} ${_language.foodAlergies}.`}
              id={"tes"}
              size={'sm'}
              bgColor={true}
              className="!w-full"
            />
          </div>
          <div className="my-3">
            <Input
                type="text"
                name="doExercises"
                value={ values.doExercises }
                onChange={handleChange}
                placeholder={_language.doExercises}
                required
                pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
                title={`${_language.messageValidInput} ${_language.doExercises}.`}
                id={"tes"}
                size={'sm'}
                bgColor={true}
                className="!w-full"
              />
          </div>
          <div className="my-3 flex flex-row justify-between">
          <div className="pr-2">
              <Input
                type="text"
                name="consumeAlcohol"
                value={ values.consumeAlcohol }
                onChange={handleChange}
                placeholder={_language.consumeAlcohol}
                required
                pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
                title={`${_language.messageValidInput} ${_language.consumeAlcohol}.`}
                id={"tes"}
                size={'sm'}
                bgColor={true}
                className="!w-full"
              />
            </div>
            <div className="pl-2">
              <Input
                type="text"
                name="consumetabacco"
                value={ values.consumetabacco }
                onChange={handleChange}
                placeholder={_language.consumetabacco}
                required
                pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // weight
                title={`${_language.messageValidInput} ${_language.consumetabacco}.`}
                id={"tes"}
                size={'sm'}
                bgColor={true}
                className="!w-full"
              />
            </div>
          </div>
        </BoxToFormLayout>
        <BoxToFormLayout className="m-3 !relative">
          <div className="my-3">
            <CheckBoxGroup title={`${_language.obesity}`} onChange={handleChange}/>
          </div>
        </BoxToFormLayout>
      </form>
    </MainLayout>
  );
};
