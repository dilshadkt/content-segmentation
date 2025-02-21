import React from "react";
import { useNavigate } from "react-router-dom";

const CircularProgress = ({
  currentValue = 0,
  target = 2000,
  location = "ABU DHABI",
  subtitle = "Earnings Today",
  branchId,
  clientId,
  todaySaleAmount,
}) => {
  const percentage = Math.min((currentValue / target) * 100, 100) || 0;
  const size = 220;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const pathColor = currentValue >= target ? "#22c55e" : "#f11f1f";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        localStorage.setItem("branchId", branchId);
        localStorage.setItem("clientId", clientId);
        navigate(`/${branchId}/reports`);
      }}
      className="w-full cursor-pointer bg-gray-700/20 rounded-xl
     backdrop-blur-md relative flexCenter flex-col py-14"
    >
      <span className="absolute top-3 left-4">
        🎯 Target
        <b className="mx-1 bg-gray-800 px-1 shadow-lg rounded-sm">
          <i>{target}</i>
        </b>{" "}
        AED
      </span>
      <div className="hover:scale-105 transition-all duration-300">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-slow">
              <svg width={size} height={size} className="transform -rotate-90">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="#555657"
                  strokeOpacity={0.4}
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={pathColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  filter="url(#glow)"
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    filter: "url(#glow)",
                  }}
                />
              </svg>
            </div>
            <svg width={size} height={size} className="transform -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#555657"
                strokeOpacity={0.4}
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={pathColor}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-bold">{location}</h3>
              <p className="text-sm text-gray-500">
                <span
                  style={{
                    color: pathColor,
                  }}
                  className="font-semibold"
                >
                  {percentage?.toFixed(2)}%
                </span>{" "}
                Target Completed
              </p>
              <p
                style={{
                  color: pathColor,
                }}
                className={`text-2xl font-bold mt-2 `}
              >
                {todaySaleAmount?.toFixed()}
              </p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
