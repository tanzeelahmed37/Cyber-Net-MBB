
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full bg-gray-700/50 rounded-full h-4 relative overflow-hidden border border-cyan-500/20">
      <div
        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end"
        style={{ width: `${safePercentage}%` }}
      >
        <span className="text-xs font-mono pr-2 text-white">{safePercentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
