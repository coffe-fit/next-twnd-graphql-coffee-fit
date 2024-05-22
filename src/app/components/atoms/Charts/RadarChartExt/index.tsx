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

interface RadarChartProps {
  data: DataItem[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  if (!data.length) return null;

  const numericKeys = Object.keys(data[0]).filter(
    (key) => key !== 'id' && !isNaN(Number(data[0][key]))
  );

  const reversedData = data.slice().reverse(); // Invertir el orden de los datos

  const opacityIncrement = 0.2; // Incremento de opacidad entre conjuntos de datos

  const chartData = {
    labels: numericKeys,
    datasets: reversedData.map((item, index) => {
      const opacity = 1 - (index * opacityIncrement);
      const color = index === 0
        ? 'rgba(75, 192, 192, 1)' // Primer conjunto de datos en verde
        : `rgba(100, 100, 100, ${opacity}) `; // Gris con opacidad variable para los siguientes conjuntos

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
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4" style={{ height: '400px', width: '100%' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
