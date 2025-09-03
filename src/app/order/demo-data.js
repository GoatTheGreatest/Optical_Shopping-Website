// Demo data script for orders
// You can run this in the browser console to populate sample data

export const demoOrders = [
  {
    id: '1',
    customer: 'John Smith',
    orderType: 'Standard',
    date: '2024-01-15',
    deliveryDate: '2024-01-20',
    total: 299.99,
    description: 'Electronics order - Laptop accessories'
  },
  {
    id: '2',
    customer: 'Sarah Johnson',
    orderType: 'Express',
    date: '2024-01-16',
    deliveryDate: '2024-01-17',
    total: 149.50,
    description: 'Urgent delivery - Office supplies'
  },
  {
    id: '3',
    customer: 'Mike Davis',
    orderType: 'Premium',
    date: '2024-01-14',
    deliveryDate: '2024-01-18',
    total: 599.99,
    description: 'Premium service - Custom furniture'
  },
  {
    id: '4',
    customer: 'Emily Wilson',
    orderType: 'Bulk',
    date: '2024-01-13',
    deliveryDate: '2024-01-25',
    total: 1299.99,
    description: 'Bulk order - Warehouse supplies'
  },
  {
    id: '5',
    customer: 'David Brown',
    orderType: 'Standard',
    date: '2024-01-17',
    deliveryDate: '2024-01-22',
    total: 89.99,
    description: 'Standard delivery - Home goods'
  }
];

// Function to populate demo data
export const populateDemoData = () => {
  try {
    localStorage.setItem('orders', JSON.stringify(demoOrders));
    console.log('Demo data populated successfully!');
    return true;
  } catch (error) {
    console.error('Error populating demo data:', error);
    return false;
  }
};

// Function to clear all data
export const clearAllData = () => {
  try {
    localStorage.removeItem('orders');
    console.log('All data cleared successfully!');
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Usage instructions
console.log(`
Demo Data Functions Available:

1. populateDemoData() - Adds sample orders to localStorage
2. clearAllData() - Removes all orders from localStorage
3. demoOrders - Array of sample order data

To populate demo data, run: populateDemoData()
To clear all data, run: clearAllData()
`);
