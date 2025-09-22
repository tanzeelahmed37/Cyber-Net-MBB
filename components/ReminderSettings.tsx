import React, { useState } from 'react';
import { EmailIcon } from './icons/EmailIcon';
import { SmsIcon } from './icons/SmsIcon';

interface ReminderSettingsProps {
  connectionId: string;
  onSave: (connectionId: string, contact: string, method: 'Email' | 'SMS') => void;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({ connectionId, onSave }) => {
  const [method, setMethod] = useState<'Email' | 'SMS'>('Email');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactInfo.trim()) {
      onSave(connectionId, contactInfo, method);
      setContactInfo('');
    }
  };

  const getButtonClasses = (buttonMethod: 'Email' | 'SMS') => {
    const baseClasses = "flex-1 flex items-center justify-center p-2 rounded-md transition-colors duration-200 text-sm";
    if (method === buttonMethod) {
      return `${baseClasses} bg-cyan-500/30 text-cyan-300`;
    }
    return `${baseClasses} bg-gray-700/50 hover:bg-gray-600/50 text-gray-400`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-orbitron text-cyan-400">Reminders</h3>
      <form onSubmit={handleSubmit}>
        <div className="p-1 bg-gray-900/50 rounded-lg flex space-x-1 mb-3">
          <button type="button" onClick={() => setMethod('Email')} className={getButtonClasses('Email')}>
            <EmailIcon className="w-5 h-5 mr-2" /> Email
          </button>
          <button type="button" onClick={() => setMethod('SMS')} className={getButtonClasses('SMS')}>
            <SmsIcon className="w-5 h-5 mr-2" /> SMS
          </button>
        </div>
        <div>
          <label htmlFor="contactInfo" className="sr-only">{method === 'Email' ? 'Email Address' : 'Phone Number'}</label>
          <input
            id="contactInfo"
            type={method === 'Email' ? 'email' : 'tel'}
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder={method === 'Email' ? 'your@email.com' : '+1234567890'}
            required
            className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
          />
        </div>
        <button type="submit" className="w-full mt-3 text-sm py-2 px-4 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors">
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default ReminderSettings;