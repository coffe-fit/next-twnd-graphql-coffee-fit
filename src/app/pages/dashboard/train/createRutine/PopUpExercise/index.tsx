import { Input, Popup1, DropdownList } from "@/app/components/atoms";
import { Option } from "@/app/components/atoms/DropdownList";
import { trainInterface } from "@/lib/interfaces/train.Interface";
import { language } from "@/lib/lenguage";
import { closePopup } from "@/provider/redux/popupSlice";
import { addRutineSelected } from "@/provider/redux/trainSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


interface Props {}

export const PopUpExercise: React.FC<Props> = () => {
  const [erroMessage, setErroMessage] = useState('');
  const [series, setSeries] = useState(0);
  const [amountMax, setAmountMax] = useState<number[]>([]);
  const [breakTime, setBreakTime] = useState(0);

  const isOpen = useSelector((state: any) => state.popup.isOpen);
  let stateTrain:trainInterface = useSelector((state: any) => state.train);

  const dispatch = useDispatch();

  const _language = language('español');

  const optionAmountRepeat: Option[] = [
    { id: "10", name: "10" },
    { id: "12", name: "12" },
    { id: "15", name: "15" },
    { id: "20", name: "20" },
  ];

  const optionBreakTime: Option[] = [
    { id: "0", name: `0 ${_language.min}` },
    { id: "5", name: `5 ${_language.min}` },
    { id: "10", name: `10 ${_language.min}` },
    { id: "15", name: `15 ${_language.min}` },
    { id: "20", name: `20 ${_language.min}` },
  ];


  const addExcercise = (dayName: string, exercise: any, type: string) => {
    const indexDay = _language.daysArray.indexOf(dayName);
    const array2 = {
        type: type,
        exercises: exercise,
        series,
        amountMax,
        breakTime
    };

    let eByDay: [any[]] = stateTrain.newRutine ? [...stateTrain.newRutine] : [[]];

    if (!Array.isArray(eByDay[indexDay])) {
        eByDay[indexDay] = [];
    }

    const existingIndex = eByDay[indexDay].findIndex((item) =>
        item.type === array2.type &&
        JSON.stringify(item.exercises) === JSON.stringify(array2.exercises)
    );

    if (existingIndex === -1) {
        eByDay[indexDay] = [...eByDay[indexDay], array2];
        console.log(eByDay);
    }

    dispatch(addRutineSelected({ rutines: eByDay }));
    dispatch(closePopup());
  };


  const translateString = (text: string)=>{
    if (text in _language.exercises) {
      const exercisesData: any = _language.exercises
      return exercisesData[text as keyof any];
    }
    return text
  }

  useEffect(() => {
    if (isOpen) {
      setSeries(0);
      setAmountMax([]);
      setBreakTime(0);
    }
  }, [isOpen]);
  

  const handleAmountMaxSelect = (op: Option) => {
    setAmountMax((prevAmountMax) => [...prevAmountMax, +op.id]);
  };

  const handleClickButton2 = () => {
    const wrong = _language.SomethingIsWrong;
    let errorMessage = '';
    
    const validateData = () => {
      if (series === 0) {
        errorMessage = _language.series;
        return false;
      }
      if (!amountMax.length) {
        errorMessage = _language.amountMax;
        return false;
      }
      setErroMessage('');
      return true;
    };
  
    if (validateData()) {
      const { dayneme, exercise, type } = stateTrain.exerciseSelected;
      addExcercise( dayneme, exercise, type);
    } else {
      setErroMessage(`${wrong} ${errorMessage}`);
    }
  };

  return (
    <Popup1
      title={translateString(stateTrain?.exerciseSelected?.exercise?.name || '')}
      buttonText1="Cancelar"
      onClickButton1={()=>dispatch(closePopup())}
      buttonText2="Agregar"
      onClickButton2={handleClickButton2}
    >
      <div className="flex justify-center">
        <span>
          {_language.series}
          <Input
            type="number"
            name={_language.series}
            id="repeat" dark={true}
            onChange={(e)=>setSeries(+e.target.value)}></Input>
        </span>
      </div>
      <div className="flex justify-around flex-row mt-3">
        <span>
          {_language.amountMax}
          <DropdownList
            options={optionAmountRepeat}
            onSelect={handleAmountMaxSelect}
            textIni={`${amountMax[0] === undefined ? _language.amountMax : amountMax[0]}`}
            classNameInput="w-40"
          ></DropdownList>
        </span>
        <span>
          {_language.break}
          <DropdownList
            options={optionBreakTime}
            onSelect={(op: Option) => setBreakTime(+op.id)}
            textIni={`${breakTime === 0 ? _language.break : breakTime + ' ' + _language.min}`}
            classNameInput="w-40"
          ></DropdownList>
        </span>
      </div>

      {erroMessage && erroMessage !=='' && (
        <span className='text-red-700 flex justify-center w-full'>
          {erroMessage}
        </span>
      )}
    </Popup1>
  );
};
