import React, { useState, useEffect, useRef } from 'react';
import { ConnectionData } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ConnectionSelectorProps {
  connections: ConnectionData[];
  selectedConnectionId: string;
  onSelect: (id: string) => void;
}

const ConnectionSelector: React.FC<ConnectionSelectorProps> = ({ connections, selectedConnectionId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedConnection = connections.find(c => c.id === selectedConnectionId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  if (!selectedConnection) return null;

  return (
    <div ref={wrapperRef} className="relative w-full sm:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white/10 dark:bg-gray-800/40 border-2 border-cyan-500/50 rounded-lg transition-colors duration-300 text-left focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${selectedConnection.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className="font-mono font-bold">{selectedConnection.connectionNumber}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full bg-gray-800 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-down">
          <ul className="max-h-60 overflow-y-auto">
            {connections.map(conn => (
              <li key={conn.id}>
                <button
                  onClick={() => {
                    onSelect(conn.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 flex items-center transition-colors duration-200 ${
                    selectedConnectionId === conn.id
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'hover:bg-cyan-500/10'
                  }`}
                >
                    <span className={`w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 ${conn.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    <span className="font-mono">{conn.connectionNumber}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ConnectionSelector;