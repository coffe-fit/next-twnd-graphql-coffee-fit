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
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Valoraciones por Categoría',
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
          text: 'Valores',
        },
      },
    },
  };

  return (
    <div className="p-4" style={{ height: '400px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
