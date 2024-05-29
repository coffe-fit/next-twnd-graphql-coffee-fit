import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { language, translateString } from '@/lib/lenguage';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type DataItem = {
  [key: string]: string;
};

interface DonutChartProps {
  data: DataItem[];
  field: string;
  classNameContainer?: string
}

const DonutChart: React.FC<DonutChartProps> = ({ data, field, classNameContainer }) => {
  const _language = language('español');
  const latestValue = data[data.length - 1][field];
  const previousValues = data.slice(0, -1).map(item => Number(item[field]));

  const chartData = {
    labels: ['Previous', 'Latest'],
    datasets: [{
      data: [previousValues.reduce((a, b) => a + b, 0), Number(latestValue)],
      backgroundColor: ['rgba(100, 100, 100, 0.3)', 'rgba(75, 192, 192, 1)'],
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: { label: any; raw: any; }) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      },
      title: {
        display: true,
        text: translateString(_language, field),
      },
    },
  };

  useEffect(() => {
    const drawText = () => {
      const chart = ChartJS.getChart('doughnutChart');
      if (chart) {
        const ctx = chart.ctx;
        const { width, height } = chart;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        const text = "";
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    };

    ChartJS.register({
      id: 'centerTextPlugin',
      beforeDraw: drawText
    });

    return () => {
      ChartJS.unregister({
        id: 'centerTextPlugin',
        beforeDraw: drawText
      });
    };
  }, [latestValue]);

  return (
    <div className={`${classNameContainer} relative`} >
      <Doughnut id="doughnutChart" data={chartData} options={options} />
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '60%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        fontWeight: 'bold',
      }}>
        {latestValue}
      </div>
    </div>
  );
};

export default DonutChart;
