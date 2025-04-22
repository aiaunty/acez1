import { BasePrice, PriceModifier } from '../types';

// Base prices for each product group
export const basePrices: BasePrice[] = [
  {
    productGroup: 'AS-SLT-2010',
    price: 100, // Base price in SGD
  },
  {
    productGroup: 'AS-WT-2010',
    price: 120, // Base price in SGD
  },
  {
    productGroup: 'TE20/21/22-SERIES',
    price: 80, // Base price in SGD
  },
  {
    productGroup: 'TE11-TC',
    price: 70, // Base price in SGD
  },
  {
    productGroup: 'TE11-RTD',
    price: 75, // Base price in SGD
  }
];

// Sheath material prices per mm - separated by product group
const sheathMaterialPrices = {
  // AS-SLT-2010 sheath material prices
  'AS-SLT-2010': {
    'M1': 0.03, // SS 316 price per mm
    'M2': 0.04, // INC 600 price per mm
    'Y2': 0.5, // Special Version price per mm
  },
  // AS-WT-2010 thermowell material prices
  'AS-WT-2010': {
    'M1': 0.05, // SS 316 price per mm
    'M2': 0.05, // SS 316L price per mm
    'M3': 0.04, // SS 304 price per mm
    'M4': 0.06, // SS 321 price per mm
    'M5': 0.08, // INC 600 price per mm
  },
  // TE-SERIES sheath material prices
  'TE20/21/22-SERIES': {
    '1': 0.02, // SS 316 price per mm
    '2': 0.03, // INC 600 price per mm
  },
  // TE11-TC sheath material prices
  'TE11-TC': {
    '1': 0.02, // SS 316 price per mm
    '2': 0.03, // INC 600 price per mm
  },
  // TE11-RTD sheath material prices
  'TE11-RTD': {
    '1': 0.02, // SS 316 price per mm
  }
};

// Price modifiers for specific selections - separated by product group
export const priceModifiers: PriceModifier[] = [
  // AS-SLT-2010 MODIFIERS
  // ---------------------
  
  // Sensor Type modifiers
  { productGroup: 'AS-SLT-2010', category: 'Sensor Type', value: 'K', price: 10 },
  { productGroup: 'AS-SLT-2010', category: 'Sensor Type', value: 'J', price: 10 },
  { productGroup: 'AS-SLT-2010', category: 'Sensor Type', value: 'T', price: 10 },
  { productGroup: 'AS-SLT-2010', category: 'Sensor Type', value: 'E', price: 10 },
  { productGroup: 'AS-SLT-2010', category: 'Sensor Type', value: 'R', price: 15 },
  { productGroup: 'AS-SLT-2010', category: 'Sensor Type', value: 'Y1', price: 20 },

  // Accuracy modifiers
  { productGroup: 'AS-SLT-2010', category: 'Accuracy', value: 'C1', price: 5 },
  { productGroup: 'AS-SLT-2010', category: 'Accuracy', value: 'C2', price: 3 },
  { productGroup: 'AS-SLT-2010', category: 'Accuracy', value: 'CA', price: 8 },
  { productGroup: 'AS-SLT-2010', category: 'Accuracy', value: 'CB', price: 5 },

  // Element & Wires modifiers
  { productGroup: 'AS-SLT-2010', category: 'Element & Wires', value: 'S2', price: 5 },
  { productGroup: 'AS-SLT-2010', category: 'Element & Wires', value: 'D4', price: 10 },
  { productGroup: 'AS-SLT-2010', category: 'Element & Wires', value: 'S3', price: 8 },
  { productGroup: 'AS-SLT-2010', category: 'Element & Wires', value: 'S4', price: 12 },

  // Connection Head modifiers
  { productGroup: 'AS-SLT-2010', category: 'Connection Head', value: 'AS-XDA', price: 25 },
  { productGroup: 'AS-SLT-2010', category: 'Connection Head', value: 'AS-XDS', price: 35 },
  { productGroup: 'AS-SLT-2010', category: 'Connection Head', value: 'T', price: 15 },
  { productGroup: 'AS-SLT-2010', category: 'Connection Head', value: 'Z', price: 0 },
  { productGroup: 'AS-SLT-2010', category: 'Connection Head', value: 'Y8', price: 40 },

  // Mounting Connection modifiers
  { productGroup: 'AS-SLT-2010', category: 'Mounting Connection', value: 'P', price: 8 },
  { productGroup: 'AS-SLT-2010', category: 'Mounting Connection', value: 'Q', price: 8 },
  { productGroup: 'AS-SLT-2010', category: 'Mounting Connection', value: 'R', price: 10 },
  { productGroup: 'AS-SLT-2010', category: 'Mounting Connection', value: 'Y9', price: 15 },

  // Extension Nipple Type modifiers
  { productGroup: 'AS-SLT-2010', category: 'Extension Nipple Type', value: '1', price: 12 },
  { productGroup: 'AS-SLT-2010', category: 'Extension Nipple Type', value: '2', price: 15 },
  { productGroup: 'AS-SLT-2010', category: 'Extension Nipple Type', value: '3', price: 18 },
  { productGroup: 'AS-SLT-2010', category: 'Extension Nipple Type', value: '4', price: 20 },
  { productGroup: 'AS-SLT-2010', category: 'Extension Nipple Type', value: 'Z', price: 0 },
  { productGroup: 'AS-SLT-2010', category: 'Extension Nipple Type', value: 'Y10', price: 25 },
  
  // AS-WT-2010 MODIFIERS
  // -------------------
  
  // Thermowell Material modifiers
  { productGroup: 'AS-WT-2010', category: 'Thermowell Material', value: 'M1', price: 15 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Material', value: 'M2', price: 18 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Material', value: 'M3', price: 12 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Material', value: 'M4', price: 20 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Material', value: 'M5', price: 25 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Material', value: 'Y1', price: 30 },
  
  // Process Connection modifiers
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'P1', price: 8 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'P2', price: 10 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'P3', price: 12 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'P4', price: 8 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'P5', price: 10 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'P6', price: 12 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'F1', price: 15 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'F2', price: 18 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'F3', price: 20 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'F4', price: 18 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'F5', price: 20 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'F6', price: 22 },
  { productGroup: 'AS-WT-2010', category: 'Process Connection', value: 'Y2', price: 25 },
  
  // Bore Diameter modifiers
  { productGroup: 'AS-WT-2010', category: 'Bore Diameter', value: 'B1', price: 5 },
  { productGroup: 'AS-WT-2010', category: 'Bore Diameter', value: 'B2', price: 6 },
  { productGroup: 'AS-WT-2010', category: 'Bore Diameter', value: 'B3', price: 7 },
  { productGroup: 'AS-WT-2010', category: 'Bore Diameter', value: 'Y3', price: 10 },
  
  // Thermowell Type modifiers
  { productGroup: 'AS-WT-2010', category: 'Thermowell Type', value: 'T1', price: 10 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Type', value: 'T2', price: 15 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Type', value: 'T3', price: 18 },
  { productGroup: 'AS-WT-2010', category: 'Thermowell Type', value: 'Y4', price: 25 },
  
  // Connection Head modifiers
  { productGroup: 'AS-WT-2010', category: 'Connection Head', value: 'AS-XDA', price: 25 },
  { productGroup: 'AS-WT-2010', category: 'Connection Head', value: 'AS-XDS', price: 35 },
  { productGroup: 'AS-WT-2010', category: 'Connection Head', value: 'Z', price: 0 },
  { productGroup: 'AS-WT-2010', category: 'Connection Head', value: 'Y5', price: 40 },
  
  // Mounting Connection modifiers
  { productGroup: 'AS-WT-2010', category: 'Mounting Connection', value: 'P', price: 8 },
  { productGroup: 'AS-WT-2010', category: 'Mounting Connection', value: 'Q', price: 8 },
  { productGroup: 'AS-WT-2010', category: 'Mounting Connection', value: 'R', price: 10 },
  { productGroup: 'AS-WT-2010', category: 'Mounting Connection', value: 'Y6', price: 15 },
  
  // Extension Nipple Type modifiers
  { productGroup: 'AS-WT-2010', category: 'Extension Nipple Type', value: '1', price: 12 },
  { productGroup: 'AS-WT-2010', category: 'Extension Nipple Type', value: '2', price: 15 },
  { productGroup: 'AS-WT-2010', category: 'Extension Nipple Type', value: '3', price: 18 },
  { productGroup: 'AS-WT-2010', category: 'Extension Nipple Type', value: '4', price: 20 },
  { productGroup: 'AS-WT-2010', category: 'Extension Nipple Type', value: 'Z', price: 0 },
  { productGroup: 'AS-WT-2010', category: 'Extension Nipple Type', value: 'Y7', price: 25 },
  
  // TE20/21/22-SERIES MODIFIERS
  // --------------------------
  
  // Sensor Construction modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Construction', value: 'TE20', price: 10 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Construction', value: 'TE21', price: 15 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Construction', value: 'TE22', price: 18 },
  
  // Sensor Type modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Type', value: 'K', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Type', value: 'J', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Type', value: 'T', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Type', value: 'E', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Type', value: 'R', price: 12 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Sensor Type', value: 'Y1', price: 15 },

  // Accuracy modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Accuracy', value: 'C1', price: 4 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Accuracy', value: 'C2', price: 2 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Accuracy', value: 'CA', price: 6 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Accuracy', value: 'CB', price: 4 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Accuracy', value: 'D1/3', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Accuracy', value: 'D1/5', price: 10 },

  // Number of elements & wires modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Number of elements & wires', value: 'S2', price: 4 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Number of elements & wires', value: 'D4', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Number of elements & wires', value: 'S3', price: 6 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Number of elements & wires', value: 'S4', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Number of elements & wires', value: 'D6', price: 12 },

  // Connection Head modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'KNE', price: 15 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'KNE-SS', price: 25 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'KSE', price: 15 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'KD', price: 18 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'KF', price: 20 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'T', price: 10 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'Z', price: 0 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Connection Head', value: 'Y8', price: 30 },

  // Mounting Connection modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Mounting Connection', value: 'MT1', price: 6 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Mounting Connection', value: 'MT2', price: 6 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Mounting Connection', value: 'MT3', price: 6 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Mounting Connection', value: 'Y9', price: 12 },

  // Extension Nipple modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Extension Nipple', value: '1', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Extension Nipple', value: '2', price: 10 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Extension Nipple', value: '3', price: 12 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Extension Nipple', value: 'Z', price: 0 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Extension Nipple', value: 'Y10', price: 15 },
  
  // Additional Options modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Additional Options', value: 'Z', price: 0 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Additional Options', value: 'X1', price: 5 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Additional Options', value: 'Y11', price: 10 },
  
  // Compression Fitting modifiers
  { productGroup: 'TE20/21/22-SERIES', category: 'Compression Fitting', value: '1', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Compression Fitting', value: '2', price: 10 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Compression Fitting', value: '3', price: 8 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Compression Fitting', value: '4', price: 10 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Compression Fitting', value: 'Z', price: 0 },
  { productGroup: 'TE20/21/22-SERIES', category: 'Compression Fitting', value: 'Y12', price: 15 },

  // TE11-TC MODIFIERS
  // ----------------
  
  // Sensor Type modifiers
  { productGroup: 'TE11-TC', category: 'Sensor Type', value: 'K', price: 8 },
  { productGroup: 'TE11-TC', category: 'Sensor Type', value: 'J', price: 8 },
  { productGroup: 'TE11-TC', category: 'Sensor Type', value: 'T', price: 8 },
  { productGroup: 'TE11-TC', category: 'Sensor Type', value: 'E', price: 8 },
  { productGroup: 'TE11-TC', category: 'Sensor Type', value: 'Y1', price: 15 },

  // Accuracy modifiers
  { productGroup: 'TE11-TC', category: 'Accuracy', value: '1', price: 4 },
  { productGroup: 'TE11-TC', category: 'Accuracy', value: '2', price: 2 },

  // Element & Wires modifiers
  { productGroup: 'TE11-TC', category: 'Element(s) & Wires', value: 'S2', price: 4 },
  { productGroup: 'TE11-TC', category: 'Element(s) & Wires', value: 'D4', price: 8 },

  // Sheath Material modifiers
  { productGroup: 'TE11-TC', category: 'Sheath Material', value: '1', price: 5 },
  { productGroup: 'TE11-TC', category: 'Sheath Material', value: '2', price: 8 },

  // Sheath Diameter modifiers
  { productGroup: 'TE11-TC', category: 'Sheath Diameter', value: '1', price: 3 },
  { productGroup: 'TE11-TC', category: 'Sheath Diameter', value: '2', price: 4 },
  { productGroup: 'TE11-TC', category: 'Sheath Diameter', value: '4', price: 5 },

  // Wire Junction modifiers
  { productGroup: 'TE11-TC', category: 'Wire Junction', value: 'U', price: 2 },
  { productGroup: 'TE11-TC', category: 'Wire Junction', value: 'G', price: 2 },
  { productGroup: 'TE11-TC', category: 'Wire Junction', value: 'E', price: 1 },

  // Sensor Connection Style modifiers
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: 'Z', price: 0 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '1', price: 5 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '2', price: 4 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '3', price: 6 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '4', price: 7 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '5', price: 7 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '6', price: 6 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '7', price: 6 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '8', price: 8 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '9', price: 10 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: '10', price: 2 },
  { productGroup: 'TE11-TC', category: 'Sensor Connection Style', value: 'Y8', price: 15 },

  // Wire Insulation modifiers
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'L', price: 3 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'M', price: 5 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'N', price: 4 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'O', price: 2 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'P', price: 3 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'C', price: 6 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'Q', price: 6 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'Z', price: 0 },
  { productGroup: 'TE11-TC', category: 'Wire Insulation (AWG 24)', value: 'Y10', price: 10 },

  // Wire Termination modifiers
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: '1', price: 5 },
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: '2', price: 5 },
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: '3', price: 4 },
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: '4', price: 4 },
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: '5', price: 3 },
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: '6', price: 1 },
  { productGroup: 'TE11-TC', category: 'Wire Termination', value: 'Y11', price: 10 },

  // Additional Option modifiers
  { productGroup: 'TE11-TC', category: 'Additional Option', value: 'Z', price: 0 },
  { productGroup: 'TE11-TC', category: 'Additional Option', value: 'X3', price: 8 },
  { productGroup: 'TE11-TC', category: 'Additional Option', value: 'X1', price: 6 },
  { productGroup: 'TE11-TC', category: 'Additional Option', value: 'X2', price: 7 },
  { productGroup: 'TE11-TC', category: 'Additional Option', value: 'Y12', price: 15 },
  { productGroup: 'TE11-TC', category: 'Additional Option', value: 'U', price: 20 },

  // Flexible Armour Size modifiers
  { productGroup: 'TE11-TC', category: 'Flexible Armour Size', value: 'A1', price: 5 },
  { productGroup: 'TE11-TC', category: 'Flexible Armour Size', value: 'A2', price: 6 },
  { productGroup: 'TE11-TC', category: 'Flexible Armour Size', value: 'A3', price: 7 },
  { productGroup: 'TE11-TC', category: 'Flexible Armour Size', value: 'A4', price: 8 },

  // Compression Fitting modifiers
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '1', price: 5 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '2', price: 6 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '3', price: 7 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '4', price: 7 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '5', price: 8 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '6', price: 8 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '7', price: 7 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '8', price: 8 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '9', price: 8 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: '10', price: 9 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: 'Y17', price: 15 },
  { productGroup: 'TE11-TC', category: 'Compression Fitting (SS316)', value: 'Z', price: 0 },

  // TE11-RTD MODIFIERS
  // -----------------
  
  // Sensor Type modifiers
  { productGroup: 'TE11-RTD', category: 'Sensor Type', value: 'R', price: 10 },

  // Accuracy modifiers
  { productGroup: 'TE11-RTD', category: 'Accuracy', value: 'CA', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Accuracy', value: 'CB', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Accuracy', value: 'D1/3', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Accuracy', value: 'D1/5', price: 10 },

  // Element & Wires modifiers
  { productGroup: 'TE11-RTD', category: 'Element & Wires', value: 'S3', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Element & Wires', value: 'S4', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Element & Wires', value: 'D6', price: 12 },

  // Sheath Material modifiers
  { productGroup: 'TE11-RTD', category: 'Sheath Material', value: '1', price: 5 },

  // Sheath Diameter modifiers
  { productGroup: 'TE11-RTD', category: 'Sheath Diameter', value: '1', price: 3 },
  { productGroup: 'TE11-RTD', category: 'Sheath Diameter', value: '2', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Sheath Diameter', value: '3', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Sheath Diameter', value: '4', price: 5 },

  // Wire Junction modifiers
  { productGroup: 'TE11-RTD', category: 'Wire Junction', value: 'U', price: 2 },
  { productGroup: 'TE11-RTD', category: 'Wire Junction', value: 'G', price: 2 },

  // Sensor Connection Style modifiers
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: 'Z', price: 0 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '1', price: 5 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '2', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '3', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '4', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '5', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '6', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '7', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '8', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '9', price: 10 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: '10', price: 2 },
  { productGroup: 'TE11-RTD', category: 'Sensor Connection Style', value: 'Y9', price: 15 },

  // Wire Insulation modifiers
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'L', price: 3 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'M', price: 5 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'N', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'O', price: 2 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'P', price: 3 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'C', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'Q', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'Z', price: 0 },
  { productGroup: 'TE11-RTD', category: 'Wire Insulation (AWG 24)', value: 'Y10', price: 10 },

  // Wire Termination modifiers
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: '1', price: 5 },
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: '2', price: 5 },
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: '3', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: '4', price: 4 },
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: '5', price: 3 },
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: '6', price: 1 },
  { productGroup: 'TE11-RTD', category: 'Wire Termination', value: 'Y12', price: 10 },

  // Additional Option modifiers
  { productGroup: 'TE11-RTD', category: 'Additional Option', value: 'Z', price: 0 },
  { productGroup: 'TE11-RTD', category: 'Additional Option', value: 'X1', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Additional Option', value: 'X2', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Additional Option', value: 'X3', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Additional Option', value: 'Y13', price: 15 },
  { productGroup: 'TE11-RTD', category: 'Additional Option', value: 'U', price: 20 },

  // Flexible Armour Size modifiers
  { productGroup: 'TE11-RTD', category: 'Flexible Armour Size', value: 'A1', price: 5 },
  { productGroup: 'TE11-RTD', category: 'Flexible Armour Size', value: 'A2', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Flexible Armour Size', value: 'A3', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Flexible Armour Size', value: 'A4', price: 8 },

  // Compression Fitting modifiers
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '1', price: 5 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '2', price: 6 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '3', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '4', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '5', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '6', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '7', price: 7 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '8', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '9', price: 8 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: '10', price: 9 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: 'Y17', price: 15 },
  { productGroup: 'TE11-RTD', category: 'Compression Fitting (SS316)', value: 'Z', price: 0 }
];

// Feature flag for pricing
export const ENABLE_PRICING = true;

// Calculate total price based on selections
export function calculatePrice(productGroup: string, selections: { category: string; value: string }[]): number {
  if (!ENABLE_PRICING) return 0;

  // Check for any special versions
  const hasSpecialVersion = selections.some(selection => 
    selection.value.startsWith('Y') || // Any value starting with Y is a special version
    (selection.category === 'Sheath Material' && selection.value === 'Y2')
  );

  // If there's a special version selected, return 0 to indicate price needs to be requested
  if (hasSpecialVersion) {
    return 0;
  }

  // Get base price
  const basePrice = basePrices.find(bp => bp.productGroup === productGroup)?.price || 0;

  // Calculate modifiers
  const modifiersTotal = selections.reduce((total, selection) => {
    // Skip sheath material and length as they're handled separately
    if (selection.category === 'Sheath Material' || 
        selection.category === 'Sheath Length (mm)' ||
        selection.category === 'Immersion Length (mm)') return total;

    const modifier = priceModifiers.find(
      mod => mod.productGroup === productGroup && 
             mod.category === selection.category && 
             mod.value === selection.value
    );
    return total + (modifier?.price || 0);
  }, 0);

  // Calculate length-based price based on material and length
  let lengthBasedPrice = 0;
  
  if (productGroup === 'AS-SLT-2010') {
    const sheathMaterial = selections.find(s => s.category === 'Sheath Material')?.value;
    const sheathLength = selections.find(s => s.category === 'Sheath Length (mm)')?.value;
    
    if (sheathMaterial && sheathLength) {
      const materialPrices = sheathMaterialPrices[productGroup as keyof typeof sheathMaterialPrices];
      if (materialPrices) {
        const pricePerMm = materialPrices[sheathMaterial as keyof typeof materialPrices] || 0;
        lengthBasedPrice = parseFloat(sheathLength) * pricePerMm;
      }
    }
  } else if (productGroup === 'AS-WT-2010') {
    const thermowellMaterial = selections.find(s => s.category === 'Thermowell Material')?.value;
    const immersionLength = selections.find(s => s.category === 'Immersion Length (mm)')?.value;
    
    if (thermowellMaterial && immersionLength) {
      const materialPrices = sheathMaterialPrices[productGroup as keyof typeof sheathMaterialPrices];
      if (materialPrices) {
        const pricePerMm = materialPrices[thermowellMaterial as keyof typeof materialPrices] || 0;
        lengthBasedPrice = parseFloat(immersionLength) * pricePerMm;
      }
    }
  } else if (productGroup === 'TE20/21/22-SERIES' || productGroup === 'TE11-TC' || productGroup === 'TE11-RTD') {
    const sheathMaterial = selections.find(s => s.category === 'Sheath Material')?.value;
    const sheathLength = selections.find(s => s.category === 'Sheath Length (mm)')?.value;
    
    if (sheathMaterial && sheathLength) {
      const materialPrices = sheathMaterialPrices[productGroup as keyof typeof sheathMaterialPrices];
      if (materialPrices) {
        const pricePerMm = materialPrices[sheathMaterial as keyof typeof materialPrices] || 0 ;
        lengthBasedPrice = parseFloat(sheathLength) * pricePerMm;
      }
    }
  }

  return basePrice + modifiersTotal + lengthBasedPrice;
}