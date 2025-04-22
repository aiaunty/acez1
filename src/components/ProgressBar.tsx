import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="absolute -bottom-6 right-0 text-sm text-gray-500 font-medium">
        {progress}%
      </div>
    </div>
  );
};