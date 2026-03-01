import React, { useEffect } from 'react';

export default function Alert({ message, type = 'info', onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  }[type];

  return (
    <div className={`border rounded p-4 mb-4 ${bgColor}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-sm font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
