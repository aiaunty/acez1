import { basePrices } from './index';

// Thermowell material prices per mm for AS-WT-2010
const thermowellMaterialPrices = {
  'M1': 0.05, // SS 316 price per mm
  'M2': 0.05, // SS 316L price per mm
  'M3': 0.04, // SS 304 price per mm
  'M4': 0.06, // SS 321 price per mm
  'M5': 0.08, // INC 600 price per mm
};

// Price modifiers for AS-WT-2010
const priceModifiers = {
  // Thermowell Material modifiers
  'Thermowell Material': {
    'M1': 15,
    'M2': 18,
    'M3': 12,
    'M4': 20,
    'M5': 25,
    'Y1': 30
  },
  // Process Connection modifiers
  'Process Connection': {
    'P1': 8,
    'P2': 10,
    'P3': 12,
    'P4': 8,
    'P5': 10,
    'P6': 12,
    'F1': 15,
    'F2': 18,
    'F3': 20,
    'F4': 18,
    'F5': 20,
    'F6': 22,
    'Y2': 25
  },
  // Bore Diameter modifiers
  'Bore Diameter': {
    'B1': 5,
    'B2': 6,
    'B3': 7,
    'Y3': 10
  },
  // Thermowell Type modifiers
  'Thermowell Type': {
    'T1': 10,
    'T2': 15,
    'T3': 18,
    'Y4': 25
  },
  // Connection Head modifiers
  'Connection Head': {
    'AS-XDA': 25,
    'AS-XDS': 35,
    'Z': 0,
    'Y5': 40
  },
  // Mounting Connection modifiers
  'Mounting Connection': {
    'P': 8,
    'Q': 8,
    'R': 10,
    'Y6': 15
  },
  // Extension Nipple Type modifiers
  'Extension Nipple Type': {
    '1': 12,
    '2': 15,
    '3': 18,
    '4': 20,
    'Z': 0,
    'Y7': 25
  }
};

export function calculatePriceAS_WT_2010(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'AS-WT-2010')?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip thermowell material and immersion length as they're handled separately
    if (selection.category === 'Thermowell Material' || 
        selection.category === 'Immersion Length (mm)') return total;

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
  const immersionLength = selections.find(s => s.category === 'Immersion Length (mm)')?.value;
  
  if (thermowellMaterial && immersionLength) {
    const pricePerMm = thermowellMaterialPrices[thermowellMaterial as keyof typeof thermowellMaterialPrices] || 0;
    lengthBasedPrice = parseFloat(immersionLength) * pricePerMm;
  }

  return basePrice + modifiersTotal + lengthBasedPrice;
}