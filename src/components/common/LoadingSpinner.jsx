import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'blue',
  message,
  ...spinProps 
}) => {
  const sizeMap = {
    small: 'small',
    medium: 'default',
    large: 'large'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Spin 
        size={sizeMap[size]} 
        className={colorClasses[color]}
        {...spinProps}
      />
      {message && (
        <p className="mt-3 text-gray-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 flex flex-col items-center space-y-4 min-w-64">
        <LoadingSpinner size="large" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
