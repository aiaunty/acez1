import { ProductGroup } from '../../types';

export const TW512: ProductGroup = {
  id: 'TW512',
  name: 'TW512',
  imageUrl: 'tw512.png',
  categories: [
    {
      id: 'type',
      label: 'Type',
      value: null,
      options: [
        { id: 'T', label: 'Thread Thermowell', value: 'T' },
        { id: 'W', label: 'Welded Thermowell', value: 'W' }
      ]
    },
    {
      id: 'process-connection',
      label: 'Process Connection',
      value: null,
      options: [
        { id: 'T1', label: '1/2" NPT M', value: 'T1' },
        { id: 'T2', label: '3/4" NPT M', value: 'T2' },
        { id: 'T3', label: '1" NPT M', value: 'T3' },
        { id: 'T4', label: '1/2" BSP M', value: 'T4' },
        { id: 'T5', label: '3/4" BSP M', value: 'T5' },
        { id: 'T6', label: '1" BSP M', value: 'T6' },
        { id: 'W1', label: 'Ø 26.7mm (For 3/4" Pipe)', value: 'W1' },
        { id: 'W2', label: 'Ø 33.4 mm (For 1" Pipe)', value: 'W2' },
        { id: 'W3', label: 'Ø 48.3 mm (For 1-1/2" Pipe)', value: 'W3' },
        { id: 'Y2', label: 'Special version, to be specified', value: 'Y2' }
      ]
    },
    {
      id: 'thermowell-material',
      label: 'Thermowell Material',
      value: null,
      options: [
        { id: 'S', label: 'SS316', value: 'S' },
        { id: 'I', label: 'Inconel 600', value: 'I' },
        { id: 'M', label: 'Monel 400', value: 'M' },
        { id: 'H', label: 'Hastelloy C 276', value: 'H' },
        { id: 'D', label: 'Duplex F51', value: 'D' },
        { id: 'A', label: 'A350 LF2', value: 'A' },
        { id: 'I8', label: 'Inconel 800', value: 'I8' },
        { id: 'Y3', label: 'Special version, to be specified', value: 'Y3' }
      ]
    },
    {
      id: 'u-length',
      label: 'U-length (Insertion Length)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 100 for 100mm)'
    },
    {
      id: 't-length',
      label: 'T-length (Lagging Length)',
      value: null,
      options: [
        { id: 'T1', label: '45 mm (STD)', value: 'T1' },
        { id: 'T2', label: '60 mm', value: 'T2' },
        { id: 'Y5', label: 'Special version, to be specified', value: 'Y5' }
      ]
    },
    {
      id: 'root-tip-diameter',
      label: 'Root & Tip Diameter',
      value: null,
      options: [
        { id: 'RT1', label: 'Root: Ø 26.5 mm, Tip: Ø 18 mm (Tapered Stem)', value: 'RT1' },
        { id: 'RT2', label: 'Root: Ø 19 mm, Tip: Ø 13 mm (Tapered Stem)', value: 'RT2' },
        { id: 'RT3', label: 'Root: Ø 17 mm, Tip: Ø 13 mm (Tapered Stem)', value: 'RT3' },
        { id: 'RT4', label: 'Root & tip Diameter: Ø 19 mm (Straight Stem)', value: 'RT4' },
        { id: 'RT5', label: 'Root & tip Diameter: Ø 17 mm (Straight Stem)', value: 'RT5' },
        { id: 'RT6', label: 'Root & tip Diameter: Ø 12.5 mm (Straight Stem)', value: 'RT6' },
        { id: 'RT7', label: 'Root: Ø 26.5 mm, Tip: Ø 12.5 mm (Stepped Stem)', value: 'RT7' },
        { id: 'RT8', label: 'Root: Ø 19 mm, Tip: Ø 12.5 mm (Stepped Stem)', value: 'RT8' },
        { id: 'RT9', label: 'Root: Ø 17 mm, Tip: Ø 12.5 mm (Stepped Stem)', value: 'RT9' },
        { id: 'Y6', label: 'Special version, to be specified', value: 'Y6' }
      ]
    },
    {
      id: 'bore-diameter',
      label: 'Bore Diameter (B)',
      value: null,
      options: [
        { id: 'B1', label: '6.6 mm (STD)', value: 'B1' },
        { id: 'B2', label: '7 mm', value: 'B2' },
        { id: 'B3', label: '8 mm', value: 'B3' },
        { id: 'Y7', label: 'Special version, to be specified', value: 'Y7' }
      ]
    },
    {
      id: 'instrument-connection',
      label: 'Instrument Connection',
      value: null,
      options: [
        { id: 'N', label: '1/2" NPT F (STD)', value: 'N' },
        { id: 'Y8', label: 'Special version, to be specified', value: 'Y8' }
      ]
    },
    {
      id: 'optional-certificates',
      label: 'Optional Certificates',
      value: null,
      isMultiSelect: true,
      options: [
        { id: '1', label: 'Material Certificate (EN 10204-3.1B)', value: '1' },
        { id: '2', label: 'Hydrostatics Test Report (ASME B 16.5)', value: '2' },
        { id: '3', label: 'Dye Penetration Report (ASTM E 165)', value: '3' },
        { id: '4', label: 'Wake Frequency Calculation {ASME PTC 19.3(2010)}', value: '4' },
        { id: '5', label: 'Certificate Of Conformance', value: '5' },
        { id: '6', label: 'Certificate Of Compliance', value: '6' },
        { id: '7', label: 'Certificate Of Origin', value: '7' },
        { id: '8', label: 'Warranty Certificate (Only for manufacturing defect)', value: '8' },
        { id: 'Z', label: 'None', value: 'Z' }
      ]
    }
  ]
};