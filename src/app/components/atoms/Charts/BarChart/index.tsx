import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { language,translateString } from '@/lib/lenguage';
import { dateToStringCol, timestampToString } from '@/lib/util/dateFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DataItem = {
  [key: string]: string;
};


interface BarChartProps {
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

const BarChart: React.FC<BarChartProps> = ({ data, __bodyPartsOrder, classNameContainer }) => {
  const bodyPartsOrder = __bodyPartsOrder ||  _bodyPartsOrder;
  if (!data.length) return null;
  const _language = language('español');

  const numericKeys = Object.keys(data[0]).filter(
    (key) => key !== 'id' && !isNaN(Number(data[0][key]))
  );

  const reversedData = data.slice().reverse(); // Invertir el orden de los datos

  const opacityIncrement = 0.2; // Incremento de opacidad entre conjuntos de datos

  const chartData = {
    labels: bodyPartsOrder.map(key => translateString(_language, key)), 
    datasets: reversedData.map((item, index) => {
      const opacity = 1 - (index * opacityIncrement);
      const color = index === 0
        ? 'rgba(75, 192, 192, 1)' // Primer conjunto de datos en verde
        : `rgba(100, 100, 100, ${opacity})`; // Gris con opacidad variable para los siguientes conjuntos

      return {
        label: `${timestampToString(item.dateCreated)}`,
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
        display: false,
        text: '',
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: '',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: '',
        },
      },
    },
  };

  return (
    <div className={`${classNameContainer}`}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
