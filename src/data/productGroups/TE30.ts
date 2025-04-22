import { ProductGroup } from '../../types';

export const TE30: ProductGroup = {
  id: 'TE30',
  name: 'TE30',
  imageUrl: 'te30.png',
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
        { id: 'PT', label: 'PT100 RTD', value: 'PT' },
        { id: 'Y1', label: 'Special version to be specified', value: 'Y1' }
      ]
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: null,
      options: [
        { id: 'C1', label: 'Class 1', value: 'C1' },
        { id: 'C2', label: 'Class 2', value: 'C2' },
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
        { id: 'S2', label: 'Single Element, 2 Wires', value: 'S2' },
        { id: 'D4', label: 'Dual Element, 4 Wires', value: 'D4' },
        { id: 'S3', label: 'Single Element, 3 Wires', value: 'S3' },
        { id: 'S4', label: 'Single Element, 4 Wires', value: 'S4' },
        { id: 'D6', label: 'Dual Element, 6 Wires', value: 'D6' }
      ]
    },
    {
      id: 'protection-tube-type',
      label: 'Protection Tube Type',
      value: null,
      options: [
        { id: 'T1', label: 'Tubing 9.5 mm OD x 7 mm ID - SS316/L', value: 'T1' },
        { id: 'T2', label: 'Tubing 12.7 mm OD x 10.2 mm ID - SS316/L', value: 'T2' },
        { id: 'P1', label: '1/4" Pipe - Sch 40 - SS316/L', value: 'P1' },
        { id: 'P2', label: '3/8" Pipe - Sch 40 - SS316/L', value: 'P2' },
        { id: 'P3', label: '1/2" Pipe - Sch 40 - SS316/L', value: 'P3' },
        { id: 'Y2', label: 'Special version to be specified', value: 'Y2' }
      ]
    },
    {
      id: 'protection-tube-length',
      label: 'Protection Tube Length (mm)',
      value: null,
      isCustom: true,
      placeholder: 'Enter value in mm (e.g. 500 for 500mm)'
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
        { id: 'F2', label: '1-1/2" 150# RF', value: 'F2' },
        { id: 'F3', label: '2" 150# RF', value: 'F3' },
        { id: 'Y3', label: 'Special version to be specified', value: 'Y3' }
      ]
    },
    {
      id: 'connection-head',
      label: 'Connection Head',
      value: null,
      options: [
        { id: 'KNE', label: 'KNE (Aluminum)', value: 'KNE' },
        { id: 'KNE-SS', label: 'KNE-SS (Stainless Steel)', value: 'KNE-SS' },
        { id: 'KSE', label: 'KSE (Aluminum)', value: 'KSE' },
        { id: 'KD', label: 'KD (Aluminum)', value: 'KD' },
        { id: 'KF', label: 'KF (Aluminum)', value: 'KF' },
        { id: 'T', label: 'Terminal Block', value: 'T' },
        { id: 'Z', label: 'Without Connection Head', value: 'Z' },
        { id: 'Y4', label: 'Special version to be specified', value: 'Y4' }
      ]
    }
  ]
};