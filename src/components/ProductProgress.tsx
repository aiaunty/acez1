import React from 'react';
import { ProductProgress, ModelCode } from '../types';
import { CheckCircle } from 'lucide-react';
import { productGroups } from '../data/productGroups';

interface ProductProgressListProps {
  progress: ProductProgress[];
  modelCodes: ModelCode[];
}

export const ProductProgressList: React.FC<ProductProgressListProps> = ({ progress, modelCodes }) => {
  // For TE-SERIES, use the sensor construction value as the product group in the model code
  const isTESeries = progress[0]?.value === 'TE-SERIES' || progress[0]?.value === 'TE20/21/22-SERIES';
  const sensorConstruction = isTESeries ? 
    progress.find(item => item.category === 'Sensor Construction')?.value : null;
  
  // Generate model code string with the appropriate prefix for TE series
  let modelCodeString = '';
  if (modelCodes.length > 0) {
    if (isTESeries && sensorConstruction) {
      // For TE series, use the sensor construction (TE20, TE21, TE22) as prefix
      modelCodeString = `${sensorConstruction}-${modelCodes.slice(1).map(mc => mc.code).join('-')}`;
    } else {
      // For other product groups, include the product group as prefix
      modelCodeString = `${progress[0]?.value}-${modelCodes.map(mc => mc.code).join('-')}`;
    }
  }

  const getDescription = (category: string, value: string): string => {
    if (!progress[0]?.value) return value;
    
    const group = productGroups.find(g => g.name === progress[0].value);
    if (!group) return value;

    const categoryData = group.categories.find(c => c.label === category);
    if (!categoryData) return value;

    if (categoryData.isCustom) return value;

    const option = categoryData.options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Your datasheet progress</h2>
      <div className="space-y-4">
        {progress.map((item) => (
          <div key={item.category} className="flex items-start gap-3 group">
            <div className="flex-shrink-0 mt-1">
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-full transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-red-500 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-full"></div>
                )}
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-900 mb-0.5">{item.category}</div>
              <div className="text-sm text-gray-600 break-words leading-relaxed">
                {getDescription(item.category, item.value)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {modelCodes.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Model Code</h3>
          <div className="p-3 rounded-lg overflow-x-auto">
            <div className="whitespace-nowrap font-medium text-gray-900">
              {modelCodeString}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};