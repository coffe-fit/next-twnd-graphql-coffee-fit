'use client'
import useCustomRouter from "@/app/hooks/useCustomRouter"
import MainLayout from "@/app/layouts/MainWithLoading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoxToFormLayout from "@/app/layouts/BoxToForm";
import { DropdownList, Input, UrlInput, CheckBoxWithLabel } from "@/app/components/atoms";
import { language, translateString } from "@/lib/lenguage";
import { initialState as trainInitialData } from "@/provider/redux/trainSlice";
import { exercise_create } from "@/lib/services/graphql/exercises/create.service";
import { exercise_update } from "@/lib/services/graphql/exercises/update.service";


export const Client = ({idPage, muscularGroupList, metricsList}:any) => {
  const router = useCustomRouter();
  let exerciseSelected = useSelector((state: any) => state.train.exerciseList.exerciseSelected);
  const [formData, setFormData] = useState<any>(exerciseSelected || trainInitialData.exerciseList.exerciseSelected);
  const [checkedValues, setCheckedValues] = useState<{ [key: string]: boolean }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const _language = language('español');
  console.log(exerciseSelected);
  
  const handleUrlChange = (name: string, url: string) => {
    
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: url,
      }));
  };
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };
  const handleDropdownSelect = (name: string, selectedOption: any) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleCheckboxChange = (name: string, value: boolean, checked: boolean) => {
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleClickButtonSave= async ()=>{
    const getTrueKeys = (obj: any) => Object.keys(obj).filter(key => obj[key]);
    const arrayCheck = getTrueKeys(checkedValues);
    const sendData = {
      ...formData,
      metrics: arrayCheck
    }
    console.log(checkedValues);
    console.log(sendData);
    try {
      let exercise:{id?: string} = {};
      const {rutineType, ...dataRest} = sendData;
      if(exerciseSelected.exerciseId) {
        exercise = await exercise_update({
          token: idPage,
          _data: {
            rutineTypeId: rutineType.id,
            ...dataRest,
          },
        });
      } else {
        exercise = await exercise_create({
          token: idPage,
          _data: {
            rutineTypeId: rutineType.id,
            ...dataRest,
          },
        });
      }
      if (exercise.id) router.push(`/pages/dashboard/train/exerciseList?id=${idPage}&reload=${JSON.stringify(sendData)}`);
      else throw exercise
    } catch (error) {
      console.error(error);
    }
    
  }

  const isUrlValid = (url: string) => {
    // Regular expression for a basic URL validation
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const validateFields = () => {
    const errors: { [key: string]: string } = {};

    // Validate imgGood URL
    if (!formData.imgGood || (formData.imgGood && !isUrlValid(formData.imgGood))) {
      errors.imgGood = _language.urlImagenFail;
    }

    // Validate movie URL
    if (!formData.movie || (formData.movie && !isUrlValid(formData.movie))) {
      errors.movie = _language.urlVideoFail;
    }

    // Validate name field (no special characters)
    const namePattern = /^[a-zA-Z0-9 ]*$/;
    if (!formData.name || (formData.name && !translateString(_language, formData.name) && !namePattern.test(formData.name))) {
      console.log(formData.name);
      
      errors.name = _language.nameFail;
    }

    // Validate rutineType dropdown
    if (!formData.rutineType.id) {
      errors.rutineType = _language.muscleGroupFail;
    }

    // Validate metrics check
    if (Object.keys(checkedValues).length === 0) {
      errors.metrics = _language.measureFail;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const getMeasureName = (measureId: string) => {
    const measure = _language.measureList.find((measure) => measure.id === measureId);
    return measure ? `${measure.label } (${measure.name})` : measureId;
  };
  
  const isSaveButtonDisabled = !formData.name || !formData.rutineType.id;


  useEffect(() => {
    if (formData.metrics) {
      const initialCheckedValues = formData.metrics.reduce((acc: any, element: any) => {
        acc[element] = true;
        return acc;
      }, {});
      setCheckedValues(initialCheckedValues);
    }
  }, [formData.metrics]);

  return (
    <MainLayout>
      <BoxToFormLayout >
        {/* <form  className="min-h-96 flex justify-between items-center flex-col "> */}
          <div className="flex flex-row justify-around">
          <UrlInput
            mediaType="photo"
            longText="Insertar imagen"
            shortText="Imagen"
            iconColor="text-green-500"
            initialUrl={formData.imgGood}
            name="imgGood"
            onUrlChange={handleUrlChange} // Update mediaUrl state with the entered URL
          />
          <UrlInput
            mediaType="video"
            longText="Insertar video"
            shortText="Video"
            iconColor="text-green-500"
            initialUrl={formData.movie}
            name="movie"
            onUrlChange={handleUrlChange} // Update mediaUrl state with the entered URL
          />
          </div>
          <div className="relative mb-4">
            <span className="">
            <Input
            key='name'
            type="text"
            name={'name'}
            value={translateString(_language, formData['name']) || formData['name']}
            onChange={handleChangeInput}
            placeholder={translateString(_language, 'name')}
            id={"tes"}
            size={'sm'}
            bgColor={true}
            className={`w-full`}
          />
            </span>
          </div>
          

        <span className="mb-4">
          {_language.muscularGroup}
          <DropdownList
            key='muscularGroupList'
            options={muscularGroupList}

            onSelect={(selectedOption) => handleDropdownSelect('rutineType', selectedOption)}
            textIni={translateString(_language, formData.rutineType.name)}
            // onSelect={(op: Option) => handleChangeDrop({name:'gender', option: op})}
            // textIni={`${!formData.rutineType ? translateString(_language, formData.rutineType.name) : _language.muscularGroup}`}
            classNameInput="w-full mb-4"
            size={'sm'}
            textHeader={`${_language.muscularGroup}`}
          ></DropdownList>
        </span>

        <span>
          {_language.exerciseMeasurementUnits}
            {metricsList && metricsList.map((metric: any, index: number)=>(
              <CheckBoxWithLabel
                key={index}
                label={`${getMeasureName(metric.measure)}`}
                name={metric.name}
                value={ formData.metrics.includes(metric.name) || false}
                onChange={handleCheckboxChange}
              />
            ))}
        </span>
        <span className="absolute left-0 -bottom-8 flex w-full justify-evenly">
          <button  
            disabled={isSaveButtonDisabled}
            type={"button"}
            onClick={() => {
              if (validateFields()===true) {
                handleClickButtonSave();
              }
            }}
            className={`w-full px-4 py-2 rounded ${isSaveButtonDisabled ? 'bg-gray-400 text-gray-700' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            {_language.save}
          </button>
        </span>
        {/* Display validation errors */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {Object.values(validationErrors).map((error, index) => (
              <p key={index} className="text-xs">
                {error}
              </p>
            ))}
          </div>
        )}
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        {/* </form> */}
      </BoxToFormLayout >
      {/* <FooterButtons /> */}
    </MainLayout>
  );
};
