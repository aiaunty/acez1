import React from 'react';
import { useState, useEffect } from 'react';
import { ProductGroup, ProductProgress, ProductCategory, ModelCode } from '../types';
import { productGroups } from '../data/productGroups';
import { ProductProgressList } from '../components/ProductProgress';
import { ProductSelector } from '../components/ProductSelector';
import { CategorySelector } from '../components/CategorySelector';
import { supabase } from '../lib/supabase';
import { LogOut, ImageOff } from 'lucide-react';

export default function DatasheetBuilder() {
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup | null>(null);
  const [progress, setProgress] = useState<ProductProgress[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
  const [modelCodes, setModelCodes] = useState<ModelCode[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setLogoError(false);
        const { data: logoData, error: logoError } = await supabase.storage
          .from('assets')
          .getPublicUrl('acezgroup-logo.png');
        
        if (logoError) {
          console.error('Error fetching logo:', logoError);
          setLogoError(true);
        } else if (logoData) {
          setLogoUrl(logoData.publicUrl);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
        setLogoError(true);
      }
    };

    fetchLogo();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSelectGroup = (group: ProductGroup) => {
    setSelectedGroup(group);
    setProgress([
      {
        category: 'Product group',
        value: group.name,
        completed: true,
      },
    ]);
    setCurrentCategoryIndex(0);
    setCompletionPercentage(Math.floor(100 / (group.categories.length + 1)));
  };

  const handleSelectCategory = (category: ProductCategory, value: string) => {
    if (!selectedGroup) return;

    // Format value based on category type
    let formattedValue = value;
    if (category.id === 'sheath-length' || category.id === 'immersion-length' || 
        category.id === 'extension-wire-length' || category.id === 'flexible-armour-length') {
      formattedValue = value.padStart(4, '0');
    }

    const newProgress = [...progress];
    newProgress.push({
      category: category.label,
      value: formattedValue,
      completed: true,
    });

    setProgress(newProgress);
    setModelCodes([...modelCodes, { category: category.id, code: formattedValue }]);
    
    // Special handling for different product groups
    if (selectedGroup.id === 'AS-WT-2010') {
      // Skip Mounting Connection if Connection Head is Z
      if (category.id === 'connection-head' && value !== 'Z') {
        const mountingConnectionIndex = selectedGroup.categories.findIndex(c => c.id === 'mounting-connection');
        if (mountingConnectionIndex > -1) {
          const nextIndex = currentCategoryIndex + 2;
          setCurrentCategoryIndex(nextIndex);
          setCompletionPercentage(Math.floor(((newProgress.length + 1) / (selectedGroup.categories.length + 1)) * 100));
          return;
        }
      }
    } else if (selectedGroup.id === 'TE20/21/22-SERIES') {
      // Special handling for TE-SERIES
      // If Sensor Construction is selected, update the first model code
      if (category.id === 'sensor-construction') {
        setModelCodes(prev => {
          const newCodes = [...prev];
          // Replace the product group code with the sensor construction value
          newCodes[0] = { category: 'product-group', code: formattedValue };
          return newCodes;
        });
      }
      
      // Skip Compression Fitting if Additional Options is not X1
      if (category.id === 'additional-options' && value !== 'X1') {
        const compressionFittingIndex = selectedGroup.categories.findIndex(c => c.id === 'compression-fitting');
        if (compressionFittingIndex > -1) {
          const nextIndex = currentCategoryIndex + 2;
          setCurrentCategoryIndex(nextIndex);
          setCompletionPercentage(Math.floor(((newProgress.length + 1) / (selectedGroup.categories.length + 1)) * 100));
          return;
        }
      }
      
      // Skip Mounting Connection if Connection Head is not Z
      if (category.id === 'connection-head' && value !== 'Z') {
        const mountingConnectionIndex = selectedGroup.categories.findIndex(c => c.id === 'mounting-connection');
        if (mountingConnectionIndex > -1) {
          const nextIndex = currentCategoryIndex + 2;
          setCurrentCategoryIndex(nextIndex);
          setCompletionPercentage(Math.floor(((newProgress.length + 1) / (selectedGroup.categories.length + 1)) * 100));
          return;
        }
      }
    } else if (selectedGroup.id === 'TE11-TC' || selectedGroup.id === 'TE11-RTD') {
      // Special handling for TE11-TC and TE11-RTD
      // Skip Flexible Armour Size and Length if Additional Options is not X3
      if (category.id === 'additional-options' && value !== 'X3' && value !== 'U') {
        const flexibleArmourSizeIndex = selectedGroup.categories.findIndex(c => c.id === 'flexible-armour-size');
        const flexibleArmourLengthIndex = selectedGroup.categories.findIndex(c => c.id === 'flexible-armour-length');
        
        if (flexibleArmourSizeIndex > -1 && flexibleArmourLengthIndex > -1) {
          // Skip both fields
          const nextIndex = currentCategoryIndex + 3;
          setCurrentCategoryIndex(nextIndex);
          setCompletionPercentage(Math.floor(((newProgress.length + 1) / (selectedGroup.categories.length + 1)) * 100));
          return;
        }
      }
      
      // Skip Compression Fitting if Additional Options is not X2
      if (category.id === 'additional-options' && value !== 'X2' && value !== 'U') {
        const compressionFittingIndex = selectedGroup.categories.findIndex(c => c.id === 'compression-fitting');
        if (compressionFittingIndex > -1) {
          const nextIndex = currentCategoryIndex + 1;
          setCurrentCategoryIndex(nextIndex);
          setCompletionPercentage(Math.floor(((newProgress.length + 1) / (selectedGroup.categories.length + 1)) * 100));
          return;
        }
      }
    } else {
      // Original AS-SLT-2010 logic
      if (category.id === 'connection-head' && value !== 'Z') {
        const mountingConnectionIndex = selectedGroup.categories.findIndex(c => c.id === 'mounting-connection');
        if (mountingConnectionIndex > -1) {
          const nextIndex = currentCategoryIndex + 2;
          setCurrentCategoryIndex(nextIndex);
          setCompletionPercentage(Math.floor(((newProgress.length + 1) / (selectedGroup.categories.length + 1)) * 100));
          return;
        }
      }
    }

    const nextCategoryIndex = currentCategoryIndex + 1;
    setCurrentCategoryIndex(nextCategoryIndex);
    
    const totalSteps = selectedGroup.categories.length + 1;
    const completedSteps = newProgress.length;
    setCompletionPercentage(Math.floor((completedSteps / totalSteps) * 100));
  };

  const handleReset = () => {
    setSelectedGroup(null);
    setProgress([]);
    setCompletionPercentage(0);
    setCurrentCategoryIndex(-1);
    setModelCodes([]);
  };

  const handleBack = () => {
    if (currentCategoryIndex > -1) {
      const newProgress = [...progress];
      newProgress.pop();
      setProgress(newProgress);
      
      const newModelCodes = [...modelCodes];
      newModelCodes.pop();
      setModelCodes(newModelCodes);

      if (selectedGroup?.id === 'AS-WT-2010') {
        // Handle going back from a category after Connection Head Z for AS-WT-2010
        const lastCategory = selectedGroup?.categories[currentCategoryIndex - 1];
        const previousCategory = selectedGroup?.categories[currentCategoryIndex - 2];
        if (lastCategory?.id === 'mounting-connection' && previousCategory?.id === 'connection-head') {
          const connectionHeadValue = progress.find(p => p.category === 'Connection Head')?.value;
          if (connectionHeadValue !== 'Z') {
            setCurrentCategoryIndex(currentCategoryIndex - 2);
          } else {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
          }
        } else {
          setCurrentCategoryIndex(currentCategoryIndex - 1);
        }
      } else if (selectedGroup?.id === 'TE20/21/22-SERIES') {
        const lastCategory = selectedGroup?.categories[currentCategoryIndex - 1];
        const previousCategory = selectedGroup?.categories[currentCategoryIndex - 2];
        
        // Handle going back from a category after Additional Options X1
        if (lastCategory?.id === 'compression-fitting') {
          const additionalOptionsValue = progress.find(p => p.category === 'Additional Options')?.value;
          if (additionalOptionsValue !== 'X1') {
            setCurrentCategoryIndex(currentCategoryIndex - 2);
          } else {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
          }
        } 
        // Handle going back from a category after Connection Head Z
        else if (lastCategory?.id === 'mounting-connection') {
          const connectionHeadValue = progress.find(p => p.category === 'Connection Head')?.value;
          if (connectionHeadValue !== 'Z') {
            setCurrentCategoryIndex(currentCategoryIndex - 2);
          } else {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
          }
        } else {
          setCurrentCategoryIndex(currentCategoryIndex - 1);
        }
      } else if (selectedGroup?.id === 'TE11-TC' || selectedGroup?.id === 'TE11-RTD') {
        const lastCategory = selectedGroup?.categories[currentCategoryIndex - 1];
        
        // Handle going back from Compression Fitting
        if (lastCategory?.id === 'compression-fitting') {
          const additionalOptionsValue = progress.find(p => p.category === 'Additional Option')?.value;
          if (additionalOptionsValue !== 'X2' && additionalOptionsValue !== 'U') {
            setCurrentCategoryIndex(currentCategoryIndex - 2);
          } else {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
          }
        }
        // Handle going back from Flexible Armour Size or Length
        else if (lastCategory?.id === 'flexible-armour-size' || lastCategory?.id === 'flexible-armour-length') {
          const additionalOptionsValue = progress.find(p => p.category === 'Additional Option')?.value;
          if (additionalOptionsValue !== 'X3' && additionalOptionsValue !== 'U') {
            // Skip back to Additional Options
            const additionalOptionsIndex = selectedGroup.categories.findIndex(c => c.id === 'additional-options');
            setCurrentCategoryIndex(additionalOptionsIndex);
          } else {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
          }
        } else {
          setCurrentCategoryIndex(currentCategoryIndex - 1);
        }
      } else {
        // Original AS-SLT-2010 logic
        const lastCategory = selectedGroup?.categories[currentCategoryIndex - 1];
        const previousCategory = selectedGroup?.categories[currentCategoryIndex - 2];
        if (lastCategory?.id === 'mounting-connection' && previousCategory?.id === 'connection-head') {
          const connectionHeadValue = progress.find(p => p.category === previousCategory.label)?.value;
          if (connectionHeadValue !== 'Z') {
            setCurrentCategoryIndex(currentCategoryIndex - 2);
          } else {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
          }
        } else {
          setCurrentCategoryIndex(currentCategoryIndex - 1);
        }
      }
      
      const totalSteps = selectedGroup?.categories.length ?? 0 + 1;
      const completedSteps = newProgress.length;
      setCompletionPercentage(Math.floor((completedSteps / totalSteps) * 100));
    }
  };

  const getCurrentCategory = () => {
    if (!selectedGroup || currentCategoryIndex === -1) return null;
    
    if (selectedGroup.id === 'AS-WT-2010') {
      // Check if we need to skip Mounting Connection based on Connection Head for AS-WT-2010
      if (currentCategoryIndex > 0) {
        const previousCategory = selectedGroup.categories[currentCategoryIndex - 1];
        if (previousCategory.id === 'connection-head') {
          const connectionHeadValue = progress.find(p => p.category === previousCategory.label)?.value;
          if (connectionHeadValue !== 'Z') {
            return selectedGroup.categories[currentCategoryIndex + 1] || null;
          }
        }
      }
    } else if (selectedGroup.id === 'TE20/21/22-SERIES') {
      // Check if we need to skip Mounting Connection based on Connection Head
      if (currentCategoryIndex > 0) {
        const previousCategory = selectedGroup.categories[currentCategoryIndex - 1];
        if (previousCategory.id === 'connection-head') {
          const connectionHeadValue = progress.find(p => p.category === previousCategory.label)?.value;
          if (connectionHeadValue !== 'Z') {
            return selectedGroup.categories[currentCategoryIndex + 1] || null;
          }
        }
        
        // Check if we need to skip Compression Fitting based on Additional Options
        if (previousCategory.id === 'additional-options') {
          const additionalOptionsValue = progress.find(p => p.category === previousCategory.label)?.value;
          if (additionalOptionsValue !== 'X1') {
            return null; // Skip Compression Fitting if Additional Options is not X1
          }
        }
      }
    } else if (selectedGroup.id === 'TE11-TC' || selectedGroup.id === 'TE11-RTD') {
      // Check if we need to skip fields based on Additional Options
      if (currentCategoryIndex > 0) {
        const previousCategory = selectedGroup.categories[currentCategoryIndex - 1];
        
        // Handle Flexible Armour Size and Length visibility
        if (previousCategory.id === 'additional-options') {
          const additionalOptionsValue = progress.find(p => p.category === previousCategory.label)?.value;
          
          // If we're at Flexible Armour Size or Length index
          if (selectedGroup.categories[currentCategoryIndex].id === 'flexible-armour-size' || 
              selectedGroup.categories[currentCategoryIndex].id === 'flexible-armour-length') {
            if (additionalOptionsValue !== 'X3' && additionalOptionsValue !== 'U') {
              // Skip to Compression Fitting or next available category
              const compressionFittingIndex = selectedGroup.categories.findIndex(c => c.id === 'compression-fitting');
              if (compressionFittingIndex > -1) {
                if (additionalOptionsValue === 'X2' || additionalOptionsValue === 'U') {
                  return selectedGroup.categories[compressionFittingIndex];
                } else {
                  return null; // Skip both Flexible Armour and Compression Fitting
                }
              } else {
                return null;
              }
            }
          }
          
          // If we're at Compression Fitting index
          if (selectedGroup.categories[currentCategoryIndex].id === 'compression-fitting') {
            if (additionalOptionsValue !== 'X2' && additionalOptionsValue !== 'U') {
              return null; // Skip Compression Fitting
            }
          }
        }
      }
    } else {
      // Original AS-SLT-2010 logic
      if (currentCategoryIndex > 0) {
        const previousCategory = selectedGroup.categories[currentCategoryIndex - 1];
        if (previousCategory.id === 'connection-head') {
          const connectionHeadValue = progress.find(p => p.category === previousCategory.label)?.value;
          if (connectionHeadValue !== 'Z') {
            return selectedGroup.categories[currentCategoryIndex + 1] || null;
          }
        }
      }
    }
    
    return selectedGroup.categories[currentCategoryIndex] || null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          {logoUrl && !logoError ? (
            <img 
              src={logoUrl}
              alt="Acez Group" 
              className="h-10 md:h-12 object-contain"
            />
          ) : (
            <div className="h-10 md:h-12 flex items-center text-gray-400">
              <ImageOff className="w-6 h-6" />
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-4">
          <div className="order-2 lg:order-1">
            <ProductProgressList 
              progress={progress}
              modelCodes={modelCodes} 
            />
          </div>
          <div className="order-1 lg:order-2">
            {!selectedGroup ? (
              <ProductSelector
                groups={productGroups}
                selectedGroup={selectedGroup}
                progress={completionPercentage}
                onSelectGroup={handleSelectGroup}
                onReset={handleReset}
                onBack={handleBack}
              />
            ) : (
              <CategorySelector
                category={getCurrentCategory()}
                progress={completionPercentage}
                onSelect={handleSelectCategory}
                onReset={handleReset}
                onBack={handleBack}
                currentProgress={progress}
                modelCodes={modelCodes}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}