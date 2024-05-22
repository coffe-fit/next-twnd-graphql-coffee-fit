import React from 'react';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

interface DataItem {
  diet: string;
  chest: string;
  bodyFatPercentage: string;
  bloodPressure: string;
  flexibility: string;
  leftBicep: string;
  leftCalf: string;
  leftShoulder: string;
  leftForearm: string;
  muscleMass: string;
  restingHeartRate: string;
  rightBicep: string;
  rightCalf: string;
  rightForearm: string;
  rightShoulder: string;
  rightLeg: string;
  strengthLevel: string;
  waist: string;
  weight: string;
  obs: string;
  injuryHistory: string;
  height: string;
  fitnessGoals: string;
  age: string;
}

interface LineChartProps {
  data: DataItem[];
  xField: keyof DataItem;
  yField: keyof DataItem;
  labelField?: keyof DataItem;
}

const LineChartExt: React.FC<LineChartProps> = ({ data, xField, yField, labelField }) => {
  const xData = data.map(item => item[xField] || data.indexOf(item).toString());
  const yData = data.map(item => parseFloat(item[yField]));

  const datasets = [
    {
      label: yField as string,
      data: yData,
      fill: false,
      borderColor: 'rgba(34,197,94,1)', // Verde para el primer registro
      borderWidth: 3,
      pointBackgroundColor: 'rgba(34,197,94,1)',
      pointBorderColor: 'rgba(34,197,94,1)',
    },
    ...yData.slice(1).map((_, index) => {
      const grayValue = 200 - (index * 10);
      return {
        data: [yData[0], ...yData.slice(1, index + 2)], // Puntos previos + actual
        fill: false,
        borderColor: `rgba(${grayValue},${grayValue},${grayValue},1)`, // Tonalidades de gris
        borderWidth: 1,
        pointBackgroundColor: `rgba(${grayValue},${grayValue},${grayValue},1)`,
        pointBorderColor: `rgba(${grayValue},${grayValue},${grayValue},1)`,
      };
    }),
  ];

  const chartData = {
    labels: xData,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: xField as string,
        },
      },
      y: {
        title: {
          display: true,
          text: yField as string,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || '';
            const customLabel = labelField ? data[context.dataIndex][labelField] : '';
            return `${label}: ${value} ${customLabel}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};