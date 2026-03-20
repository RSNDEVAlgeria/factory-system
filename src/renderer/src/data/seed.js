export const initialParts = [
  {
    id: 'P-1001',
    partNumber: 'P-1001',
    name: 'Brake Pad Front',
    category: 'Brakes',
    quantity: 42,
    purchasePrice: 35.0,
    salePrice: 59.99,
    supplier: 'Brembo',
    threshold: 15,
    location: 'R1-A3',
  },
  {
    id: 'P-1002',
    partNumber: 'P-1002',
    name: 'Oil Filter',
    category: 'Engine',
    quantity: 18,
    purchasePrice: 8.5,
    salePrice: 14.5,
    supplier: 'Bosch',
    threshold: 20,
    location: 'R2-B1',
  },
  {
    id: 'P-1003',
    partNumber: 'P-1003',
    name: 'Spark Plug (4-pack)',
    category: 'Ignition',
    quantity: 8,
    purchasePrice: 18.0,
    salePrice: 32.0,
    supplier: 'NGK',
    threshold: 12,
    location: 'R4-C2',
  },
];

export const categories = ['Brakes', 'Engine', 'Suspension', 'Ignition', 'Electrical', 'Cooling'];
export const suppliers = [
  { id: 'sup-1', name: 'Brembo', phone: '+39 035 605 1111', email: 'sales@brembo.com', catalog: 'Brakes' },
  { id: 'sup-2', name: 'Bosch', phone: '+49 711 400 40990', email: 'auto@bosch.com', catalog: 'Filters, sensors' },
  { id: 'sup-3', name: 'NGK', phone: '+1 877 473 6767', email: 'support@ngk.com', catalog: 'Ignition' },
];
