import { basePrices } from './index';

// Sheath material prices per mm for TE-SERIES
const sheathMaterialPrices = {
  '1': 0.02, // SS 316 price per mm
  '2': 0.03, // INC 600 price per mm
};

// Price modifiers for TE-SERIES
const priceModifiers = {
  // Sensor Construction modifiers
  'Sensor Construction': {
    'TE20': 10,
    'TE21': 15,
    'TE22': 18
  },
  // Sensor Type modifiers
  'Sensor Type': {
    'K': 8,
    'J': 8,
    'T': 8,
    'E': 8,
    'R': 12,
    'Y1': 15
  },
  // Accuracy modifiers
  'Accuracy': {
    'C1': 4,
    'C2': 2,
    'CA': 6,
    'CB': 4,
    'D1/3': 8,
    'D1/5': 10
  },
  // Number of elements & wires modifiers
  'Number of elements & wires': {
    'S2': 4,
    'D4': 8,
    'S3': 6,
    'S4': 8,
    'D6': 12
  },
  // Connection Head modifiers
  'Connection Head': {
    'KNE': 15,
    'KNE-SS': 25,
    'KSE': 15,
    'KD': 18,
    'KF': 20,
    'T': 10,
    'Z': 0,
    'Y8': 30
  },
  // Mounting Connection modifiers
  'Mounting Connection': {
    'MT1': 6,
    'MT2': 6,
    'MT3': 6,
    'Y9': 12
  },
  // Extension Nipple modifiers
  'Extension Nipple': {
    '1': 8,
    '2': 10,
    '3': 12,
    'Z': 0,
    'Y10': 15
  },
  // Additional Options modifiers
  'Additional Options': {
    'Z': 0,
    'X1': 5,
    'Y11': 10
  },
  // Compression Fitting modifiers
  'Compression Fitting': {
    '1': 8,
    '2': 10,
    '3': 8,
    '4': 10,
    'Z': 0,
    'Y12': 15
  }
};

export function calculatePriceTE_SERIES(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'TE20/21/22-SERIES')?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip sheath material and length as they're handled separately
    if (selection.category === 'Sheath Material' || 
        selection.category === 'Sheath Length (mm)') return total;

    const categoryModifiers = priceModifiers[selection.category as keyof typeof priceModifiers];
    if (categoryModifiers) {
      const modifier = categoryModifiers[selection.value as keyof typeof categoryModifiers];
      return total + (modifier || 0);
    }
    return total;
  }, 0);

  // Calculate length-based price based on material and length
  let lengthBasedPrice = 0;
  
  const sheathMaterial = selections.find(s => s.category === 'Sheath Material')?.value;
  const sheathLength = selections.find(s => s.category === 'Sheath Length (mm)')?.value;
  
  if (sheathMaterial && sheathLength) {
    const pricePerMm = sheathMaterialPrices[sheathMaterial as keyof typeof sheathMaterialPrices] || 0;
    lengthBasedPrice = parseFloat(sheathLength) * pricePerMm;
  }

  return basePrice + modifiersTotal + lengthBasedPrice;
}