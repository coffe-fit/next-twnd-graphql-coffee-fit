'use client'
import BoxToFormLayout from "@/app/layouts/BoxToForm";
import { language, translateString } from "@/lib/lenguage";
import { DropdownList, Input, Popup2 } from "@/app/components/atoms";

import { useState, useEffect } from "react";

interface Props {
  buttonText1: string;
  onClickButton1: (data: any) => void;
  buttonText2?: string;
  onClickButton2?: () => void;
}

export const DataForm = ({
  buttonText1,
  onClickButton1,
  buttonText2,
  onClickButton2,
}:Props) => {
  const [formData, setFormData] = useState<any>({
    "weight": "",
    "chest": "",
    "rightShoulder": "",
    "leftShoulder": "",
    "rightBicep": "",
    "leftBicep": "",
    "rightLeg": "",
    "leftLeg": "",
    "rightCalf": "",
    "leftCalf": "",
    "rightForearm": "",
    "leftForearm": "",
    "waist": "",
    "diet": "",
    "bodyFatPercentage": "",
    "muscleMass": "",
    "restingHeartRate": "",
    "bloodPressure": "",
    "endurance": "",
    "flexibility": "",
    "strengthLevel": "",
  });
  const _language = language('español');


  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  var resultado:any = Object.keys(formData).map((key) => [key]);

  const handleSubmit = (e: React.FormEvent) => {};
  return (
    <BoxToFormLayout >
    <form onSubmit={handleSubmit} className="min-h-80 flex flex-row flex-wrap content-around justify-around">
      {resultado.map((item:string, _index: any)=>(
        <span  key = {`resultado_${_index}`}className="mt-4">
          <Input
            type="number"
            name={item}
            value={formData[item]}
            onChange={handleChangeInput}
            placeholder={translateString(_language, item)}
            id={""}
            size={'sm'}
            bgColor={true}
            className={`max-md:!w-28 `}
          />
        </span>
      ))}
      <span className="absolute -bottom-8 flex w-[calc(100%+0.2rem)]  justify-evenly">
        {buttonText2 && onClickButton2 && (
          <span className="w-full">
            <button type={"button"} onClick={()=>onClickButton2()}
              className=" cff-border-1 w-full px-4 py-2 bg-neutral-100 dark:cff-bg-color-gray-600 dark:text-white text-gray-500 rounded">
              {buttonText2}
            </button>
          </span>
        )}
        {buttonText1 && (
          <span className={`w-full`}>
            <button
              type={"button"} onClick={()=>onClickButton1({ ...formData })}
              className=" cff-border-1 w-full px-4 py-2 cff-bg-color-green-600 dark:cff-bg-color-green-700 dark:text-white text-gray-500 rounded hover:bg-opacity-20">
              {buttonText1}
            </button>
          </span>
        )}
      </span>
      
    </form>
    </BoxToFormLayout>
  );
};