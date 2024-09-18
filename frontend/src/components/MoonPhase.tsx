import React from 'react';

interface MoonPhaseProps {
    faseLunar: number; // 0 to 1, where 0 is new moon and 1 is full moon
    location: string;
}

const MoonPhase: React.FC<MoonPhaseProps> = ({ faseLunar, location }) => {
    const width = 20;
    const height = 20; // Reduced height to make the moon shorter
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusX = width / 2 - 2;
    const radiusY = height / 2 - 2;

    // Ensure faseLunar is between 0 and 1
    const normalizedFase = Math.max(0, Math.min(1, faseLunar));

    // Calculate the illumination percentage
    const illuminationPercentage = Math.abs(0.5 - normalizedFase) * 2;

    // Determine if it's waxing or waning
    const isWaxing = normalizedFase <= 0.5;

    // Calculate the angle for the terminator arc
    const terminatorAngle = illuminationPercentage * Math.PI;

    // Calculate control point for the quadratic curve
    const controlPointX = centerX + radiusX * Math.cos(terminatorAngle / 2) * (isWaxing ? -1 : 1);

    // Path for the dark part of the moon
    const darkPath = `
    M ${centerX} ${centerY - radiusY}
    A ${radiusX} ${radiusY} 0 0 ${isWaxing ? 1 : 0} ${centerX} ${centerY + radiusY}
    Q ${controlPointX} ${centerY} ${centerX} ${centerY - radiusY}
    Z
  `;

    // Path for the illuminated part of the moon
    const illuminatedPath = `
    M ${centerX} ${centerY - radiusY}
    A ${radiusX} ${radiusY} 0 0 ${isWaxing ? 0 : 1} ${centerX} ${centerY + radiusY}
    Q ${controlPointX} ${centerY} ${centerX} ${centerY - radiusY}
    Z
  `;

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg ">
            <h2 className="text-lg mb-2 text-center">Fase Lunar</h2>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                {/* Moon base (always visible) */}
                <ellipse
                    cx={centerX}
                    cy={centerY}
                    rx={radiusX}
                    ry={radiusY}
                    fill="#F7FAFC"
                    stroke="#A0AEC0"
                    strokeWidth=".5"
                />
                {/* Dark part of the moon */}
                <path d={darkPath} fill="#718096" />
                {/* Illuminated part of the moon */}
                <path d={illuminatedPath} fill="#F7FAFC" />
            </svg>
            <div className="mt-2 text-center">
                <div className="text-center">{location}</div>
                <div>{new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</div>
                <span className="text-sm">
                    {(normalizedFase * 100).toFixed(0)}% {isWaxing ? 'Creciente' : 'Menguante'}
                </span>
            </div>
        </div>
    );
};

export default MoonPhase;