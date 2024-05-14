import { useEffect, useState } from "react";
import { DropdownList, Input, Popup2 } from "@/app/components/atoms";
import { UserInterface } from "@/lib/interfaces";
import { initialState as userInitialData } from "@/provider/redux/userSlice";
import BoxToFormLayout from "@/app/layouts/BoxToForm";
import { language, translateString } from "@/lib/lenguage";
import { Option } from "@/app/components/atoms/DropdownList";

interface Props {
  buttonText1: string;
  onClickButton1: (data: UserInterface) => void;
  userData?: UserInterface,
  roleList:any,
  companyList: any,
}


export const UserForm = ({
  buttonText1,
  onClickButton1,
  userData,
  roleList,
  companyList,
}: Props) => {
  
  const [formData, setFormData] = useState<any>(userData || userInitialData);
  
  const _language = language('español');
  
  useEffect(() => {
    setFormData(userData || userInitialData) 
  }, []);
  

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDrop = (
    e: {name: string, option: Option}
  ) => {
    const { name, option } = e;
    
    setFormData({ ...formData, [name]: option});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { gender, ..._formData} = formData;
    onClickButton1({gender: gender.id || gender, ..._formData});
  };

  return (
    <BoxToFormLayout >
    <form onSubmit={handleSubmit} className="min-h-80 flex justify-between items-center flex-col">
      <span>
        {_language.email}
        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChangeInput}
          placeholder={_language.email}
          required
          pattern="/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/" // email
          title={`${_language.messageValidInput} ${_language.email}.`}
          id={""}
          size={'lg'}
          bgColor={true}
          disable={userData?.email !== '' ? true: false}
        />
      </span>
      <span>
        {_language.documentdId}
        <Input
          type="text"
          name="document"
          value={formData.document}
          onChange={handleChangeInput}
          placeholder={_language.documentdId}
          required
          pattern="\d{10}" // 11 digits
          title={`${_language.messageValidInput} 11 ${_language.digit}.`}
          id={""}
          size={'lg'}
          bgColor={true}
        />
      </span>
      <span>
        {_language.role}
        <DropdownList
          options={roleList}
          onSelect={(op: Option) => handleChangeDrop({name:'role', option: op})}
          textIni={`${!formData.role ? _language.role :  translateString(_language, formData.role.name)}`}
          classNameInput="w-40"
          size={'lg'}
        ></DropdownList>
      </span>
      <span>
        {_language.company}
        <DropdownList
          options={companyList}
          onSelect={(op: Option) => handleChangeDrop({name:'company', option: op})}
          textIni={`${!formData.company?.id ? _language.company : formData.company.name}`}
          classNameInput="w-40"
          
          size={'lg'}
        ></DropdownList>
      </span>
      <span>
        {_language.gender}
        <DropdownList
          options={_language.genderList}
          onSelect={(op: Option) => handleChangeDrop({name:'gender', option: op})}
          textIni={`${!formData.gender ? _language.gender : formData.gender.id || formData.gender}`}
          classNameInput="w-40"
          size={'lg'}
        ></DropdownList>
      </span>
      <span>
        {_language.phone}
        <Input
          type="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChangeInput}
          placeholder={_language.phone}
          required
          pattern="\d{10}" // 10 digits
          title={`${_language.messageValidInput} 10 ${_language.digit}.`}
          id={""}
          size={'lg'}
          bgColor={true}
        />
      </span>
      <span>
        {_language.age}
        <Input
          type="number"
          name="age"
          value={formData.age.toString()}
          onChange={handleChangeInput}
          placeholder={_language.age}
          required
          pattern="\d{18}" // 10 digits
          id={""}
          size={'lg'}
          bgColor={true}
        />
      </span>
      {buttonText1 && (
        <span className="absolute -bottom-8 flex w-[calc(100%+0.2rem)] justify-evenly">
          <button type="submit" className=" w-full px-4 py-2 cff-bg-color-green-600 dark:cff-bg-color-green-700 dark:text-white text-gray-500 rounded hover:bg-opacity-20">
            {buttonText1}
          </button>
        </span>
      )}
    </form>
    </BoxToFormLayout>
  );
};