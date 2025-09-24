import React from 'react';

interface PriceChartProps {
  data: number[];
  isPositive: boolean;
  className?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, isPositive, className = '' }) => {
  if (!data || data.length < 2) return null;

  const width = 64;
  const height = 32;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = padding + (1 - (value - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`price-chart ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? 'hsl(var(--success))' : 'hsl(var(--danger))'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};