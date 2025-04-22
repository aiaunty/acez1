import { ProductGroup } from '../../types';

export const TE11_RTD: ProductGroup = {
  id: 'TE11-RTD',
  name: 'TE11-RTD',
  imageUrl: 'te11-rtd.png',
  categories: [
    {
      id: 'sensor-type',
      label: 'Sensor Type',
      value: null,
      options: [
        { id: 'R', label: 'PT100 RTD', value: 'R' }
      ]
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: null,
      options: [
        { id: 'CA', label: 'Class A', value: 'CA' },
        { id: 'CB', label: 'Class B', value: 'CB' },
        { id: 'D1/3', label: '1/3 DIN', value: 'D1/3' },
        { id: 'D1/5', label: '1/5 DIN', value: 'D1/5' }
      ]
    },
    {
      id: 'element-wires',
      label: 'Element & Wires',
      value: null,
      options: [
        { id: 'S3', label: 'Single Element, 3 Wires', value: 'S3' },
        { id: 'S4', label: 'Single Element, 4 Wires', value: 'S4' },
        { id: 'D6', label: 'Dual Element, 6 Wires', value: 'D6' }
      ]
    },
    {
      id: 'sheath-material',
      label: 'Sheath Material',
      value: null,
      options: [
        { id: '1', label: 'SS 316', value: '1' }
      ]
    },
    {
      id: 'sheath-diameter',
      label: 'Sheath Diameter',
      value: null,
      options: [
        { id: '1', label: '3.0 mm', value: '1' },
        { id: '2', label: '4.5 mm', value: '2' },
        { id: '3', label: '6.0 mm', value: '3' },
        { id: '4', label: '8.0 mm', value: '4' }
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
      id: 'wire-junction',
      label: 'Wire Junction',
      value: null,
      options: [
        { id: 'U', label: 'Ungrounded', value: 'U' },
        { id: 'G', label: 'Grounded', value: 'G' }
      ]
    },
    {
      id: 'sensor-connection-style',
      label: 'Sensor Connection Style',
      value: null,
      options: [
        { id: 'Z', label: 'Without Connection Head', value: 'Z' },
        { id: '1', label: 'Standard Plug', value: '1' },
        { id: '2', label: 'Standard Jack', value: '2' },
        { id: '3', label: 'Miniature Plug', value: '3' },
        { id: '4', label: 'Miniature Jack', value: '4' },
        { id: '5', label: 'Miniature Plug with Cable Clamp', value: '5' },
        { id: '6', label: 'Standard Lemo Plug', value: '6' },
        { id: '7', label: 'Miniature Lemo Plug', value: '7' },
        { id: '8', label: 'Ceramic Terminal Block', value: '8' },
        { id: '9', label: 'DIN Connection Head', value: '9' },
        { id: '10', label: 'Spade Lugs', value: '10' },
        { id: 'Y9', label: 'Special version, to be specified', value: 'Y9' }
      ]
    },
    {
      id: 'extension-wire-length',
      label: 'Extension Wire Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 1000 for 1000mm)'
    },
    {
      id: 'wire-insulation',
      label: 'Wire Insulation (AWG 24)',
      value: null,
      options: [
        { id: 'L', label: 'PFA/PFA (260°C)', value: 'L' },
        { id: 'M', label: 'Fiberglass/Fiberglass (480°C)', value: 'M' },
        { id: 'N', label: 'PFA/Fiberglass (260°C)', value: 'N' },
        { id: 'O', label: 'PVC/PVC (105°C)', value: 'O' },
        { id: 'P', label: 'TFE/TFE (260°C)', value: 'P' },
        { id: 'C', label: 'Ceramic Fiber (1090°C)', value: 'C' },
        { id: 'Q', label: 'High Temperature Fiberglass (704°C)', value: 'Q' },
        { id: 'Z', label: 'Without Extension Wire', value: 'Z' },
        { id: 'Y10', label: 'Special version, to be specified', value: 'Y10' }
      ]
    },
    {
      id: 'wire-termination',
      label: 'Wire Termination',
      value: null,
      options: [
        { id: '1', label: 'Standard Plug', value: '1' },
        { id: '2', label: 'Standard Jack', value: '2' },
        { id: '3', label: 'Miniature Plug', value: '3' },
        { id: '4', label: 'Miniature Jack', value: '4' },
        { id: '5', label: 'Spade Lugs', value: '5' },
        { id: '6', label: 'Stripped Leads', value: '6' },
        { id: 'Y12', label: 'Special version, to be specified', value: 'Y12' }
      ]
    },
    {
      id: 'additional-options',
      label: 'Additional Option',
      value: null,
      options: [
        { id: 'Z', label: 'None', value: 'Z' },
        { id: 'X1', label: 'With Compression Fitting', value: 'X1' },
        { id: 'X2', label: 'With Compression Fitting', value: 'X2' },
        { id: 'X3', label: 'With Flexible Armour', value: 'X3' },
        { id: 'Y13', label: 'Special version, to be specified', value: 'Y13' },
        { id: 'U', label: 'With Flexible Armour and Compression Fitting', value: 'U' }
      ]
    },
    {
      id: 'flexible-armour-size',
      label: 'Flexible Armour Size',
      value: null,
      options: [
        { id: 'A1', label: '6.0 mm', value: 'A1' },
        { id: 'A2', label: '8.0 mm', value: 'A2' },
        { id: 'A3', label: '10.0 mm', value: 'A3' },
        { id: 'A4', label: '13.0 mm', value: 'A4' }
      ]
    },
    {
      id: 'flexible-armour-length',
      label: 'Flexible Armour Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 1000 for 1000mm)'
    },
    {
      id: 'compression-fitting',
      label: 'Compression Fitting (SS316)',
      value: null,
      options: [
        { id: '1', label: '1/8" NPT', value: '1' },
        { id: '2', label: '1/4" NPT', value: '2' },
        { id: '3', label: '3/8" NPT', value: '3' },
        { id: '4', label: '1/2" NPT', value: '4' },
        { id: '5', label: '1/8" BSPT', value: '5' },
        { id: '6', label: '1/4" BSPT', value: '6' },
        { id: '7', label: '3/8" BSPT', value: '7' },
        { id: '8', label: '1/2" BSPT', value: '8' },
        { id: '9', label: 'M8 x 1', value: '9' },
        { id: '10', label: 'M10 x 1', value: '10' },
        { id: 'Y17', label: 'Special version, to be specified', value: 'Y17' },
        { id: 'Z', label: 'Without Compression Fitting', value: 'Z' }
      ]
    }
  ]
};