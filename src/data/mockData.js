export const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
  { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
  { id: 3, name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop' },
  { id: 4, name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop' },
  { id: 5, name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop' },
  { id: 6, name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop' },
];

export const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 129.99,
    originalPrice: 199.99,
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    ],
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    features: ['Noise Cancellation', 'Bluetooth 5.0', '30-hour Battery', 'Comfortable Fit'],
    stock: 45,
    isFlashSale: true,
    isNew: false,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Electronics',
    brand: 'TechGear',
    rating: 4.7,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
    ],
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and water resistance.',
    features: ['Fitness Tracking', 'Heart Rate Monitor', 'Water Resistant', 'GPS'],
    stock: 32,
    isFlashSale: true,
    isNew: false,
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: 199.99,
    originalPrice: 299.99,
    category: 'Fashion',
    brand: 'StyleCo',
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    ],
    description: 'Classic leather jacket made from premium genuine leather.',
    features: ['Genuine Leather', 'Multiple Pockets', 'Comfortable Lining', 'Durable'],
    stock: 18,
    isFlashSale: false,
    isNew: true,
  },
  {
    id: 4,
    name: 'Running Shoes',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Sports',
    brand: 'RunFast',
    rating: 4.6,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
    ],
    description: 'Lightweight running shoes with excellent cushioning and support.',
    features: ['Lightweight', 'Cushioned Sole', 'Breathable', 'Durable'],
    stock: 67,
    isFlashSale: true,
    isNew: false,
  },
  {
    id: 5,
    name: 'Coffee Maker',
    price: 79.99,
    originalPrice: 119.99,
    category: 'Home & Living',
    brand: 'BrewMaster',
    rating: 4.4,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
    ],
    description: 'Programmable coffee maker with thermal carafe and auto-brew function.',
    features: ['Programmable', 'Thermal Carafe', 'Auto-brew', '12-cup Capacity'],
    stock: 28,
    isFlashSale: false,
    isNew: true,
  },
  {
    id: 6,
    name: 'Skincare Set',
    price: 49.99,
    originalPrice: 79.99,
    category: 'Beauty',
    brand: 'GlowNow',
    rating: 4.8,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
    ],
    description: 'Complete skincare set with cleanser, toner, and moisturizer.',
    features: ['Natural Ingredients', 'Dermatologist Tested', 'All Skin Types', 'Cruelty Free'],
    stock: 91,
    isFlashSale: false,
    isNew: true,
  },
  {
    id: 7,
    name: 'Laptop Backpack',
    price: 59.99,
    originalPrice: 89.99,
    category: 'Fashion',
    brand: 'TravelPro',
    rating: 4.5,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    ],
    description: 'Durable laptop backpack with multiple compartments and USB charging port.',
    features: ['USB Charging Port', 'Water Resistant', 'Padded Laptop Sleeve', 'Anti-theft'],
    stock: 54,
    isFlashSale: false,
    isNew: false,
  },
  {
    id: 8,
    name: 'Yoga Mat',
    price: 29.99,
    originalPrice: 49.99,
    category: 'Sports',
    brand: 'YogaZen',
    rating: 4.2,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    ],
    description: 'Non-slip yoga mat with extra cushioning for comfort.',
    features: ['Non-slip Surface', 'Extra Cushioning', 'Eco-friendly', 'Carrying Strap'],
    stock: 103,
    isFlashSale: true,
    isNew: false,
  },
];

export const productReviews = {
  1: [
    { id: 1, userName: 'John D.', rating: 5, date: '2024-01-10', comment: 'Excellent sound quality and very comfortable!' },
    { id: 2, userName: 'Sarah M.', rating: 4, date: '2024-01-08', comment: 'Great headphones, battery life is amazing.' },
    { id: 3, userName: 'Mike R.', rating: 5, date: '2024-01-05', comment: 'Best purchase this year!' },
  ],
  2: [
    { id: 1, userName: 'Emily S.', rating: 5, date: '2024-01-12', comment: 'Love the fitness tracking features!' },
    { id: 2, userName: 'David K.', rating: 4, date: '2024-01-09', comment: 'Good smartwatch, slightly pricey but worth it.' },
  ],
};

export const mockOrders = [
  {
    id: 'ORD-99901',
    date: '2024-02-15T10:30:00.000Z',
    total: 429.98,
    status: 'Delivered',
    shippingInfo: {
      fullName: 'Test User',
      address: '123 Main St',
      city: 'Tech City',
      zipCode: '12345',
      country: 'USA'
    },
    paymentMethod: 'card',
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
      }
    ]
  },
  {
    id: 'ORD-99902',
    date: '2024-03-01T14:20:00.000Z',
    total: 89.99,
    status: 'Processing',
    shippingInfo: {
      fullName: 'Test User',
      address: '123 Main St',
      city: 'Tech City',
      zipCode: '12345',
      country: 'USA'
    },
    paymentMethod: 'cod',
    items: [
      {
        id: 4,
        name: 'Running Shoes',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
      }
    ]
  }
];
