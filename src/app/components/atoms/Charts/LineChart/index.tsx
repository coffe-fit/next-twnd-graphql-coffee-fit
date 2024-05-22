import React from 'react';

type DataItem = {
  [key: string]: string;
};

interface LineChartProps {
  data: DataItem[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  if (!data.length) return null;

  const numericKeys = Object.keys(data[0]).filter(
    (key) => key !== 'id' && !isNaN(Number(data[0][key]))
  );

  const minValue = Math.min(...data.flatMap(item => numericKeys.map(key => Number(item[key]))));
  const maxValue = Math.max(...data.flatMap(item => numericKeys.map(key => Number(item[key]))));
  const range = maxValue - minValue;
  const stepY = range > 1000 ? 400 : range > 500 ? 200 : range > 100 ? 100 : range > 50 ? 50 : 20;

  const xStep = 500 / (numericKeys.length - 1);

  const scaleValues = [];
  for (let i = 0; i <= Math.ceil(maxValue / stepY); i++) {
    scaleValues.push(stepY * i);
  }

  return (
    <div className="p-4">
      <svg width="600" height="400" className="border border-gray-200">
        {/* Renderizar línea y etiqueta en el eje X */}
        <line x1="40" y1="390" x2="540" y2="390" stroke="black" strokeWidth="1" />
        <text x="540" y="395" textAnchor="middle" className="text-xs text-gray-500">
          0
        </text>
        {/* Renderizar números en el eje Y */}
        {scaleValues.map((value, index) => {
          const y = 390 - (value / range) * 300;
          return (
            <text key={index} x="30" y={y} textAnchor="end" className="text-xs text-gray-500">
              {value}
            </text>
          );
        })}
        {/* Renderizar título del eje Y */}
        <text x="10" y="200" textAnchor="middle" transform="rotate(-90, 10, 200)" className="text-xs text-gray-500">
          Escala
        </text>
        {/* Renderizar líneas y etiquetas */}
        {numericKeys.map((key, index) => {
          const x = 40 + index * xStep;
          return (
            <React.Fragment key={key}>
              {/* Etiqueta de eje X */}
              <text x={x} y="395" textAnchor="middle" className="text-xs text-gray-500">
                {key.length > 8 ? key.slice(0, 8) + '...' : key}
              </text>
            </React.Fragment>
          );
        })}
        {/* Renderizar líneas conectando puntos */}
        {data.map((item, dataIndex) => {
          let path = '';
          numericKeys.forEach((key, index) => {
            const x = 40 + index * xStep;
            const y = 390 - ((Number(item[key]) - minValue) / range) * 300;
            if (index === 0) {
              path += `M${x},${y} `;
            } else {
              path += `L${x},${y} `;
            }
          });

          const color = dataIndex === 0 ? 'green' : 'black';
          return (
            <React.Fragment key={dataIndex}>
              <path d={path} fill="none" stroke={color} strokeWidth="2" />
              {numericKeys.map((key, index) => {
                const x = 40 + index * xStep;
                const y = 390 - ((Number(item[key]) - minValue) / range) * 300;
                return (
                  <React.Fragment key={index}>
                    <circle cx={x} cy={y} r="3" fill={color} />
                    <text x={x} y={y - 10} textAnchor="middle" className="text-xs text-gray-500">
                      {item[key]}
                    </text>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
};

export default LineChart;
