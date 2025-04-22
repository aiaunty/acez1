import { basePrices } from './index';

// Sheath material prices per mm for TE11-TC
const sheathMaterialPrices = {
  '1': 0.02, // SS 316 price per mm
  '2': 0.03, // INC 600 price per mm
};

// Price modifiers for TE11-TC
const priceModifiers = {
  // Sensor Type modifiers
  'Sensor Type': {
    'K': 8,
    'J': 8,
    'T': 8,
    'E': 8,
    'Y1': 15
  },
  // Accuracy modifiers
  'Accuracy': {
    '1': 4,
    '2': 2
  },
  // Element & Wires modifiers
  'Element(s) & Wires': {
    'S2': 4,
    'D4': 8
  },
  // Sheath Diameter modifiers
  'Sheath Diameter': {
    '1': 3,
    '2': 4,
    '3': 4.5,
    '4': 5,
    '5': 6
  },
  // Wire Junction modifiers
  'Wire Junction': {
    'U': 2,
    'G': 2,
    'E': 1
  },
  // Sensor Connection Style modifiers
  'Sensor Connection Style': {
    'Z': 0,
    '1': 5,
    '2': 4,
    '3': 6,
    '4': 7,
    '5': 7,
    '6': 6,
    '7': 6,
    '8': 8,
    '9': 10,
    '10': 2,
    'Y8': 15
  },
  // Wire Insulation modifiers
  'Wire Insulation (AWG 24)': {
    'L': 3,
    'M': 5,
    'N': 4,
    'O': 2,
    'P': 3,
    'C': 6,
    'Q': 6,
    'Z': 0,
    'Y10': 10
  },
  // Wire Termination modifiers
  'Wire Termination': {
    '1': 5,
    '2': 5,
    '3': 4,
    '4': 4,
    '5': 3,
    '6': 1,
    'Y11': 10
  },
  // Additional Option modifiers
  'Additional Option': {
    'Z': 0,
    'X3': 8,
    'X1': 6,
    'X2': 7,
    'Y12': 15,
    'U': 20
  },
  // Flexible Armour Size modifiers
  'Flexible Armour Size': {
    'A1': 5,
    'A2': 6,
    'A3': 7,
    'A4': 8
  },
  // Compression Fitting modifiers
  'Compression Fitting (SS316)': {
    '1': 5,
    '2': 6,
    '3': 7,
    '4': 7,
    '5': 8,
    '6': 8,
    '7': 7,
    '8': 8,
    '9': 8,
    '10': 9,
    'Y17': 15,
    'Z': 0
  }
};

export function calculatePriceTE11_TC(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'TE11-TC')?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip sheath material and length as they're handled separately
    if (selection.category === 'Sheath Material' || 
        selection.category === 'Sheath Length (mm)' ||
        selection.category === 'Extension Wire Length (mm)' ||
        selection.category === 'Flexible Armour Length (mm)') return total;

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

  // Add additional cost for extension wire length
  const extensionWireLength = selections.find(s => s.category === 'Extension Wire Length (mm)')?.value;
  if (extensionWireLength) {
    lengthBasedPrice += parseFloat(extensionWireLength) * 0.01; // 0.01 SGD per mm for extension wire
  }

  // Add additional cost for flexible armour length
  const flexibleArmourLength = selections.find(s => s.category === 'Flexible Armour Length (mm)')?.value;
  if (flexibleArmourLength) {
    lengthBasedPrice += parseFloat(flexibleArmourLength) * 0.015; // 0.015 SGD per mm for flexible armour
  }

  return basePrice + modifiersTotal + lengthBasedPrice;
}