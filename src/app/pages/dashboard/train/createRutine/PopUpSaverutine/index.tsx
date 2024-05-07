import { Input, Popup2, Textarea } from "@/app/components/atoms";
import { language } from "@/lib/lenguage";
import { useState } from "react";

interface Props {
  isOpen: boolean,
  onClose: () => void
  onSendService: (obs: string, heartRate: string) => void
}
export const PopUpSaveRutine = ({isOpen, onClose, onSendService}:Props) => {
  const [obs, setObs] = useState<string>('');
  const [heartRate, setHeartRate] = useState<string>('');

  const _language = language('español');

  return (
    <Popup2
      title={"Guardar"}
      isOpen={isOpen}
      buttonText1="Cancelar"
      onClickButton1={onClose}
      buttonText2="Guardar"
      onClickButton2={()=>onSendService(obs, heartRate)}
      onClose={onClose}
    >
      <div className="flex justify-center">
        <span>
          {_language.heartRate}
          <Input
            name={_language.heartRate}
            id="repeat" dark={true}
            onChange={(e)=>setObs(e.target.value)} />
        </span>
      </div>
      <div className="flex justify-center">
        <span>
          {_language.obs}
          <Textarea
            name={_language.obs}
            id="repeat" dark={true}
            onChange={(e)=>setObs(e.target.value)} />
        </span>
      </div>
    </Popup2>
  );
};
