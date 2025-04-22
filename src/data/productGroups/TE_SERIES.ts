import { ProductGroup } from '../../types';

export const TE_SERIES: ProductGroup = {
  id: 'TE20/21/22-SERIES',
  name: 'TE20/21/22-SERIES',
  imageUrl: 'te-series.png',
  categories: [
    {
      id: 'sensor-construction',
      label: 'Sensor Construction',
      value: null,
      options: [
        { id: 'TE20', label: 'TE20 - Fixed Type', value: 'TE20' },
        { id: 'TE21', label: 'TE21 - Spring Loaded Type (Base Plate)', value: 'TE21' },
        { id: 'TE22', label: 'TE22 - Spring Loaded Type (Hexagonal)', value: 'TE22' }
      ]
    },
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
        { id: 'CB', label: 'Class B (RTD)', value: 'CB' },
        { id: 'D1/3', label: '1/3 DIN (RTD)', value: 'D1/3' },
        { id: 'D1/5', label: '1/5 DIN (RTD)', value: 'D1/5' }
      ]
    },
    {
      id: 'element-wires',
      label: 'Number of elements & wires',
      value: null,
      options: [
        { id: 'S2', label: 'Single element, 2-wire (RTD)', value: 'S2' },
        { id: 'D4', label: 'Dual element, 4-wire (RTD)', value: 'D4' },
        { id: 'S3', label: 'Single element, 3-wire (RTD)', value: 'S3' },
        { id: 'S4', label: 'Single element, 4-wire (RTD)', value: 'S4' },
        { id: 'D6', label: 'Dual element, 3-wire (RTD)', value: 'D6' }
      ]
    },
    {
      id: 'sheath-material',
      label: 'Sheath Material',
      value: null,
      options: [
        { id: '1', label: 'SS 316', value: '1' },
        { id: '2', label: 'INC 600', value: '2' }
      ]
    },
    {
      id: 'sheath-diameter',
      label: 'Sheath Diameter',
      value: null,
      options: [
        { id: '1', label: '3 mm', value: '1' },
        { id: '2', label: '6 mm', value: '2' },
        { id: '3', label: '8 mm', value: '3' }
      ]
    },
    {
      id: 'sheath-length',
      label: 'Sheath Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 100 for 100mm)'
    },
    {
      id: 'connection-head',
      label: 'Connection Head',
      value: null,
      options: [
        { id: 'KNE', label: 'Weatherproof, KNE, Die Cast Aluminium, Blue Colour, IP68', value: 'KNE' },
        { id: 'KNE-SS', label: 'Weatherproof, KNE, Stainless Steel, SS Colour, IP 68', value: 'KNE-SS' },
        { id: 'KSE', label: 'Weatherproof, KSE, Die Cast Aluminium, Blue Colour, IP68', value: 'KSE' },
        { id: 'KD', label: 'Weatherproof, KD, Die Cast Aluminium, Blue Colour, IP68', value: 'KD' },
        { id: 'KF', label: 'Weatherproof, KF, Die Cast Aluminium, Blue Colour, IP68', value: 'KF' },
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
        { id: 'MT1', label: '1/2" NPT', value: 'MT1' },
        { id: 'MT2', label: '3/4" NPT', value: 'MT2' },
        { id: 'MT3', label: 'M20 x 1.5', value: 'MT3' },
        { id: 'Y9', label: 'Special version, to be specified', value: 'Y9' }
      ]
    },
    {
      id: 'extension-nipple',
      label: 'Extension Nipple',
      value: null,
      options: [
        { id: '1', label: 'Nipple, 1/2" NPT', value: '1' },
        { id: '2', label: 'Union, 1/2" NPT', value: '2' },
        { id: '3', label: 'Nipple-Union-Nipple, 1/2" NPT', value: '3' },
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
    },
    {
      id: 'additional-options',
      label: 'Additional Options',
      value: null,
      options: [
        { id: 'Z', label: 'None', value: 'Z' },
        { id: 'X1', label: 'With compression fitting', value: 'X1' },
        { id: 'Y11', label: 'Special version, to be specified', value: 'Y11' }
      ]
    },
    {
      id: 'compression-fitting',
      label: 'Compression Fitting',
      value: null,
      options: [
        { id: '1', label: '1/2" NPT', value: '1' },
        { id: '2', label: '3/4" NPT', value: '2' },
        { id: '3', label: '1/2" BSPT', value: '3' },
        { id: '4', label: '3/4" BSPT', value: '4' },
        { id: 'Z', label: 'None', value: 'Z' },
        { id: 'Y12', label: 'Special version, to be specified', value: 'Y12' }
      ]
    }
  ]
};