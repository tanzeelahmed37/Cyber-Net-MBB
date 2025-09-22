import React from 'react';
import { ConnectionData } from '../types';
import InfoCard from './InfoCard';
import ProgressBar from './ProgressBar';
import SystemLogs from './SystemLogs';
import { SignalIcon } from './icons/SignalIcon';
import { WalletIcon } from './icons/WalletIcon';
import { DataIcon } from './icons/DataIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { PlusIcon } from './icons/PlusIcon';
import ReminderSettings from './ReminderSettings';
import ConnectionSelector from './ConnectionSelector';

interface DashboardProps {
  usersData: ConnectionData[];
  selectedConnection: ConnectionData;
  onSelectConnection: (id: string) => void;
  onReminderSave: (connectionId: string, contact: string, method: 'Email' | 'SMS') => void;
  onAddConnection: () => void;
  systemLogs: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ usersData, selectedConnection, onSelectConnection, onReminderSave, onAddConnection, systemLogs }) => {
  const { 
    id,
    status, 
    balance, 
    dataRemainingMB, 
    dataTotalMB, 
    dueDate, 
    expiryDate,
    startDate,
    connectionNumber 
  } = selectedConnection;

  const dataUsedMB = dataTotalMB - dataRemainingMB;
  const dataUsagePercentage = dataTotalMB > 0 ? (dataUsedMB / dataTotalMB) * 100 : 0;
  const dataRemainingGB = (dataRemainingMB / 1024).toFixed(2);
  const dataTotalGB = (dataTotalMB / 1024).toFixed(2);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Connection Selector */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-orbitron text-cyan-300">Dashboard</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ConnectionSelector
              connections={usersData}
              selectedConnectionId={selectedConnection.id}
              onSelect={onSelectConnection}
            />
            <button
              onClick={onAddConnection}
              className="flex-shrink-0 flex items-center justify-center p-3 text-sm font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-colors border border-cyan-500/20 aspect-square"
              aria-label="Add New Connection"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>


      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          icon={<SignalIcon />}
          title="Connection Status"
          value={status}
          className={status === 'Active' ? 'text-green-400' : 'text-red-400'}
        />
        <InfoCard
          icon={<WalletIcon />}
          title="Remaining Balance"
          value={`$${balance.toFixed(2)}`}
        />
        <InfoCard
          icon={<DataIcon />}
          title="Remaining Data"
          value={`${dataRemainingGB} GB`}
        />
        <InfoCard
          icon={<CalendarIcon />}
          title="Due Date"
          value={formatDate(dueDate)}
        />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Details & Usage */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <h3 className="text-lg font-orbitron text-cyan-400 mb-4">Connection Details</h3>
            <p className="font-mono text-lg">
              <span className="opacity-70">Number:</span> {connectionNumber}
            </p>
          </div>
          <div className="p-6 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <h3 className="text-lg font-orbitron text-cyan-400 mb-2">Data Usage</h3>
            <ProgressBar percentage={dataUsagePercentage} />
            <div className="flex justify-between text-sm font-mono mt-2 opacity-80">
              <span>Used: {((dataTotalMB - dataRemainingMB) / 1024).toFixed(2)} GB</span>
              <span>Total: {dataTotalGB} GB</span>
            </div>
          </div>
        </div>

        {/* Dates & Reminders */}
        <div className="p-6 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10 space-y-4">
          <h3 className="text-lg font-orbitron text-cyan-400 mb-2">Key Dates</h3>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-500/10 rounded-full"><CalendarIcon className="w-6 h-6 text-cyan-400"/></div>
            <div>
              <p className="text-sm opacity-70">Start Date</p>
              <p className="font-semibold text-lg">{formatDate(startDate)}</p>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 my-2"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-500/10 rounded-full"><CalendarIcon className="w-6 h-6 text-cyan-400"/></div>
            <div>
              <p className="text-sm opacity-70">Due Date</p>
              <p className="font-semibold text-lg">{formatDate(dueDate)}</p>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 my-2"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-500/10 rounded-full"><CalendarIcon className="w-6 h-6 text-cyan-400"/></div>
            <div>
              <p className="text-sm opacity-70">Expiry Date</p>
              <p className="font-semibold text-lg">{formatDate(expiryDate)}</p>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 my-4"></div>
           <ReminderSettings connectionId={id} onSave={onReminderSave} />
        </div>
      </div>
       {/* System Logs */}
      <SystemLogs logs={systemLogs} />
    </div>
  );
};

export default Dashboard;