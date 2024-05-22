import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { language, translateString } from '@/lib/lenguage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DataItem = {
  [key: string]: string;
};

interface ChartProps {
  data: DataItem[];
}


const bodyPartsOrder = [
  'height', 'age', 'diet', 'fitnessGoals',
  'chest', 'waist', 'bodyFatPercentage',
  'bloodPressure', 'restingHeartRate',
  'flexibility', 'strengthLevel',
  'muscleMass',
  'leftBicep', 'rightBicep', 'leftForearm', 'rightForearm', 'leftShoulder', 'rightShoulder',
  'leftCalf', 'rightCalf', 'rightLeg',
  'obs', 'injuryHistory'
];

const MultiLineChart: React.FC<ChartProps> = ({ data }) => {
  if (!data.length) return null;
  const _language = language('español');
  const numericKeys = Object.keys(data[0])
  .filter((key) => key !== 'id' && !isNaN(Number(data[0][key])))
  .sort((a, b) => bodyPartsOrder.indexOf(a) - bodyPartsOrder.indexOf(b));

  const reversedData = data.slice().reverse(); // Invertir el orden de los datos

  const numDatasets = reversedData.length;
  const opacityIncrement = 1 / (numDatasets + 1); // Incremento de opacidad entre conjuntos de datos

  const chartData = {
    labels: numericKeys.map(key => translateString(_language, key)), 
    datasets: reversedData.map((item, index) => {
      const opacity = 1 - (index * opacityIncrement);
      const color = index === 0
        ? 'rgba(75, 192, 192, 1)' // Primer conjunto de datos en verde
        : `rgba(100, 100, 100, ${opacity})`; // Gris con opacidad variable para los siguientes conjuntos

      return {
        label: `Dataset ${index + 1}`,
        data: numericKeys.map((key) => Number(item[key])),
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
    <div className="p-4" style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MultiLineChart;
