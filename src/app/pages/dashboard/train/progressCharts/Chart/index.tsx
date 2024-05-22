'use client'
import LineChart from "@/app/components/atoms/Charts/LineChart";
import RadarChart from "@/app/components/atoms/Charts/RadarChartExt";
import BarChart from "@/app/components/atoms/Charts/BarChart";
import MultilineChart from "@/app/components/atoms/Charts/MultilineChart";
import ScatterChart from "@/app/components/atoms/Charts/ScatterChart";
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

  return (
    <div className="flex flex-col items-center h-full
    !rounded-tl-xl 
    !rounded-tr-xl ">
      <div className="cff-border-1 w-9/12 h-full">
        {/* <LineChart data={progressList}  /> */}
        {/* <RadarChart data={progressList} /> */}
        {/* <BarChart data={progressList} /> */}
        <MultilineChart data={progressList} />
        {/* <ScatterChart data={progressList} /> */}
      </div>
          
    </div>
  );
};