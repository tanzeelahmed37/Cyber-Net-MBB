import React, { useState, useEffect, useCallback } from 'react';
import { ConnectionData } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Notification from './components/Notification';
import AdminPanel from './components/AdminPanel';

const initialUsersData: ConnectionData[] = [
  {
    id: 'conn1',
    connectionNumber: '0312-3456789',
    status: 'Active',
    balance: 15.5,
    dataRemainingMB: 65536,
    dataTotalMB: 102400,
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString().split('T')[0],
  },
  {
    id: 'conn2',
    connectionNumber: '0300-9876543',
    status: 'Inactive',
    balance: 0,
    dataRemainingMB: 1024,
    dataTotalMB: 51200,
    startDate: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
    expiryDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
  },
    {
    id: 'conn3',
    connectionNumber: '0333-1122334',
    status: 'Active',
    balance: 5.25,
    dataRemainingMB: 92160,
    dataTotalMB: 102400,
    startDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString().split('T')[0],
  },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [adminPanelMode, setAdminPanelMode] = useState<'add' | 'edit' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [reminderPrefs, setReminderPrefs] = useState<Record<string, { contact: string; method: 'Email' | 'SMS' }>>({});
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const [usersData, setUsersData] = useState<ConnectionData[]>(initialUsersData);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(initialUsersData[0].id);

  const selectedConnection = usersData.find(u => u.id === selectedConnectionId) || usersData[0];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  // Simulated backend process for sending reminders
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      usersData.forEach(conn => {
        const dueDate = new Date(conn.dueDate);
        const prefs = reminderPrefs[conn.id];
        if (prefs && dueDate < now) {
            const message = `[${now.toLocaleTimeString()}] Auto-${prefs.method} sent to ${prefs.contact} for ${conn.connectionNumber}: Payment is overdue.`;
            // Avoid adding duplicate messages
            setSentMessages(prev => prev.includes(message.split("] ")[1]) ? prev : [...prev, message]);
        }
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [usersData, reminderPrefs]);

  const handleThemeToggle = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleDataUpdate = useCallback((newData: ConnectionData) => {
    setUsersData(prevData => prevData.map(user => user.id === newData.id ? newData : user));
    setAdminPanelMode(null);
  }, []);

  const handleAddNewConnection = useCallback((newConnection: Omit<ConnectionData, 'id'>) => {
    const newConnWithId = { ...newConnection, id: `conn${Date.now()}` };
    setUsersData(prev => [...prev, newConnWithId]);
    setSelectedConnectionId(newConnWithId.id);
    setAdminPanelMode(null);
  }, []);
  
  const handleReminderSave = useCallback((connectionId: string, contact: string, method: 'Email' | 'SMS') => {
    setReminderPrefs(prev => ({ ...prev, [connectionId]: { contact, method } }));
    setNotification(`Success! Reminders for ${selectedConnection.connectionNumber} will be sent to ${contact} via ${method}.`);
  }, [selectedConnection.connectionNumber]);

  const checkDates = useCallback(() => {
    if (!selectedConnection) return;

    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    const dueDate = new Date(selectedConnection.dueDate);
    const expiryDate = new Date(selectedConnection.expiryDate);

    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
   
    if (daysUntilDue > 0 && daysUntilDue <= 3) {
      setNotification(`Reminder: Your bill of $${selectedConnection.balance.toFixed(2)} is due in ${daysUntilDue} day(s) for ${selectedConnection.connectionNumber}.`);
    } else if (daysUntilExpiry > 0 && daysUntilExpiry <= 3) {
      setNotification(`Warning: Your data plan for ${selectedConnection.connectionNumber} expires in ${daysUntilExpiry} day(s).`);
    } else {
      setNotification(null);
    }
  }, [selectedConnection]);

  useEffect(() => {
    checkDates();
  }, [checkDates]);


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
      <div className="relative z-10">
        <Header 
          theme={theme} 
          onThemeToggle={handleThemeToggle} 
          onAdminClick={() => setAdminPanelMode('edit')} 
        />
        <main className="p-4 sm:p-6 lg:p-8">
          <Dashboard 
            usersData={usersData} 
            selectedConnection={selectedConnection}
            onSelectConnection={setSelectedConnectionId}
            onReminderSave={handleReminderSave}
            onAddConnection={() => setAdminPanelMode('add')}
            systemLogs={sentMessages}
          />
        </main>
        {notification && (
          <Notification 
            message={notification} 
            isVisible={!!notification} 
            onClose={() => setNotification(null)}
          />
        )}
        <AdminPanel 
          isOpen={!!adminPanelMode}
          mode={adminPanelMode || 'edit'}
          onClose={() => setAdminPanelMode(null)}
          userData={adminPanelMode === 'edit' ? selectedConnection : undefined}
          onUpdate={handleDataUpdate}
          onAdd={handleAddNewConnection}
        />
      </div>
    </div>
  );
};

export default App;