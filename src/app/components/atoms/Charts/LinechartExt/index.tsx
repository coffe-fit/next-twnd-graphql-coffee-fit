import { language, translateString } from '@/lib/lenguage';
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';


type DataItem = {
  [key: string]: string;
};

interface LineChartProps {
  data: DataItem[];
  __bodyPartsOrder?: string[],
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

const LineChartExt: React.FC<LineChartProps> = ({ data, __bodyPartsOrder, classNameContainer }) => {
  const bodyPartsOrder = __bodyPartsOrder ||  _bodyPartsOrder;
  
  const _language = language('español');
  const reversedData = data.slice().reverse(); // Invertir el orden de los datos
  
  // const xData = data.map(item => item[xField] || data.indexOf(item).toString());
  // const yData = data.map(item => parseFloat(item[yField]));

  const numDatasets = reversedData.length;
  const opacityIncrement = 1 / (numDatasets + 1); // Incremento de opacidad entre conjuntos de datos

  const chartData = {
    labels: bodyPartsOrder.map(key => translateString(_language, key)), 
    datasets: reversedData.map((item, index) => {
      const opacity = 1 - (index * opacityIncrement);
      const color = index === 0
        ? 'rgba(75, 192, 192, 1)' // Primer conjunto de datos en verde
        : `rgba(100, 100, 100, ${opacity})`; // Gris con opacidad variable para los siguientes conjuntos

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
    responsive: true,
    maintainAspectRatio: false, // Permitir que el gráfico sea flexible en su altura
    plugins: {
      legend: {
        position: 'top' as const, // Mover la leyenda al fondo para ahorrar espacio
      },
      title: {
        display: true,
        text: 'Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categorías',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div className={`${classNameContainer}`}>
      <Line data={chartData} options={options} />
    </div>
  );
};
export default LineChartExt;