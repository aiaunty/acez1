import { ProductGroup } from '../../types';

export const AS_WT_2010: ProductGroup = {
  id: 'AS-WT-2010',
  name: 'AS-WT-2010',
  imageUrl: 'as-wt-2010.png',
  categories: [
    {
      id: 'thermowell-material',
      label: 'Thermowell Material',
      value: null,
      options: [
        { id: 'M1', label: 'SS 316', value: 'M1' },
        { id: 'M2', label: 'SS 316L', value: 'M2' },
        { id: 'M3', label: 'SS 304', value: 'M3' },
        { id: 'M4', label: 'SS 321', value: 'M4' },
        { id: 'M5', label: 'INC 600', value: 'M5' },
        { id: 'Y1', label: 'Special version, to be specified', value: 'Y1' }
      ]
    },
    {
      id: 'process-connection',
      label: 'Process Connection',
      value: null,
      options: [
        { id: 'P1', label: '1/2" NPT', value: 'P1' },
        { id: 'P2', label: '3/4" NPT', value: 'P2' },
        { id: 'P3', label: '1" NPT', value: 'P3' },
        { id: 'P4', label: '1/2" BSPT', value: 'P4' },
        { id: 'P5', label: '3/4" BSPT', value: 'P5' },
        { id: 'P6', label: '1" BSPT', value: 'P6' },
        { id: 'F1', label: '1" 150# RF', value: 'F1' },
        { id: 'F2', label: '1" 300# RF', value: 'F2' },
        { id: 'F3', label: '1" 600# RF', value: 'F3' },
        { id: 'F4', label: '1.5" 150# RF', value: 'F4' },
        { id: 'F5', label: '1.5" 300# RF', value: 'F5' },
        { id: 'F6', label: '1.5" 600# RF', value: 'F6' },
        { id: 'Y2', label: 'Special version, to be specified', value: 'Y2' }
      ]
    },
    {
      id: 'bore-diameter',
      label: 'Bore Diameter',
      value: null,
      options: [
        { id: 'B1', label: '6.6 mm', value: 'B1' },
        { id: 'B2', label: '8.5 mm', value: 'B2' },
        { id: 'B3', label: '11 mm', value: 'B3' },
        { id: 'Y3', label: 'Special version, to be specified', value: 'Y3' }
      ]
    },
    {
      id: 'thermowell-type',
      label: 'Thermowell Type',
      value: null,
      options: [
        { id: 'T1', label: 'Straight', value: 'T1' },
        { id: 'T2', label: 'Tapered', value: 'T2' },
        { id: 'T3', label: 'Stepped', value: 'T3' },
        { id: 'Y4', label: 'Special version, to be specified', value: 'Y4' }
      ]
    },
    {
      id: 'immersion-length',
      label: 'Immersion Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 100 for 100mm)'
    },
    {
      id: 'connection-head',
      label: 'Connection Head',
      value: null,
      options: [
        { id: 'AS-XDA', label: 'Explosion-proof, AS-XDA, Die Cast Aluminium, Blue Colour', value: 'AS-XDA' },
        { id: 'AS-XDS', label: 'Explosion-proof, AS-XDS, Stainless Steel, SS Colour', value: 'AS-XDS' },
        { id: 'Z', label: 'None', value: 'Z' },
        { id: 'Y5', label: 'Special version, to be specified', value: 'Y5' }
      ]
    },
    {
      id: 'mounting-connection',
      label: 'Mounting Connection',
      value: null,
      options: [
        { id: 'P', label: '1/2" NPT', value: 'P' },
        { id: 'Q', label: '3/4" NPT', value: 'Q' },
        { id: 'R', label: 'M20 x 1.5', value: 'R' },
        { id: 'Y6', label: 'Special version, to be specified', value: 'Y6' }
      ]
    },
    {
      id: 'extension-nipple-type',
      label: 'Extension Nipple Type',
      value: null,
      options: [
        { id: '1', label: 'Nipple, 1/2" NPT', value: '1' },
        { id: '2', label: 'Union, 1/2" NPT', value: '2' },
        { id: '3', label: 'Nipple-Union-Nipple, 1/2" NPT', value: '3' },
        { id: '4', label: 'Nipple-Union-Nipple, 3/4" NPT', value: '4' },
        { id: 'Z', label: 'None', value: 'Z' },
        { id: 'Y7', label: 'Special version, to be specified', value: 'Y7' }
      ]
    },
    {
      id: 'extension-nipple-length',
      label: 'Extension Nipple Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 150 for 150mm)'
    }
  ]
};