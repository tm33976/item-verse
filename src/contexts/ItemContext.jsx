
import React, { createContext, useContext, useState, useEffect } from 'react';

// Dummy Data
const initialItems = [
  {
    id: '1',
    name: 'Classic White Shirt',
    type: 'Shirt',
    description: 'A comfortable cotton white shirt perfect for any occasion.',
    coverImage: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
    additionalImages: [
      
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600'
    ],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Running Sneakers',
    type: 'Shoes',
    description: 'High-performance running shoes with excellent cushioning and support.',
    coverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    additionalImages: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600'
    ],
    createdAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Blue Denim Jeans',
    type: 'Pant',
    description: 'Classic blue denim jeans with a comfortable fit and durable construction.',
    coverImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    additionalImages: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600'
    ],
    createdAt: new Date('2024-01-17')
  }
];

const ItemContext = createContext();

// Helper function to convert date strings back to Date objects
const parseStoredItems = (storedItems) => {
  return storedItems.map(item => ({
    ...item,
    createdAt: new Date(item.createdAt)
  }));
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load items from localStorage on initialization
    try {
      const savedItems = localStorage.getItem('itemverse-items');
      if (savedItems) {
        return parseStoredItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error('Error loading items from localStorage:', error);
    }
    return initialItems;
  });

  // Save items to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('itemverse-items', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to localStorage:', error);
    }
  }, [items]);

  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prev => [item, ...prev]);
  };

  const getItem = (id) => {
    return items.find(item => item.id === id);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, getItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};
