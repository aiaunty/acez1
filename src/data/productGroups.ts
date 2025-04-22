import { ProductGroup } from '../types';
import { AS_SLT_2010 } from './productGroups/AS_SLT_2010';
import { AS_WT_2010 } from './productGroups/AS_WT_2010';
import { TE_SERIES } from './productGroups/TE_SERIES';
import { TE11_TC } from './productGroups/TE11_TC';
import { TE11_RTD } from './productGroups/TE11_RTD';
import { TE30 } from './productGroups/TE30';
import { TW511 } from './productGroups/TW511';
import { TW512 } from './productGroups/TW512';

export const productGroups: ProductGroup[] = [
  AS_SLT_2010,
  AS_WT_2010,
  TE_SERIES,
  TE11_TC,
  TE11_RTD,
  TE30,
  TW511,
  TW512
];