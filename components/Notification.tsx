
import React, { useEffect, useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { BellIcon } from './icons/BellIcon';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 8000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  return (
    <div
      className={`fixed bottom-5 right-5 w-11/12 max-w-sm p-4 rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 bg-gray-800/80 backdrop-blur-lg text-white transform transition-all duration-300 ease-in-out
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5 text-cyan-400">
           <BellIcon />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={handleClose} className="rounded-md inline-flex text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800">
            <span className="sr-only">Close</span>
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
