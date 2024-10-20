import React from 'react';

interface CircularGraphProps {
  percentage: number;
  // sentiment: string;
  size?: number;
}

export const CircularGraph: React.FC<CircularGraphProps> = ({ percentage, size = 140 }) => {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#2196f3"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="40%"
        textAnchor="middle"
        dy=".3em"
        fontSize={`${size * 0.2}px`}
        fontWeight="bold"
      >
        {percentage}% 
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        dy=".3em"
        fontSize={`${size * 0.15}px`}
        fontWeight="bold"
      >
        Positive
      </text>
    </svg>
  );
};