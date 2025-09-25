import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  data: number[];
  isPositive: boolean;
  className?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, isPositive, className = '' }) => {
  if (!data || data.length < 2) return null;

  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        data: data,
        borderColor: isPositive ? '#22c55e' : '#ef4444',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className={`w-20 h-10 ${className}`}>
      <Line data={chartData} options={options} />
    </div>
  );
};