import { BasePrice } from '../types';
import { calculatePriceAS_SLT_2010 } from './AS_SLT_2010';
import { calculatePriceAS_WT_2010 } from './AS_WT_2010';
import { calculatePriceTE_SERIES } from './TE_SERIES';
import { calculatePriceTE11_TC } from './TE11_TC';
import { calculatePriceTE11_RTD } from './TE11_RTD';
import { calculatePriceTE30 } from './TE30';
import { calculatePriceTW511 } from './TW511';
import { calculatePriceTW512 } from './TW512';

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
  },
  {
    productGroup: 'TE30',
    price: 85, // Base price in SGD
  },
  {
    productGroup: 'TW511',
    price: 150, // Base price in SGD
  },
  {
    productGroup: 'TW512',
    price: 140, // Base price in SGD
  }
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

  // Call the appropriate pricing function based on product group
  switch (productGroup) {
    case 'AS-SLT-2010':
      return calculatePriceAS_SLT_2010(selections);
    case 'AS-WT-2010':
      return calculatePriceAS_WT_2010(selections);
    case 'TE20/21/22-SERIES':
      return calculatePriceTE_SERIES(selections);
    case 'TE11-TC':
      return calculatePriceTE11_TC(selections);
    case 'TE11-RTD':
      return calculatePriceTE11_RTD(selections);
    case 'TE30':
      return calculatePriceTE30(selections);
    case 'TW511':
      return calculatePriceTW511(selections);
    case 'TW512':
      return calculatePriceTW512(selections);
    default:
      return 0;
  }
}