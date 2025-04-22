import { basePrices } from './index';

// Material prices per mm for TW511
const materialPrices = {
  'S': 0.05,  // SS 316 price per mm
  'I': 0.08,  // Inconel 600 price per mm
  'M': 0.09,  // Monel 400 price per mm
  'H': 0.12,  // Hastelloy C 276 price per mm
  'D': 0.10,  // Duplex F51 price per mm
  'A': 0.06,  // A350 LF2 price per mm
  'I8': 0.09, // Inconel 800 price per mm
};

// Price modifiers for TW511
const priceModifiers = {
  // Flange Face modifiers
  'Flange Face': {
    'RF': 10,
    'RTJ': 25
  },
  // Class modifiers
  'Class': {
    '1': 15,
    '2': 25,
    '3': 40,
    '4': 60,
    '5': 80,
    '6': 100
  },
  // Size modifiers
  'Size': {
    '1': 20,
    '2': 30,
    '3': 45,
    '4': 60
  },
  // Welding Style modifiers
  'Welding Style': {
    'W1': 30,
    'W2': 15
  },
  // Flange Material modifiers
  'Flange Material': {
    'S': 25,
    'I6': 60,
    'M': 55,
    'H': 80,
    'D': 70,
    'A': 40,
    'I8': 65,
    'Y5': 100
  },
  // T-length modifiers
  'T-length (Lagging Length)': {
    'T1': 10,
    'T2': 15,
    'Y8': 25
  },
  // Root & Tip Diameter modifiers
  'Root & Tip Diameter': {
    'RT1': 20,
    'RT2': 25,
    'T3': 15,
    'T5': 18,
    'Y9': 30
  },
  // Bore Diameter modifiers
  'Bore Diameter B': {
    'B1': 5,
    'B2': 6,
    'B3': 7,
    'Y10': 15
  }
};

export function calculatePriceTW511(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'TW511')?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip thermowell material and u-length as they're handled separately
    if (selection.category === 'Thermowell Material' || 
        selection.category === 'U-length (Insertion Length)') return total;

    const categoryModifiers = priceModifiers[selection.category as keyof typeof priceModifiers];
    if (categoryModifiers) {
      const modifier = categoryModifiers[selection.value as keyof typeof categoryModifiers];
      return total + (modifier || 0);
    }
    return total;
  }, 0);

  // Calculate length-based price based on material and length
  let lengthBasedPrice = 0;
  
  const thermowellMaterial = selections.find(s => s.category === 'Thermowell Material')?.value;
  const uLength = selections.find(s => s.category === 'U-length (Insertion Length)')?.value;
  
  if (thermowellMaterial && uLength) {
    const pricePerMm = materialPrices[thermowellMaterial as keyof typeof materialPrices] || 0;
    lengthBasedPrice = parseFloat(uLength) * pricePerMm;
  }

  return basePrice + modifiersTotal + lengthBasedPrice;
}