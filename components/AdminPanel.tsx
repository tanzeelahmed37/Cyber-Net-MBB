import React, { useState, useEffect } from 'react';
import { ConnectionData } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface AdminPanelProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  userData?: ConnectionData;
  onUpdate: (newData: ConnectionData) => void;
  onAdd: (newData: Omit<ConnectionData, 'id'>) => void;
}

const getInitialFormData = (): ConnectionData => ({
  id: '',
  connectionNumber: '',
  status: 'Active',
  balance: 0,
  dataRemainingMB: 51200,
  dataTotalMB: 102400,
  startDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
  expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
});


const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, mode, onClose, userData, onUpdate, onAdd }) => {
  const [formData, setFormData] = useState<ConnectionData>(getInitialFormData());

  useEffect(() => {
    if (mode === 'edit' && userData) {
        setFormData(userData);
    } else {
        setFormData(getInitialFormData());
    }
  }, [userData, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'balance' || name === 'dataRemainingMB' || name === 'dataTotalMB' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit') {
        onUpdate(formData);
    } else {
        const { id, ...newData } = formData;
        onAdd(newData);
    }
  };

  if (!isOpen) return null;

  const isEditMode = mode === 'edit';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-gray-800 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 p-6 relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon />
        </button>
        <h2 className="font-orbitron text-2xl text-cyan-400 mb-2">{isEditMode ? 'Admin Panel' : 'Add New Connection'}</h2>
        <p className="text-sm text-gray-400 mb-6">{isEditMode ? `Editing: ${formData.connectionNumber}` : 'Enter new connection details.'}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="connectionNumber" className="block text-sm font-medium text-gray-300 mb-1">Connection Number</label>
            <input type="text" name="connectionNumber" id="connectionNumber" value={formData.connectionNumber} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" required />
          </div>
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-300 mb-1">Balance ($)</label>
            <input type="number" name="balance" id="balance" value={formData.balance} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" step="0.01" />
          </div>
          <div>
            <label htmlFor="dataRemainingMB" className="block text-sm font-medium text-gray-300 mb-1">Data Remaining (MB)</label>
            <input type="number" name="dataRemainingMB" id="dataRemainingMB" value={formData.dataRemainingMB} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
           <div>
            <label htmlFor="dataTotalMB" className="block text-sm font-medium text-gray-300 mb-1">Data Total (MB)</label>
            <input type="number" name="dataTotalMB" id="dataTotalMB" value={formData.dataTotalMB} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
            <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
            <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
            <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-md shadow-cyan-500/30">
              {isEditMode ? 'Update Data' : 'Add Connection'}
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;