import React from 'react';

interface UVIndexProps {
  value: number;
  maxValue: number;
}

const UVIndex: React.FC<UVIndexProps> = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  const getUVLevel = (value: number): string => {
    if (value < 3) return 'Bajo';
    if (value < 6) return 'Moderado';
    if (value < 8) return 'Alto';
    if (value < 11) return 'Muy alto';
    return 'Extremo';
  };

  const arcLength = 180; // Half circle
  const radius = 60;
  const strokeWidth = 10;
  const center = radius + strokeWidth / 2;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  const backgroundArc = describeArc(center, center, radius, 0, arcLength);
  const valueArc = describeArc(center, center, radius, 0, arcLength * percentage / 100);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-64">
      <h2 className="text-lg mb-2 text-center">Índice de UV</h2>
      <div className="relative h-40">
        <svg width="100%" height="100%" viewBox={`0 0 ${center * 2} ${center + strokeWidth / 2}`}>
          <path
            d={backgroundArc}
            fill="none"
            stroke="#4B5563"
            strokeWidth={strokeWidth}
          />
          <path
            d={valueArc}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-3xl font-bold">{value}/10</span>
          <div className="text-xl mt-1">{getUVLevel(value)}</div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-2xl font-semibold">{value?.toFixed(2)} UV</span>
      </div>
    </div>
  );
};

export default UVIndex;