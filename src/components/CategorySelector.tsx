import React, { useState, useEffect } from 'react';
import { ProductCategory, ProductProgress, ModelCode } from '../types';
import { ProgressBar } from './ProgressBar';
import { ArrowLeft, RotateCcw, ImageOff, Download, Check } from 'lucide-react';
import { productGroups } from '../data/productGroups';
import { supabase } from '../lib/supabase';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DatasheetPDF from './DatasheetPDF';
import { calculatePrice, ENABLE_PRICING } from '../config/pricing';

interface CategorySelectorProps {
  category: ProductCategory | null;
  progress: number;
  onSelect: (category: ProductCategory, value: string) => void;
  onReset: () => void;
  onBack: () => void;
  currentProgress: ProductProgress[];
  modelCodes: ModelCode[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  progress,
  onSelect,
  onReset,
  onBack,
  currentProgress,
  modelCodes,
}) => {
  const [customValue, setCustomValue] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(['Z']);
  const [error, setError] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [productImageError, setProductImageError] = useState(false);
  const [signedLogoUrl, setSignedLogoUrl] = useState<string | null>(null);
  const [signedProductImageUrl, setSignedProductImageUrl] = useState<string | null>(null);
  const [isPdfReady, setIsPdfReady] = useState(false);

  useEffect(() => {
    // Initialize selectedValues if we're returning to a multi-select category
    if (category?.isMultiSelect) {
      const existingValue = currentProgress.find(p => p.category === category.label)?.value;
      if (existingValue) {
        setSelectedValues(existingValue.split(',').map(v => v.trim()));
      } else {
        setSelectedValues(['Z']);
      }
    }
  }, [category, currentProgress]);

  useEffect(() => {
    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });
    };

    const fetchImages = async () => {
      try {
        setLogoError(false);
        setProductImageError(false);

        const { data: logoData, error: logoError } = await supabase.storage
          .from('assets')
          .getPublicUrl('acez-logo.png');
        
        if (logoError) {
          console.error('Error fetching logo:', logoError);
          setLogoError(true);
        } else if (logoData) {
          try {
            await loadImage(logoData.publicUrl);
            setLogoUrl(logoData.publicUrl);
            setSignedLogoUrl(logoData.publicUrl);
          } catch (error) {
            console.error('Logo image failed to load');
            setLogoError(true);
          }
        }

        if (!category && currentProgress[0]?.value) {
          const productGroup = productGroups.find(g => g.name === currentProgress[0].value);
          if (productGroup?.imageUrl) {
            const { data: productData, error: productError } = await supabase.storage
              .from('products')
              .getPublicUrl(productGroup.imageUrl);
            
            if (productError) {
              console.error('Error fetching product image:', productError);
              setProductImageError(true);
            } else if (productData) {
              try {
                await loadImage(productData.publicUrl);
                setProductImageUrl(productData.publicUrl);
                setSignedProductImageUrl(productData.publicUrl);
              } catch (error) {
                console.error('Product image failed to load');
                setProductImageError(true);
              }
            }
          }
        }
        
        setIsPdfReady(true);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLogoError(true);
        setProductImageError(true);
        setIsPdfReady(true);
      }
    };

    fetchImages();
  }, [category, currentProgress]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category?.id === 'sheath-length' || category?.id === 'immersion-length' || 
        category?.id === 'extension-wire-length' || category?.id === 'flexible-armour-length' ||
        category?.id === 'protection-tube-length' || category?.id === 'extension-tube-length' ||
        category?.id === 'u-length') {
      // Validate length input
      const numericValue = Number(customValue);
      if (isNaN(numericValue) || !Number.isInteger(numericValue) || numericValue <= 0) {
        setError('Please enter a valid positive whole number');
        return;
      }
    }
    
    if (customValue.trim() && category) {
      onSelect(category, customValue);
      setCustomValue('');
      setError(null);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomValue(value);
    
    if (category?.id === 'sheath-length' || category?.id === 'immersion-length' || 
        category?.id === 'extension-wire-length' || category?.id === 'flexible-armour-length' ||
        category?.id === 'protection-tube-length' || category?.id === 'extension-tube-length' ||
        category?.id === 'u-length') {
      const numericValue = Number(value);
      if (value && (isNaN(numericValue) || !Number.isInteger(numericValue) || numericValue <= 0)) {
        setError('Please enter a valid positive whole number');
      } else {
        setError(null);
      }
    }
  };

  const handleCheckboxChange = (value: string) => {
    if (!category) return;

    let newValues: string[];
    if (value === 'Z') {
      // If "None" is selected, clear all other selections
      newValues = ['Z'];
    } else {
      // Remove "None" if it was previously selected
      const currentValues = selectedValues.filter(v => v !== 'Z');
      
      if (currentValues.includes(value)) {
        // If value is already selected, remove it
        newValues = currentValues.filter(v => v !== value);
      } else {
        // Add the new value
        newValues = [...currentValues, value];
      }
      
      // If no values are selected, default to "None"
      if (newValues.length === 0) {
        newValues = ['Z'];
      }
    }
    
    setSelectedValues(newValues);
  };

  const handleMultiSelectSubmit = () => {
    if (category) {
      // Sort the values to maintain consistent order
      const sortedValues = selectedValues.sort();
      onSelect(category, sortedValues.join(','));
    }
  };

  const handleSelect = (value: string) => {
    if (category) {
      onSelect(category, value);
    }
  };

  const getDescription = (category: string, value: string): string => {
    if (!currentProgress[0]?.value) return value;
    
    const group = productGroups.find(g => g.name === currentProgress[0].value);
    if (!group) return value;

    const categoryData = group.categories.find(c => c.label === category);
    if (!categoryData) return value;

    if (categoryData.isCustom) return value;

    if (categoryData.isMultiSelect && value.includes(',')) {
      return value.split(',').map(v => {
        const option = categoryData.options?.find(opt => opt.value === v.trim());
        return option?.label || v.trim();
      }).join(', ');
    }

    const option = categoryData.options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  if (!category) {
    const productGroup = currentProgress[0]?.value;
    let productName = '';
    let productDescription = '';
    let productFeatures: string[] = [];
    let productApplications: string[] = [];
    
    if (productGroup === 'AS-SLT-2010') {
      productName = 'Explosion-Proof Temperature Sensor Assembly';
      productDescription = 'Acez Model AS-SLT-2010 Explosion-Proof Temperature Sensor is the ideal product for hazardous temperature measurement applications. A wide variety of possible combinations of sensor, connection head, insertion length, extension nipple length, connection to thermowell etc. are available for the thermometers; suitable for almost any thermowell dimension.';
      productFeatures = [
        'IECEx/ATEX and CSA approved',
        'Customised fabrication according to customer specifications',
        'For mounting in thermowells',
        'Spring-loaded measuring insert (replaceable sensor)'
      ];
      productApplications = [
        'Chemical and petrochemical industries',
        'Machinery, plant and tank measurement',
        'Oil and gas industries',
        'Power and utilities',
        'Pulp and paper',
        'Explosive process environments',
        'Offshore HVAC monitoring'
      ];
    } else if (productGroup === 'AS-WT-2010') {
      productName = 'Explosion-Proof Thermowell Assembly';
      productDescription = 'Acez Model AS-WT-2010 Explosion-Proof Thermowell Assembly is designed for hazardous area temperature measurement applications where process isolation is required. Available in various materials, process connections, and immersion lengths to suit a wide range of industrial applications and process requirements.';
      productFeatures = [
        'IECEx/ATEX and CSA approved',
        'Multiple thermowell designs (straight, tapered, stepped)',
        'Various process connection options',
        'High-quality materials for corrosive environments',
        'Compatible with explosion-proof connection heads'
      ];
      productApplications = [
        'Chemical and petrochemical industries',
        'Oil and gas processing',
        'Refineries',
        'Power generation',
        'High-pressure applications',
        'Corrosive environments',
        'Hazardous area installations'
      ];
    } else if (productGroup === 'TE-SERIES' || productGroup === 'TE20/21/22-SERIES') {
      const sensorConstruction = currentProgress.find(item => item.category === 'Sensor Construction')?.value;
      if (sensorConstruction === 'TE20') {
        productName = 'Fixed Type Temperature Sensor';
      } else if (sensorConstruction === 'TE21') {
        productName = 'Spring Loaded Type Temperature Sensor (Base Plate)';
      } else if (sensorConstruction === 'TE22') {
        productName = 'Spring Loaded Type Temperature Sensor (Hexagonal)';
      }
      productDescription = `Acez ${sensorConstruction} Temperature Sensor is designed for industrial temperature measurement applications with high accuracy and reliability. Available with a wide range of sensor types, connection heads, and mounting options to suit various industrial requirements and process connections.`;
      productFeatures = [
        'Weatherproof design with IP68 rated connection heads',
        'High accuracy temperature measurement',
        'Customizable sheath length and diameter',
        'Compatible with various mounting connections',
        'Optional compression fittings available'
      ];
      productApplications = [
        'Process industries',
        'Furnaces',
        'Water treatment facilities',
        'Power generation',
        'Manufacturing processes'
      ];
    } else if (productGroup === 'TE11-TC') {
      productName = 'Thermocouple Sensor';
      productDescription = 'Acez TE11-TC Thermocouple Sensor is designed for versatile temperature measurement applications requiring high accuracy and reliability. Available with multiple thermocouple types, connection styles, and customizable configurations to meet specific industrial requirements.';
      productFeatures = [
        'Multiple thermocouple types (K, J, T, E)',
        'Various sheath diameters and materials',
        'Customizable sheath length',
        'Multiple connection styles and termination options',
        'Optional flexible armour and compression fittings',
        'Various wire insulation options for different environments'
      ];
      productApplications = [
        'Process industries',
        'Laboratory and research facilities',
        'Food and beverage processing',
        'Automotive testing',
        'HVAC systems',
        'Plastics and rubber manufacturing',
        'General industrial temperature measurement'
      ];
    } else if (productGroup === 'TE11-RTD') {
      productName = 'RTD Temperature Sensor';
      productDescription = 'Acez TE11-RTD Temperature Sensor is designed for precision temperature measurement applications requiring high stability and accuracy. Available with various connection styles, wire configurations, and customizable options to meet specific industrial requirements.';
      productFeatures = [
        'High accuracy PT100 RTD elements',
        'Multiple accuracy classes available (Class A, Class B, 1/3 DIN, 1/5 DIN)',
        'Various sheath diameters and materials',
        'Customizable sheath length',
        'Single and dual element configurations',
        'Multiple connection styles and termination options',
        'Optional flexible armour and compression fittings'
      ];
      productApplications = [
        'Precision temperature measurement',
        'Laboratory and research facilities',
        'Food and pharmaceutical processing',
        'HVAC systems',
        'Process industries',
        'Environmental monitoring',
        'Medical equipment',
        'Calibration systems'
      ];
    } else if (productGroup === 'TE30') {
      productName = 'Sensor Assembly With Protection Pipe/Tube Thermowell';
      productDescription = 'Acez TE30 Sensor Assembly With Protection Pipe/Tube Thermowell is designed for industrial temperature measurement applications where a simple, cost-effective solution is required. Available with various sensor types, protection tubes, and customizable configurations to meet specific industrial requirements.';
      productFeatures = [
        'Ideal for application where pressure and flow are not major concern',
        'Economy installation',
        'Cost is generally lower than drilled bar stock thermowell and longer length is applicable',
        'Various protection tube options (tubing or pipe)',
        'Multiple process connection options'
      ];
      productApplications = [
        'Process industries',
        'HVAC systems',
        'Water treatment facilities',
        'Food and beverage processing',
        'General industrial temperature measurement',
        'Low pressure applications'
      ];
    } else if (productGroup === 'TW511') {
      productName = 'Flanged Thermowell';
      productDescription = 'Acez TW511 Flanged Thermowell is designed for high-pressure and high-temperature applications where robust process isolation is required. Available with various flange types, pressure classes, and materials to suit a wide range of industrial applications and process requirements.';
      productFeatures = [
        'High-pressure capability up to Class 2500',
        'Multiple flange face options (RF, RTJ)',
        'Various material options for corrosive environments',
        'Tapered stem design for improved strength',
        'Full penetration or sealed weld options',
        'Customizable insertion length'
      ];
      productApplications = [
        'Refineries and petrochemical plants',
        'Power generation facilities',
        'High-pressure steam systems',
        'Chemical processing',
        'Offshore oil and gas platforms',
        'High-temperature applications',
        'Corrosive process environments'
      ];
    } else if (productGroup === 'TW512') {
      productName = 'Threaded or Welded Thermowell';
      productDescription = 'Acez TW512 Threaded or Welded Thermowell is designed for industrial temperature measurement applications where process isolation is required. Available with various process connections, materials, and customizable configurations to meet specific industrial requirements.';
      productFeatures = [
        'Multiple process connection options (threaded or welded)',
        'Various material options for different environments',
        'Multiple stem designs (tapered, straight, stepped)',
        'Customizable insertion length',
        'Standard 1/2" NPT instrument connection',
        'Cost-effective solution for standard applications'
      ];
      productApplications = [
        'Process industries',
        'Chemical processing',
        'Power generation',
        'Oil and gas processing',
        'Food and beverage processing',
        'Water treatment facilities',
        'HVAC systems'
      ];
    }

    const currentDate = new Date().toLocaleDateString('en-GB');
    const currentYear = new Date().getFullYear();

    // Calculate price if enabled
    const totalPrice = ENABLE_PRICING ? calculatePrice(
      productGroup,
      currentProgress.map(item => ({ category: item.category, value: item.value }))
    ) : 0;

    // For TE-SERIES, use the sensor construction value as the product group in the model code
    const isTESeries = productGroup === 'TE-SERIES' || productGroup === 'TE20/21/22-SERIES';
    const sensorConstruction = isTESeries ? 
      currentProgress.find(item => item.category === 'Sensor Construction')?.value : null;
    
    // Generate model code string with the appropriate prefix for TE series
    let modelCodeString = '';
    if (modelCodes.length > 0) {
      if (isTESeries && sensorConstruction) {
        // For TE series, use the sensor construction (TE20, TE21, TE22) as prefix
        modelCodeString = `${sensorConstruction}-${modelCodes.slice(1).map(mc => mc.code).join('-')}`;
      } else {
        // For other product groups, include the product group as prefix
        modelCodeString = `${productGroup}-${modelCodes.map(mc => mc.code).join('-')}`;
      }
    }

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Selection Complete</h2>
            <div className="flex gap-3">
              <button
                onClick={onReset}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Start over
              </button>
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                One step back
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <ProgressBar progress={100} />
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col items-center">
              {logoUrl && !logoError ? (
                <img 
                  src={logoUrl}
                  alt="Acez Sensing" 
                  className="h-10 md:h-12 mb-6 md:mb-8 object-contain"
                />
              ) : (
                <div className="h-10 md:h-12 mb-6 md:mb-8 flex items-center text-gray-400">
                  <ImageOff className="w-6 h-6" />
                </div>
              )}
              
              {productImageUrl && !productImageError ? (
                <>
                  <img 
                    src={productImageUrl}
                    alt={productGroup} 
                    className="h-48 md:h-64 object-contain"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    * This image is for general representation of the product group only
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="h-48 md:h-64 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-gray-400 flex flex-col items-center">
                      <ImageOff className="w-10 h-10 md:w-12 md:h-12 mb-2" />
                      <span className="text-sm text-center">Product image not available</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    * Product image would be for general representation only
                  </p>
                </div>
              )}
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {isTESeries ? sensorConstruction : productGroup}
              </h3>
              {productName && (
                <p className="text-lg md:text-xl font-semibold text-gray-700">{productName}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Model Code</h3>
              <div className="p-3 md:p-4 rounded-lg overflow-x-auto">
                <div className="whitespace-nowrap font-medium text-gray-900">
                  {modelCodeString}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-3">
                {currentProgress.map((item, index) => (
                  index > 0 && (
                    <React.Fragment key={item.category}>
                      <div className="font-semibold text-gray-900">{item.category}:</div>
                      <div className="text-gray-700">
                        {item.value.includes(',') 
                          ? item.value.split(',').map(v => getDescription(item.category, v)).join(', ')
                          : getDescription(item.category, item.value)}
                      </div>
                    </React.Fragment>
                  )
                ))}
              </div>
            </div>

            {ENABLE_PRICING && totalPrice > 0 && (
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Estimated Price</h3>
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  SGD {totalPrice.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * This is an estimated price. Please contact us at sensing_techsupport@acez.com.sg or call +65 6265 1588 for accurate pricing, bulk discount and availability.
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 mb-6">{productDescription}</p>
              
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              <ul className="list-disc list-inside mb-6 space-y-2">
                {productFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
              
              <h4 className="font-semibold text-gray-900 mb-3">Applications:</h4>
              <ul className="list-disc list-inside space-y-2">
                {productApplications.map((application, index) => (
                  <li key={index} className="text-gray-700">{application}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 md:mt-8">
              {isPdfReady && (
                <PDFDownloadLink
                  document={
                    <DatasheetPDF
                      progress={currentProgress}
                      modelCodes={modelCodes}
                      logoUrl={signedLogoUrl}
                      productImageUrl={signedProductImageUrl}
                    />
                  }
                  fileName={`${modelCodeString}-datasheet.pdf`}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  {({ loading }) => (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      {loading ? 'Generating PDF...' : 'Download Datasheet PDF'}
                    </>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Important Notice: Acez reserves the right to make changes to or discontinue any product or service identified in this publication without notice. Acez advises its customers to obtain the latest version of the relevant information to verify, before placing any orders, that the information being relied upon is current.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{category.label}</h2>
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
      </div>

      {category.isCustom ? (
        <form onSubmit={handleCustomSubmit} className="space-y-4">
          <div>
            <label htmlFor="customValue" className="block text-sm font-medium text-gray-700 mb-1">
              {category.placeholder || `Enter ${category.label}`}
            </label>
            <input
              type="text"
              id="customValue"
              value={customValue}
              onChange={handleCustomChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={category.placeholder || `Enter value for ${category.label}`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={!customValue.trim() || !!error}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      ) : category.isMultiSelect ? (
        <div className="space-y-4">
          <div className="space-y-3">
            {category.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => handleCheckboxChange(option.value)}
                className={`flex items-center justify-between w-full p-4 rounded-lg border transition-colors ${
                  selectedValues.includes(option.value)
                    ? 'border-red-500 bg-red-50 hover:bg-red-100'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.value}</div>
                </div>
                <div className={`w-5 h-5 border rounded flex items-center justify-center ${
                  selectedValues.includes(option.value)
                    ? 'bg-red-600 border-red-600'
                    : 'border-gray-300'
                }`}>
                  {selectedValues.includes(option.value) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleMultiSelectSubmit}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {category.options?.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.value)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.value}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};