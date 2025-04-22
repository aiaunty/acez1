import React from 'react';
import { ProductGroup } from '../types';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface ProductSelectorProps {
  groups: ProductGroup[];
  selectedGroup: ProductGroup | null;
  progress: number;
  onSelectGroup: (group: ProductGroup) => void;
  onReset: () => void;
  onBack: () => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  groups,
  progress,
  onSelectGroup,
  onReset,
  onBack,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Choose a group</h2>
        <div className="flex space-x-4">
          <button
            onClick={onReset}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Start over
          </button>
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            One step back
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <ProgressBar progress={progress} />
        <div className="text-right mt-1 text-sm text-gray-600">{progress}%</div>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-900">{group.name}</div>
            <div className="text-sm text-gray-500">{group.id}</div>
          </button>
        ))}
      </div>
    </div>
  );
};