
import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, className = '' }) => {
  return (
    <div className="p-6 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-400">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-2xl font-bold font-orbitron ${className}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
