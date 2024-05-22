import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type DataItem = {
  [key: string]: string;
};

interface ScatterChartProps {
  data: DataItem[];
}

const ScatterChart: React.FC<ScatterChartProps> = ({ data }) => {
  if (!data.length) return null;

  const numericKeys = Object.keys(data[0]).filter(
    (key) => key !== 'id' && !isNaN(Number(data[0][key]))
  );

  const scatterData = data.flatMap((item, index) =>
    numericKeys.map((key) => ({
      x: key,
      y: Number(item[key]),
      label: `Dataset ${index + 1}`
    }))
  );

  const numDatasets = data.length;
  const baseOpacity = 0.5;
  const opacityIncrement = (1 - baseOpacity) / (numDatasets - 1);

  const chartData = {
    labels: numericKeys,
    datasets: data.map((item, index) => {
      const opacity = index === 0 ? 1 : baseOpacity + ((index - 1) * opacityIncrement);
      const color = index === 0
        ? 'rgba(75, 192, 192, 1)' // Primer conjunto de datos en verde
        : `rgba(100, 100, 100, ${0.5 + (0.1 * (index - 1))})`; // Gris oscuro y tonos más claros para los siguientes conjuntos

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
        text: 'Scatter Chart',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
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
    <div className="p-4">
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default ScatterChart;