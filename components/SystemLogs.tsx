import React, { useRef, useEffect } from 'react';

interface SystemLogsProps {
  logs: string[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs }) => {
  const logsEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [logs]);

  return (
    <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg shadow-cyan-500/5">
      <h3 className="text-lg font-orbitron text-cyan-400 mb-4">Automated Reminder Logs</h3>
      <div className="h-48 bg-black/30 rounded-md p-4 overflow-y-auto font-mono text-sm text-gray-300 space-y-2">
        {logs.length === 0 && (
          <p className="text-gray-500">No automated reminders sent yet. Set a reminder for a connection with a past due date to see logs here.</p>
        )}
        {logs.map((log, index) => (
          <p key={index} className="whitespace-pre-wrap animate-log-entry">
            <span className="text-cyan-400">{log.split(']')[0]}]</span>
            {log.split(']')[1]}
          </p>
        ))}
        <div ref={logsEndRef} />
      </div>
      <style>{`
        @keyframes log-entry {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-log-entry {
          animation: log-entry 0.3s ease-out forwards;
        }
        /* Custom scrollbar for webkit browsers */
        div::-webkit-scrollbar {
            width: 8px;
        }
        div::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.2);
            border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
            background: rgba(0, 255, 255, 0.3);
            border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default SystemLogs;
