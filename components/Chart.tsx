import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

interface ChartProps {
  data: {
    Humidity: number;
    Temperature: number;
    TimeString: string;
  }[];
}

const transformData = (data: ChartProps['data']) => {
  const limitedData = data.slice(-18);
  const labels = limitedData.map(item => item.TimeString.split(' ')[1]);
  const temperatureData = limitedData.map(item => item.Temperature);
  const humidityData = limitedData.map(item => item.Humidity);

  return { labels, temperatureData, humidityData };
};

export default function Chart({ data }: ChartProps) {
  const { labels, temperatureData, humidityData } = transformData(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        pointRadius: 3,
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
