import { basePrices } from './index';

// Sheath material prices per mm for AS-SLT-2010
const sheathMaterialPrices = {
  'M1': 0.03, // SS 316 price per mm
  'M2': 0.04, // INC 600 price per mm
  'Y2': 0.5, // Special Version price per mm
};

// Price modifiers for AS-SLT-2010
const priceModifiers = {
  // Sensor Type modifiers
  'Sensor Type': {
    'K': 10,
    'J': 10,
    'T': 10,
    'E': 10,
    'R': 15,
    'Y1': 20
  },
  // Accuracy modifiers
  'Accuracy': {
    'C1': 5,
    'C2': 3,
    'CA': 8,
    'CB': 5
  },
  // Element & Wires modifiers
  'Element & Wires': {
    'S2': 5,
    'D4': 10,
    'S3': 8,
    'S4': 12
  },
  // Connection Head modifiers
  'Connection Head': {
    'AS-XDA': 25,
    'AS-XDS': 35,
    'T': 15,
    'Z': 0,
    'Y8': 40
  },
  // Mounting Connection modifiers
  'Mounting Connection': {
    'P': 8,
    'Q': 8,
    'R': 10,
    'Y9': 15
  },
  // Extension Nipple Type modifiers
  'Extension Nipple Type': {
    '1': 12,
    '2': 15,
    '3': 18,
    '4': 20,
    'Z': 0,
    'Y10': 25
  }
};

export function calculatePriceAS_SLT_2010(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'AS-SLT-2010')?.price || 0;

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