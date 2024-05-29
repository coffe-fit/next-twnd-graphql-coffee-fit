import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { language, translateString } from '@/lib/lenguage';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type DataItem = {
  [key: string]: string;
};


interface ChartProps {
  data: DataItem[];
  __bodyPartsOrder?: string[]
  classNameContainer: String
}


const _bodyPartsOrder = [
  'height', 'age', 'diet', 'fitnessGoals',
  'chest', 'waist', 'bodyFatPercentage',
  'bloodPressure', 'restingHeartRate',
  'flexibility', 'strengthLevel',
  'muscleMass',
  'leftBicep', 'rightBicep', 'leftForearm', 'rightForearm', 'leftShoulder', 'rightShoulder',
  'leftCalf', 'rightCalf', 'rightLeg',
  'obs', 'injuryHistory'
];
const RadarChart: React.FC<ChartProps> = ({ data, __bodyPartsOrder, classNameContainer }) => {
  const bodyPartsOrder = __bodyPartsOrder ||  _bodyPartsOrder;

  const _language = language('español');
  if (!data.length) return null;

  const numericKeys = Object.keys(data[0])
  .filter((key) => key !== 'id' && !isNaN(Number(data[0][key])))
  .sort((a, b) => bodyPartsOrder?.indexOf(a) - bodyPartsOrder.indexOf(b));


  const reversedData = data.slice().reverse(); // Invertir el orden de los datos

  const opacityIncrement = 0.2; // Incremento de opacidad entre conjuntos de datos

  const chartData = {
    labels: bodyPartsOrder.map(key => translateString(_language, key)), 
    datasets: reversedData.map((item, index) => {
      const opacity = 1 - (index * opacityIncrement);
      const color = index === 0
        ? 'rgba(75, 192, 192, 1)' // Primer conjunto de datos en verde
        : `rgba(100, 100, 100, ${opacity}) `; // Gris con opacidad variable para los siguientes conjuntos

      return {
        label: `Dataset ${index + 1}`,
        data: bodyPartsOrder.map((key) => Number(item[key])),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      };
    }),
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`${classNameContainer}`}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
