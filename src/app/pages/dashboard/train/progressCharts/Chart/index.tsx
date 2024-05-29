'use client'
// import LineChart from "@/app/components/atoms/Charts/LineChart";
import LineChartExt from "@/app/components/atoms/Charts/LinechartExt";
import RadarChart from "@/app/components/atoms/Charts/RadarChartExt";
import BarChart from "@/app/components/atoms/Charts/BarChart";
import MultilineChart from "@/app/components/atoms/Charts/MultilineChart";
import ScatterChart from "@/app/components/atoms/Charts/ScatterChart";
import DougnutChart from "@/app/components/atoms/Charts/Dougnut";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/atoms";
import urlSave from '@/app/images/icons/salvar-99-80s.png';
import urlSaveWhite from '@/app/images/icons/salvar-white-99-80s.png';

import urlGrafics from '@/app/images/icons/barra-grafica-99-80s.png';
import urlGraficsWhite from '@/app/images/icons/barra-grafica-white-99.png';

// Librerías externas
import Image from 'next/image';

interface Props {
  progressList: any,
  onDataFrom:(value: any)=>void}

export const Chart = ({
  progressList, onDataFrom
}:Props) => {

const groups = {
  bodyMeasurements: ['chest', 'waist', 'height', 'weight'],
  bloodPressureAndHeartRate: ['bloodPressure', 'restingHeartRate'],
  strengthAndFlexibility: ['strengthLevel', 'flexibility'],
  musclesAndLegs: [
    'leftBicep', 'rightBicep', 'leftForearm', 'rightForearm',
    'leftShoulder', 'rightShoulder', 'leftCalf', 'rightCalf', 'rightLeg'
  ],
  others: ['diet', 'muscleMass', 'obs', 'injuryHistory', 'fitnessGoals', 'age']
};

const groupNames = {
  bodyMeasurements: 'Medidas Corporales',
  bloodPressureAndHeartRate: 'Presión y Frecuencia Cardíaca',
  strengthAndFlexibility: 'Fuerza y Flexibilidad',
  musclesAndLegs: 'Músculos y Piernas',
  others: 'Otros'
};

  return (
    <div className="flex flex-col items-center h-full
    !rounded-tl-xl 
    !rounded-tr-xl ">
      <div className="md:cff-border-1 md:w-7/12 max-w-xl max-md:w-full p-3 h-full flex flex-col  max-md:justify-evenly ">
        <span>
          <MultilineChart data={progressList} __bodyPartsOrder={groups.musclesAndLegs} classNameContainer={'p-4 h-96 w-full max-md:cff-border-1'} />
        </span>
        <span className="flex flex-row py-3 max-md:flex-col ">
          <BarChart data={progressList} __bodyPartsOrder={groups.bodyMeasurements} classNameContainer={'p-4 w-2/3 max-md:w-full max-md:cff-border-1'} />
          <span className="w-1/3 flex flex-col max-md:w-full max-md:flex-row p-3 max-md:cff-border-1 max-md:py-3">
            <DougnutChart data={progressList} field="muscleMass" classNameContainer={'p-4 h-1/2  w-auto max-md:w-1/2 '}/>
            <DougnutChart data={progressList} field="bodyFatPercentage" classNameContainer={'p-4 h-1/2 w-auto max-md:w-1/2 '}/>
          </span>
        </span>
        <span className="flex flex-row  max-md:cff-border-1 p-3">
          <DougnutChart data={progressList} field="restingHeartRate" classNameContainer={'p-4 h-1/3 w-1/3'}/>
          <DougnutChart data={progressList} field="flexibility" classNameContainer={'p-4 h-1/3 w-1/3  '}/>
          <DougnutChart data={progressList} field="bloodPressure" classNameContainer={'p-4 h-1/3 w-1/3 '}/>
        </span>
      </div> 
    </div>
  );
};