import { basePrices } from './index';

// Material prices per mm for TW512
const materialPrices = {
  'S': 0.05,  // SS 316 price per mm
  'I': 0.08,  // Inconel 600 price per mm
  'M': 0.09,  // Monel 400 price per mm
  'H': 0.12,  // Hastelloy C 276 price per mm
  'D': 0.10,  // Duplex F51 price per mm
  'A': 0.06,  // A350 LF2 price per mm
  'I8': 0.09, // Inconel 800 price per mm
};

// Price modifiers for TW512
const priceModifiers = {
  // Type modifiers
  'Type': {
    'T': 15,
    'W': 25
  },
  // Process Connection modifiers
  'Process Connection': {
    'T1': 10,
    'T2': 12,
    'T3': 15,
    'T4': 10,
    'T5': 12,
    'T6': 15,
    'W1': 20,
    'W2': 25,
    'W3': 30,
    'Y2': 40
  },
  // T-length modifiers
  'T-length (Lagging Length)': {
    'T1': 10,
    'T2': 15,
    'Y5': 25
  },
  // Root & Tip Diameter modifiers
  'Root & Tip Diameter': {
    'RT1': 25,
    'RT2': 20,
    'RT3': 18,
    'RT4': 15,
    'RT5': 15,
    'RT6': 12,
    'RT7': 28,
    'RT8': 22,
    'RT9': 20,
    'Y6': 30
  },
  // Bore Diameter modifiers
  'Bore Diameter (B)': {
    'B1': 5,
    'B2': 6,
    'B3': 7,
    'Y7': 15
  },
  // Instrument Connection modifiers
  'Instrument Connection': {
    'N': 8,
    'Y8': 20
  },
  // Optional Certificates modifiers
  'Optional Certificates': {
    '1': 5,
    '2': 8,
    '3': 10,
    '4': 15,
    '5': 5,
    '6': 5,
    '7': 3,
    '8': 2,
    'Z': 0
  }
};

export function calculatePriceTW512(selections: { category: string; value: string }[]): number {
  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === 'TW512')?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip thermowell material and u-length as they're handled separately
    if (selection.category === 'Thermowell Material' || 
        selection.category === 'U-length (Insertion Length)') return total;

    // Handle multiple certificates
    if (selection.category === 'Optional Certificates' && selection.value.includes(',')) {
      const certificates = selection.value.split(',');
      let certificateTotal = 0;
      
      certificates.forEach(cert => {
        const certValue = cert.trim();
        const modifier = priceModifiers['Optional Certificates'][certValue as keyof typeof priceModifiers['Optional Certificates']] || 0;
        certificateTotal += modifier;
      });
      
      return total + certificateTotal;
    }

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