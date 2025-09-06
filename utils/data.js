export const MOCK_USER = {
  id: 'buyer123',
  name: 'Jane Doe',
  bio: 'A happy shopper, always looking for unique finds.',
  isSeller: false,
  profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=1587&auto=format&fit=crop',
};

export const MOCK_PRODUCTS = [
  { 
    id: 'prod1', 
    category: 'furniture', 
    title: 'Ergonomic Office Chair', 
    price: 349.99, 
    imageUrl: 'https://images.unsplash.com/photo-1596541223406-8d62689e4722?q=80&w=1770&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1596541223406-8d62689e4722?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1510531704581-5b28709aa698?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1505778848419-450f68cf5527?q=80&w=1770&auto=format&fit=crop'
    ], 
    sellerId: 'seller_alex', 
    description: "Experience ultimate comfort and productivity with our ergonomic office chair, designed for long hours of work. Fully adjustable with lumbar support and breathable mesh.",
    rating: 4.0
  },
  { 
    id: 'prod2', 
    category: 'furniture', 
    title: 'Minimalist Coffee Table', 
    price: 189.00, 
    imageUrl: 'https://images.unsplash.com/photo-1620953155700-1d88a29a0f44?q=80&w=1770&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1620953155700-1d88a29a0f44?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1615555620902-601e3b6d2e61?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1589839420072-f32a7e7d6b38?q=80&w=1770&auto=format&fit=crop'
    ], 
    sellerId: 'seller_sarah', 
    description: "A sleek and modern coffee table perfect for contemporary living spaces. Crafted from high-quality wood with a smooth finish, it's both stylish and functional.",
    rating: 4.5
  },
  { 
    id: 'prod3', 
    category: 'accessories', 
    title: 'Vintage Leather Backpack', 
    price: 175.00, 
    imageUrl: 'https://images.unsplash.com/photo-1589140417637-a2f02693b821?q=80&w=1770&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1589140417637-a2f02693b821?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1574246820543-094d21051566?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1507205187790-28e7e174b21c?q=80&w=1770&auto=format&fit=crop'
    ], 
    sellerId: 'seller_mark', 
    description: "Travel in style with this durable vintage leather backpack. Featuring multiple compartments and robust straps, it's ideal for daily commutes or weekend adventures.",
    rating: 4.8
  },
  { 
    id: 'prod4', 
    category: 'electronics', 
    title: 'Studio Headphones', 
    price: 289.99, 
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?q=80&w=1770&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1557000216-92d1921fcd3b?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1579782509172-e1d84871e98a?q=80&w=1770&auto=format&fit=crop'
    ], 
    sellerId: 'seller_alex', 
    description: "Immerse yourself in crystal-clear audio with our professional studio headphones. Designed for audiophiles, they deliver unparalleled sound quality and comfort.",
    rating: 4.7
  },
  { 
    id: 'prod5', 
    category: 'electronics', 
    title: 'Smart Fitness Tracker', 
    price: 129.00, 
    imageUrl: 'https://images.unsplash.com/photo-1579586311104-585ee58f96bb?q=80&w=1770&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1579586311104-585ee58f96bb?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1526435987-a24687d46534?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1523275335684-219ee5fe837b?q=80&w=1770&auto=format&fit=crop'
    ], 
    sellerId: 'seller_sarah', 
    description: "Track your progress with our advanced smart fitness tracker. Monitors heart rate, steps, calories, and sleep, helping you achieve your health goals.",
    rating: 3.9
  },
  { 
    id: 'prod6', 
    category: 'home-decor', 
    title: 'Handmade Ceramic Vase', 
    price: 85.00, 
    imageUrl: 'https://images.unsplash.com/photo-1596707328659-c290a187680f?q=80&w=1770&auto=format&fit=crop', 
    gallery: [
      'https://images.unsplash.com/photo-1596707328659-c290a187680f?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1599863261905-27a3c7c2b0e6?q=80&w=1770&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1548123281-d4193309a633?q=80&w=1587&auto=format&fit=crop'
    ], 
    sellerId: 'seller_mark', 
    description: "Add a touch of elegance to your home with this unique handmade ceramic vase. Perfect for fresh flowers or as a standalone decorative piece.",
    rating: 4.2
  },
];

export const MOCK_SELLERS = {
  'seller_alex': { 
    id: 'seller_alex', 
    name: 'Alex Johnson', 
    bio: 'Artisan furniture maker with over a decade of experience in crafting durable and elegant pieces.', 
    profilePic: 'https://images.unsplash.com/photo-1507003211169-e695d7328e6c?q=80&w=1587&auto=format&fit=crop',
    location: 'New York, NY',
    joinDate: 'Joined May 2022',
    isVerified: true,
    rating: 4.7,
    reviews: 215,
    responseRate: '98%', // New: Seller's chat response rate
    responseTime: 'Within 2 hours', // New: Average response time to messages
    listings: 45, // New: Total number of products listed
    avgShippingTime: '3-5 business days', // New: Average time to ship an order
  },
  'seller_sarah': { 
    id: 'seller_sarah', 
    name: 'Sarah Chen', 
    bio: 'A passionate potter and home decor enthusiast, creating unique, one-of-a-kind ceramic and textile goods.', 
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop',
    location: 'Los Angeles, CA',
    joinDate: 'Joined January 2021',
    isVerified: true,
    rating: 4.9,
    reviews: 580,
    responseRate: '100%',
    responseTime: 'Within 1 hour',
    listings: 120,
    avgShippingTime: '1-2 business days',
  },
  'seller_mark': { 
    id: 'seller_mark', 
    name: 'Mark Davis', 
    bio: 'Modern tech and accessory reseller. Committed to providing the latest electronics with top-tier customer service.', 
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1587&auto=format&fit=crop',
    location: 'Seattle, WA',
    joinDate: 'Joined March 2023',
    isVerified: false,
    rating: 4.2,
    reviews: 87,
    responseRate: '85%',
    responseTime: 'Within 1 day',
    listings: 20,
    avgShippingTime: '2-4 business days',
  },
};

export const MOCK_MESSAGES = [
  { id: 'msg1', senderId: 'seller_alex', receiverId: 'buyer123', text: 'Hi, is this still available?', productId: 'prod1', timestamp: new Date('2025-08-25T10:00:00Z') },
  { id: 'msg2', senderId: 'buyer123', receiverId: 'seller_alex', text: 'Yes, it is! What are the dimensions?', productId: 'prod1', timestamp: new Date('2025-08-25T10:05:00Z') },
  { id: 'msg3', senderId: 'seller_alex', receiverId: 'buyer123', text: 'It\'s 32"x 45"x 28" (H x W x D).', productId: 'prod1', timestamp: new Date('2025-08-25T10:10:00Z') },
  { id: 'msg4', senderId: 'seller_sarah', receiverId: 'buyer123', text: 'Love your coffee table! Can you tell me about the materials?', productId: 'prod2', timestamp: new Date('2025-08-26T14:30:00Z') },
  { id: 'msg5', senderId: 'buyer123', receiverId: 'seller_sarah', text: 'It\'s made of solid oak with a matte finish.', productId: 'prod2', timestamp: new Date('2025-08-26T14:35:00Z') },
];

export const MOCK_CATEGORIES = [
  { id: 'cat1', name: 'Electronics', icon: 'devices', value: 'electronics' },
  { id: 'cat2', name: 'Furniture', icon: 'chair', value: 'furniture' },
  { id: 'cat3', name: 'Home Decor', icon: 'home-repair-service', value: 'home-decor' },
  { id: 'cat4', name: 'Accessories', icon: 'watch', value: 'accessories' },
  { id: 'cat5', name: 'Books', icon: 'book', value: 'books' },
];