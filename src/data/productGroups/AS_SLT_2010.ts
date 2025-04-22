import { ProductGroup } from '../../types';

export const AS_SLT_2010: ProductGroup = {
  id: 'AS-SLT-2010',
  name: 'AS-SLT-2010',
  imageUrl: 'as-slt-2010.png',
  categories: [
    {
      id: 'sensor-type',
      label: 'Sensor Type',
      value: null,
      options: [
        { id: 'K', label: 'Type K Thermocouple', value: 'K' },
        { id: 'J', label: 'Type J Thermocouple', value: 'J' },
        { id: 'T', label: 'Type T Thermocouple', value: 'T' },
        { id: 'E', label: 'Type E Thermocouple', value: 'E' },
        { id: 'R', label: 'Type R Thermocouple', value: 'R' },
        { id: 'Y1', label: 'Special version, to be specified', value: 'Y1' }
      ]
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: null,
      options: [
        { id: 'C1', label: 'Class 1 (Thermocouple)', value: 'C1' },
        { id: 'C2', label: 'Class 2 (Thermocouple)', value: 'C2' },
        { id: 'CA', label: 'Class A (RTD)', value: 'CA' },
        { id: 'CB', label: 'Class B (RTD)', value: 'CB' }
      ]
    },
    {
      id: 'element-wires',
      label: 'Element & Wires',
      value: null,
      options: [
        { id: 'S2', label: 'Single element, 2-wire (RTD)', value: 'S2' },
        { id: 'D4', label: 'Dual element, 4-wire (RTD)', value: 'D4' },
        { id: 'S3', label: 'Single element, 3-wire (RTD)', value: 'S3' },
        { id: 'S4', label: 'Single element, 4-wire (RTD)', value: 'S4' }
      ]
    },
    {
      id: 'sheath-material',
      label: 'Sheath Material',
      value: null,
      options: [
        { id: 'M1', label: 'SS 316', value: 'M1' },
        { id: 'M2', label: 'INC 600', value: 'M2' },
        { id: 'Y2', label: 'Special version, to be specified', value: 'Y2' }
      ]
    },
    {
      id: 'sheath-length',
      label: 'Sheath Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 500 for 500mm)'
    },
    {
      id: 'connection-head',
      label: 'Connection Head',
      value: null,
      options: [
        { id: 'AS-XDA', label: 'Explosion-proof, AS-XDA, Die Cast Aluminium, Blue Colour', value: 'AS-XDA' },
        { id: 'AS-XDS', label: 'Explosion-proof, AS-XDS, Stainless Steel, SS Colour', value: 'AS-XDS' },
        { id: 'T', label: 'Terminal Block', value: 'T' },
        { id: 'Z', label: 'None', value: 'Z' },
        { id: 'Y8', label: 'Special version, to be specified', value: 'Y8' }
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
        { id: 'Y9', label: 'Special version, to be specified', value: 'Y9' }
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
        { id: 'Y10', label: 'Special version, to be specified', value: 'Y10' }
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