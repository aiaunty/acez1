import { basePrices } from './index';

// Protection tube material prices per mm for TE30
const protectionTubePrices = {
  'T1': 0.04, // Tubing 9.5 mm OD x 7 mm ID - SS316/L
  'T2': 0.05, // Tubing 12.7 mm OD x 10.2 mm ID - SS316/L
  'P1': 0.06, // 1/4" Pipe - Sch 40 - SS316/L
  'P2': 0.07, // 3/8" Pipe - Sch 40 - SS316/L
  'P3': 0.08, // 1/2" Pipe - Sch 40 - SS316/L
};

// Price modifiers for TE30
const priceModifiers = {
  // Sensor Type modifiers
  'Sensor Type': {
    'K': 8,
    'J': 8,
    'T': 8,
    'E': 8,
    'R': 12,
    'PT': 10,
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
  // Element & Wires modifiers
  'Element & Wires': {
    'S2': 4,
    'D4': 8,
    'S3': 6,
    'S4': 8,
    'D6': 12
  },
  // Protection Tube Type modifiers
  'Protection Tube Type': {
    'T1': 15,
    'T2': 18,
    'P1': 20,
    'P2': 22,
    'P3': 25,
    'Y2': 30
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
    'Y3': 25
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
    'Y4': 30
  }
};

export function calculatePriceTE30(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'TE30')?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip protection tube type and length as they're handled separately
    if (selection.category === 'Protection Tube Type' || 
        selection.category === 'Protection Tube Length (mm)') return total;

    const categoryModifiers = priceModifiers[selection.category as keyof typeof priceModifiers];
    if (categoryModifiers) {
      const modifier = categoryModifiers[selection.value as keyof typeof categoryModifiers];
      return total + (modifier || 0);
    }
    return total;
  }, 0);

  // Calculate length-based price based on tube type and length
  let lengthBasedPrice = 0;
  
  const tubeType = selections.find(s => s.category === 'Protection Tube Type')?.value;
  const tubeLength = selections.find(s => s.category === 'Protection Tube Length (mm)')?.value;
  
  if (tubeType && tubeLength) {
    const pricePerMm = protectionTubePrices[tubeType as keyof typeof protectionTubePrices] || 0;
    lengthBasedPrice = parseFloat(tubeLength) * pricePerMm;
  }

  return basePrice + modifiersTotal + lengthBasedPrice;
}