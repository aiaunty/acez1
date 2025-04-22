import { ProductGroup } from '../../types';

export const TW511: ProductGroup = {
  id: 'TW511',
  name: 'TW511',
  imageUrl: 'tw511.png',
  categories: [
    {
      id: 'flange-face',
      label: 'Flange Face',
      value: null,
      options: [
        { id: 'RF', label: 'Raised Face', value: 'RF' },
        { id: 'RTJ', label: 'Ring Type Joint', value: 'RTJ' }
      ]
    },
    {
      id: 'class',
      label: 'Class',
      value: null,
      options: [
        { id: '1', label: '150', value: '1' },
        { id: '2', label: '300', value: '2' },
        { id: '3', label: '600', value: '3' },
        { id: '4', label: '900', value: '4' },
        { id: '5', label: '1500', value: '5' },
        { id: '6', label: '2500', value: '6' }
      ]
    },
    {
      id: 'size',
      label: 'Size',
      value: null,
      options: [
        { id: '1', label: '1" (only RF)', value: '1' },
        { id: '2', label: '1-1/2"', value: '2' },
        { id: '3', label: '2"', value: '3' },
        { id: '4', label: '3" (only RF)', value: '4' }
      ]
    },
    {
      id: 'welding-style',
      label: 'Welding Style',
      value: null,
      options: [
        { id: 'W1', label: 'Full Penetration Weld', value: 'W1' },
        { id: 'W2', label: 'Sealed Weld', value: 'W2' }
      ]
    },
    {
      id: 'flange-material',
      label: 'Flange Material',
      value: null,
      options: [
        { id: 'S', label: 'SS 316', value: 'S' },
        { id: 'I6', label: 'Inconel 600', value: 'I6' },
        { id: 'M', label: 'Monel 400', value: 'M' },
        { id: 'H', label: 'Hastelloy C 276', value: 'H' },
        { id: 'D', label: 'Duplex F51', value: 'D' },
        { id: 'A', label: 'A350 LF2', value: 'A' },
        { id: 'I8', label: 'Inconel 800H/HT', value: 'I8' },
        { id: 'Y5', label: 'Special version to be specified', value: 'Y5' }
      ]
    },
    {
      id: 'thermowell-material',
      label: 'Thermowell Material',
      value: null,
      options: [
        { id: 'S', label: 'SS 316', value: 'S' },
        { id: 'I', label: 'Inconel 600', value: 'I' },
        { id: 'M', label: 'Monel 400', value: 'M' },
        { id: 'H', label: 'Hastelloy C 276', value: 'H' },
        { id: 'D', label: 'Duplex F51', value: 'D' },
        { id: 'A', label: 'A350 LF2', value: 'A' },
        { id: 'I8', label: 'Inconel 800', value: 'I8' },
        { id: 'Y6', label: 'Special version to be specified', value: 'Y6' }
      ]
    },
    {
      id: 'u-length',
      label: 'U-length (Insertion Length)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 500 for 500mm)'
    },
    {
      id: 't-length',
      label: 'T-length (Lagging Length)',
      value: null,
      options: [
        { id: 'T1', label: '60 mm (STD)', value: 'T1' },
        { id: 'T2', label: '80 mm', value: 'T2' },
        { id: 'Y8', label: 'Special version to be specified', value: 'Y8' }
      ]
    },
    {
      id: 'root-tip-diameter',
      label: 'Root & Tip Diameter',
      value: null,
      options: [
        { id: 'RT1', label: 'Root: Ø 19 mm, Tip: Ø 13 mm (Tapered Stem)', value: 'RT1' },
        { id: 'RT2', label: 'Root: Ø 26.5 mm, Tip: Ø 18 mm (Tapered Stem)', value: 'RT2' },
        { id: 'T3', label: 'Tip: Ø 19 mm', value: 'T3' },
        { id: 'T5', label: 'Tip: Ø 21.5 mm', value: 'T5' },
        { id: 'Y9', label: 'Special version to be specified', value: 'Y9' }
      ]
    },
    {
      id: 'bore-diameter',
      label: 'Bore Diameter B',
      value: null,
      options: [
        { id: 'B1', label: '6.6 mm (STD)', value: 'B1' },
        { id: 'B2', label: '7 mm', value: 'B2' },
        { id: 'B3', label: '8 mm', value: 'B3' },
        { id: 'Y10', label: 'Special version to be specified', value: 'Y10' }
      ]
    }
  ]
};