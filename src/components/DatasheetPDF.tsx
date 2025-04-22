import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ProductProgress, ModelCode } from '../types';
import { productGroups } from '../data/productGroups';

// Register fonts to avoid PDF rendering issues
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Oblique.ttf', fontStyle: 'italic' },
  ]
});

interface DatasheetPDFProps {
  progress: ProductProgress[];
  modelCodes: ModelCode[];
  logoUrl: string | null;
  productImageUrl: string | null;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 42,
    objectFit: 'contain',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 280,
    objectFit: 'contain',
    marginBottom: 5,
  },
  imageDisclaimer: {
    fontSize: 6,
    color: '#6b7280',
    marginBottom: 10,
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#111827',
    paddingBottom: 3,
  },
  modelCode: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    padding: '4 0',
    fontSize: 15,
    marginBottom: 10,
    letterSpacing: 0.5,
    color: '#111827',
  },
  specificationRow: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  specLabel: {
    width: '35%',
    paddingRight: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 9,
  },
  specValue: {
    width: '65%',
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  paragraph: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    marginBottom: 6,
    lineHeight: 1.3,
  },
  list: {
    marginTop: 3,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    fontSize: 8,
    color: '#6b7280',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    fontFamily: 'Helvetica',
  },
  footerText: {
    marginBottom: 1,
    lineHeight: 1.3,
  },
  disclaimer: {
    fontSize: 8,
    color: '#6b7280',
    lineHeight: 1.3,
    marginTop: 1,
    fontFamily: 'Helvetica',
  },
  descriptionsContainer: {
    marginTop: 10,
  }
});

export const DatasheetPDF: React.FC<DatasheetPDFProps> = ({ progress, modelCodes, logoUrl, productImageUrl }) => {
  // For TE-SERIES, use the sensor construction value as the product group in the model code
  const isTESeries = progress[0]?.value === 'TE-SERIES' || progress[0]?.value === 'TE20/21/22-SERIES';
  const sensorConstruction = isTESeries ? 
    progress.find(item => item.category === 'Sensor Construction')?.value : null;
  
  // Generate model code string with the appropriate prefix for TE series
  let modelCodeString = '';
  if (modelCodes.length > 0) {
    if (isTESeries && sensorConstruction) {
      // For TE series, use the sensor construction (TE20, TE21, TE22) as prefix
      modelCodeString = `${sensorConstruction}-${modelCodes.slice(1).map(mc => mc.code).join('-')}`;
    } else {
      // For other product groups, include the product group as prefix
      modelCodeString = `${progress[0]?.value}-${modelCodes.map(mc => mc.code).join('-')}`;
    }
  }

  const productGroup = progress[0]?.value;
  let productName = '';
  
  if (productGroup === 'AS-SLT-2010') {
    productName = 'Explosion-Proof Temperature Sensor Assembly';
  } else if (productGroup === 'AS-WT-2010') {
    productName = 'Explosion-Proof Thermowell Assembly';
  } else if (productGroup === 'TE-SERIES' || productGroup === 'TE20/21/22-SERIES') {
    if (sensorConstruction === 'TE20') {
      productName = 'Fixed Type Temperature Sensor';
    } else if (sensorConstruction === 'TE21') {
      productName = 'Spring Loaded Type Temperature Sensor (Base Plate)';
    } else if (sensorConstruction === 'TE22') {
      productName = 'Spring Loaded Type Temperature Sensor (Hexagonal)';
    }
  } else if (productGroup === 'TE11-TC') {
    productName = 'Thermocouple Sensor';
  } else if (productGroup === 'TE11-RTD') {
    productName = 'RTD Temperature Sensor';
  } else if (productGroup === 'TE30') {
    productName = 'Sensor Assembly With Protection Pipe/Tube Thermowell';
  } else if (productGroup === 'TW511') {
    productName = 'Flanged Thermowell';
  } else if (productGroup === 'TW512') {
    productName = 'Threaded or Welded Thermowell';
  }

  const currentDate = new Date().toLocaleDateString('en-GB');
  const currentYear = new Date().getFullYear();

  const getDescription = (category: string, value: string): string => {
    if (!progress[0]?.value) return value;
    
    const group = productGroups.find(g => g.name === progress[0].value);
    if (!group) return value;

    const categoryData = group.categories.find(c => c.label === category);
    if (!categoryData) return value;

    if (categoryData.isCustom) return value;

    // Handle multiple selections for Optional Certificates
    if (category === 'Optional Certificates' && value.includes(',')) {
      const certificateValues = value.split(',');
      const certificateDescriptions = certificateValues.map(certValue => {
        const option = categoryData.options?.find(opt => opt.value === certValue.trim());
        return option?.label || certValue.trim();
      });
      return certificateDescriptions.join('\n');
    }

    const option = categoryData.options?.find(opt => opt.value === value);
    return option?.label || value;
  };

  const renderFooter = () => (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        Generated on {currentDate} • Copyright {currentYear} Acez Instruments Pte Ltd
      </Text>
      <Text style={styles.footerText}>
        For quotation request and custom requirements, please contact us at sensing_techsupport@acez.com.sg
      </Text>
      <Text style={styles.disclaimer}>
        Important Notice: Acez reserves the right to make changes to or discontinue any product or service identified in this publication without notice. Acez advises its customers to obtain the latest version of the relevant information to verify, before placing any orders, that the information being relied upon is current.
      </Text>
    </View>
  );

  return (
    <Document>
      {/* First Page - Specifications */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {logoUrl && (
              <Image src={logoUrl} style={styles.logo} />
            )}
            {productName && (
              <Text style={styles.headerTitle}>
                {productGroup} {productName}
              </Text>
            )}
          </View>
        </View>

        <View>
          {productImageUrl && (
            <>
              <Image src={productImageUrl} style={styles.productImage} />
              <Text style={styles.imageDisclaimer}>
                * This image is for general representation of the product group only
              </Text>
            </>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Model Code</Text>
            <Text style={styles.modelCode}>{modelCodeString}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {progress.map((item, index) => (
              index > 0 && (
                <View key={item.category} style={styles.specificationRow}>
                  <Text style={styles.specLabel}>{item.category}:</Text>
                  {item.category === 'Optional Certificates' && item.value.includes(',') ? (
                    <View style={styles.specValue}>
                      {item.value.split(',').map((value, i) => (
                        <Text key={i}>{getDescription(item.category, value.trim())}</Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specValue}>
                      {getDescription(item.category, item.value)}
                    </Text>
                  )}
                </View>
              )
            ))}
          </View>
        </View>

        {renderFooter()}
      </Page>

      {/* Second Page - Product Details */}
      <Page size="A4" style={styles.page}>
        <View>
          {productGroup === 'AS-SLT-2010' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez Model AS-SLT-2010 Explosion-Proof Temperature Sensor is the ideal product for hazardous temperature measurement applications.
                </Text>
                <Text style={styles.paragraph}>
                  A wide variety of possible combinations of sensor, connection head, insertion length, extension nipple length, connection to thermowell etc. are available for the thermometers; suitable for almost any thermowell dimension.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• IECEx/ATEX and CSA approved</Text>
                  <Text style={styles.listItem}>• Customised fabrication according to customer specifications</Text>
                  <Text style={styles.listItem}>• For mounting in thermowells</Text>
                  <Text style={styles.listItem}>• Spring-loaded measuring insert (replaceable sensor)</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Chemical and petrochemical industries</Text>
                  <Text style={styles.listItem}>• Machinery, plant and tank measurement</Text>
                  <Text style={styles.listItem}>• Oil and gas industries</Text>
                  <Text style={styles.listItem}>• Power and utilities</Text>
                  <Text style={styles.listItem}>• Pulp and paper</Text>
                  <Text style={styles.listItem}>• Explosive process environments</Text>
                  <Text style={styles.listItem}>• Offshore HVAC monitoring</Text>
                </View>
              </View>
            </>
          )}

          {productGroup === 'AS-WT-2010' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez Model AS-WT-2010 Explosion-Proof Thermowell Assembly is designed for hazardous area temperature measurement applications where process isolation is required.
                </Text>
                <Text style={styles.paragraph}>
                  Available in various materials, process connections, and immersion lengths to suit a wide range of industrial applications and process requirements.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• IECEx/ATEX and CSA approved</Text>
                  <Text style={styles.listItem}>• Multiple thermowell designs (straight, tapered, stepped)</Text>
                  <Text style={styles.listItem}>• Various process connection options</Text>
                  <Text style={styles.listItem}>• High-quality materials for corrosive environments</Text>
                  <Text style={styles.listItem}>• Compatible with explosion-proof connection heads</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Chemical and petrochemical industries</Text>
                  <Text style={styles.listItem}>• Oil and gas processing</Text>
                  <Text style={styles.listItem}>• Refineries</Text>
                  <Text style={styles.listItem}>• Power generation</Text>
                  <Text style={styles.listItem}>• High-pressure applications</Text>
                  <Text style={styles.listItem}>• Corrosive environments</Text>
                  <Text style={styles.listItem}>• Hazardous area installations</Text>
                </View>
              </View>
            </>
          )}

          {(productGroup === 'TE-SERIES' || productGroup === 'TE20/21/22-SERIES') && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez {sensorConstruction} Temperature Sensor is designed for industrial temperature measurement applications with high accuracy and reliability.
                </Text>
                <Text style={styles.paragraph}>
                  Available with a wide range of sensor types, connection heads, and mounting options to suit various industrial requirements and process connections.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Weatherproof design with IP68 rated connection heads</Text>
                  <Text style={styles.listItem}>• High accuracy temperature measurement</Text>
                  <Text style={styles.listItem}>• Customizable sheath length and diameter</Text>
                  <Text style={styles.listItem}>• Compatible with various mounting connections</Text>
                  <Text style={styles.listItem}>• Optional compression fittings available</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Process industries</Text>
                  <Text style={styles.listItem}>• Furnaces</Text>
                  <Text style={styles.listItem}>• Water treatment facilities</Text>
                  <Text style={styles.listItem}>• Power generation</Text>
                  <Text style={styles.listItem}>• Manufacturing processes</Text>
                </View>
              </View>
            </>
          )}
          
          {productGroup === 'TE11-TC' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez TE11-TC Thermocouple Sensor is designed for versatile temperature measurement applications requiring high accuracy and reliability.
                </Text>
                <Text style={styles.paragraph}>
                  Available with multiple thermocouple types, connection styles, and customizable configurations to meet specific industrial requirements.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Multiple thermocouple types (K, J, T, E)</Text>
                  <Text style={styles.listItem}>• Various sheath diameters and materials</Text>
                  <Text style={styles.listItem}>• Customizable sheath length</Text>
                  <Text style={styles.listItem}>• Multiple connection styles and termination options</Text>
                  <Text style={styles.listItem}>• Optional flexible armour and compression fittings</Text>
                  <Text style={styles.listItem}>• Various wire insulation options for different environments</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Process industries</Text>
                  <Text style={styles.listItem}>• Laboratory and research facilities</Text>
                  <Text style={styles.listItem}>• Food and beverage processing</Text>
                  <Text style={styles.listItem}>• Automotive testing</Text>
                  <Text style={styles.listItem}>• HVAC systems</Text>
                  <Text style={styles.listItem}>• Plastics and rubber manufacturing</Text>
                  <Text style={styles.listItem}>• General industrial temperature measurement</Text>
                </View>
              </View>
            </>
          )}

          {productGroup === 'TE11-RTD' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez TE11-RTD Temperature Sensor is designed for precision temperature measurement applications requiring high stability and accuracy.
                </Text>
                <Text style={styles.paragraph}>
                  Available with various connection styles, wire configurations, and customizable options to meet specific industrial requirements.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• High accuracy PT100 RTD elements</Text>
                  <Text style={styles.listItem}>• Multiple accuracy classes available (Class A, Class B, 1/3 DIN, 1/5 DIN)</Text>
                  <Text style={styles.listItem}>• Various sheath diameters and materials</Text>
                  <Text style={styles.listItem}>• Customizable sheath length</Text>
                  <Text style={styles.listItem}>• Single and dual element configurations</Text>
                  <Text style={styles.listItem}>• Multiple connection styles and termination options</Text>
                  <Text style={styles.listItem}>• Optional flexible armour and compression fittings</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Precision temperature measurement</Text>
                  <Text style={styles.listItem}>• Laboratory and research facilities</Text>
                  <Text style={styles.listItem}>• Food and pharmaceutical processing</Text>
                  <Text style={styles.listItem}>• HVAC systems</Text>
                  <Text style={styles.listItem}>• Process industries</Text>
                  <Text style={styles.listItem}>• Environmental monitoring</Text>
                  <Text style={styles.listItem}>• Medical equipment</Text>
                  <Text style={styles.listItem}>• Calibration systems</Text>
                </View>
              </View>
            </>
          )}

          {productGroup === 'TE30' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez TE30 Sensor Assembly With Protection Pipe/Tube Thermowell is designed for industrial temperature measurement applications where a simple, cost-effective solution is required.
                </Text>
                <Text style={styles.paragraph}>
                  Available with various sensor types, protection tubes, and customizable configurations to meet specific industrial requirements.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Ideal for application where pressure and flow are not major concern</Text>
                  <Text style={styles.listItem}>• Economy installation</Text>
                  <Text style={styles.listItem}>• Cost is generally lower than drilled bar stock thermowell and longer length is applicable</Text>
                  <Text style={styles.listItem}>• Various protection tube options (tubing or pipe)</Text>
                  <Text style={styles.listItem}>• Multiple process connection options</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Process industries</Text>
                  <Text style={styles.listItem}>• HVAC systems</Text>
                  <Text style={styles.listItem}>• Water treatment facilities</Text>
                  <Text style={styles.listItem}>• Food and beverage processing</Text>
                  <Text style={styles.listItem}>• General industrial temperature measurement</Text>
                  <Text style={styles.listItem}>• Low pressure applications</Text>
                </View>
              </View>
            </>
          )}

          {productGroup === 'TW511' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez TW511 Flanged Thermowell is designed for high-pressure and high-temperature applications where robust process isolation is required.
                </Text>
                <Text style={styles.paragraph}>
                  Available with various flange types, pressure classes, and materials to suit a wide range of industrial applications and process requirements.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• High-pressure capability up to Class 2500</Text>
                  <Text style={styles.listItem}>• Multiple flange face options (RF, RTJ)</Text>
                  <Text style={styles.listItem}>• Various material options for corrosive environments</Text>
                  <Text style={styles.listItem}>• Tapered stem design for improved strength</Text>
                  <Text style={styles.listItem}>• Full penetration or sealed weld options</Text>
                  <Text style={styles.listItem}>• Customizable insertion length</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Refineries and petrochemical plants</Text>
                  <Text style={styles.listItem}>• Power generation facilities</Text>
                  <Text style={styles.listItem}>• High-pressure steam systems</Text>
                  <Text style={styles.listItem}>• Chemical processing</Text>
                  <Text style={styles.listItem}>• Offshore oil and gas platforms</Text>
                  <Text style={styles.listItem}>• High-temperature applications</Text>
                  <Text style={styles.listItem}>• Corrosive process environments</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Testing Standards</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Material Certificate EN 10204-3.1B</Text>
                  <Text style={styles.listItem}>• Hydrostatic Test ASME B16.5</Text>
                  <Text style={styles.listItem}>• Dye Penetration Test ASTM E165</Text>
                  <Text style={styles.listItem}>• Wake Frequency ASME PTC 19.3</Text>
                  <Text style={styles.listItem}>• NACE Hardness NACE MR 01-03</Text>
                  <Text style={styles.listItem}>• PMI ASME Section II</Text>
                  <Text style={styles.listItem}>• MPI ASME B31.3-2008</Text>
                  <Text style={styles.listItem}>• Radiograph Test ASME B31.3-2008</Text>
                  <Text style={styles.listItem}>• Ultrasonic Test ASME B31.3-2008</Text>
                </View>
                <Text style={styles.paragraph}>
                  Note: Other testing will be available upon request.
                </Text>
              </View>
            </>
          )}

          {productGroup === 'TW512' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.paragraph}>
                  Acez TW512 Threaded or Welded Thermowell is designed for industrial temperature measurement applications where process isolation is required.
                </Text>
                <Text style={styles.paragraph}>
                  Available with various process connections, materials, and customizable configurations to meet specific industrial requirements.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Features</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Multiple process connection options (threaded or welded)</Text>
                  <Text style={styles.listItem}>• Various material options for different environments</Text>
                  <Text style={styles.listItem}>• Multiple stem designs (tapered, straight, stepped)</Text>
                  <Text style={styles.listItem}>• Customizable insertion length</Text>
                  <Text style={styles.listItem}>• Standard 1/2" NPT instrument connection</Text>
                  <Text style={styles.listItem}>• Cost-effective solution for standard applications</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Applications</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Process industries</Text>
                  <Text style={styles.listItem}>• Chemical processing</Text>
                  <Text style={styles.listItem}>• Power generation</Text>
                  <Text style={styles.listItem}>• Oil and gas processing</Text>
                  <Text style={styles.listItem}>• Food and beverage processing</Text>
                  <Text style={styles.listItem}>• Water treatment facilities</Text>
                  <Text style={styles.listItem}>• HVAC systems</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Testing Standards</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Material Certificate EN 10204-3.1B</Text>
                  <Text style={styles.listItem}>• Hydrostatic Test ASME B16.5</Text>
                  <Text style={styles.listItem}>• Dye Penetration Test ASTM E165</Text>
                  <Text style={styles.listItem}>• Wake Frequency ASME PTC 19.3</Text>
                  <Text style={styles.listItem}>• Certificate of Conformance</Text>
                  <Text style={styles.listItem}>• Certificate of Compliance</Text>
                </View>
                <Text style={styles.paragraph}>
                  Note: Other testing will be available upon request.
                </Text>
              </View>
            </>
          )}
        </View>

        {renderFooter()}
      </Page>
    </Document>
  );
};

export default DatasheetPDF;