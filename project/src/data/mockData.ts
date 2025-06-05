import { generateId } from '../utils/helpers';

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  location: string;
  rating: number;
  reviews: Review[];
  colors?: string[];
  sizes?: string[];
  availability: number;
  createdAt: Date;
}

export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  rating: number;
  reviews: Review[];
  duration: number; // in minutes
  availableDays: string[]; // ['monday', 'tuesday', etc.]
  availableTimeSlots: string[]; // ['09:00', '10:00', etc.]
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  date: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

// Mock Products
export const products: Product[] = [
  {
    id: 'p1',
    sellerId: 'r1',
    name: 'Traditional Handwoven Basket',
    description: 'Beautiful handwoven basket made by local artisans using traditional techniques. Perfect for home decoration or storage.',
    price: 25.99,
    images: [
      'https://images.pexels.com/photos/5379215/pexels-photo-5379215.jpeg',
      'https://images.pexels.com/photos/5379214/pexels-photo-5379214.jpeg'
    ],
    category: 'Home & Decor',
    location: 'Harare, Zimbabwe',
    rating: 4.7,
    reviews: [
      {
        id: 'rev1',
        userId: 'c1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing quality and beautiful design!',
        createdAt: new Date('2023-03-15')
      }
    ],
    colors: ['Natural', 'Brown', 'Black'],
    availability: 12,
    createdAt: new Date('2023-03-01')
  },
  {
    id: 'p2',
    sellerId: 'r1',
    name: 'Organic Fresh Vegetables Pack',
    description: 'Assorted fresh vegetables grown locally without pesticides. Pack includes tomatoes, spinach, onions, and peppers.',
    price: 15.50,
    images: [
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg'
    ],
    category: 'Food & Groceries',
    location: 'Bulawayo, Zimbabwe',
    rating: 4.5,
    reviews: [
      {
        id: 'rev2',
        userId: 'c1',
        userName: 'John Doe',
        rating: 4,
        comment: 'Fresh and delicious vegetables, will order again!',
        createdAt: new Date('2023-04-10')
      }
    ],
    availability: 20,
    createdAt: new Date('2023-04-01')
  },
  {
    id: 'p3',
    sellerId: 'r1',
    name: 'African Print Dress',
    description: 'Handmade dress using authentic African print fabric. Available in various sizes and colors.',
    price: 45.99,
    images: [
      'https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg',
      'https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg'
    ],
    category: 'Clothing',
    location: 'Gweru, Zimbabwe',
    rating: 4.8,
    reviews: [
      {
        id: 'rev3',
        userId: 'c1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Beautiful dress and amazing quality!',
        createdAt: new Date('2023-03-25')
      }
    ],
    colors: ['Blue', 'Red', 'Green', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 8,
    createdAt: new Date('2023-03-10')
  },
  {
    id: 'p4',
    sellerId: 'r1',
    name: 'Handcrafted Wooden Furniture',
    description: 'Beautifully crafted wooden furniture made from sustainable local timber. Each piece is unique and made to order.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'
    ],
    category: 'Furniture',
    location: 'Harare, Zimbabwe',
    rating: 4.9,
    reviews: [
      {
        id: 'rev4',
        userId: 'c1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Exceptional craftsmanship and beautiful design!',
        createdAt: new Date('2023-05-05')
      }
    ],
    colors: ['Natural', 'Mahogany', 'Ebony'],
    availability: 5,
    createdAt: new Date('2023-04-20')
  }
];

// Mock Services
export const services: Service[] = [
  {
    id: 's1',
    providerId: 'p1',
    name: 'Professional Hair Styling',
    description: 'Get your hair styled by an experienced professional. Services include cuts, styling, braiding, and more.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
    category: 'Beauty & Personal Care',
    location: 'Harare, Zimbabwe',
    rating: 4.8,
    reviews: [
      {
        id: 'rev5',
        userId: 'c1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing service, my hair has never looked better!',
        createdAt: new Date('2023-04-12')
      }
    ],
    duration: 60,
    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    availableTimeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    createdAt: new Date('2023-03-15')
  },
  {
    id: 's2',
    providerId: 'p1',
    name: 'Home Cleaning Service',
    description: 'Professional home cleaning service. We provide all cleaning supplies and equipment. Available for regular or one-time cleaning.',
    price: 50.00,
    image: 'https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg',
    category: 'Home Services',
    location: 'Bulawayo, Zimbabwe',
    rating: 4.6,
    reviews: [
      {
        id: 'rev6',
        userId: 'c1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Excellent service, my home has never been cleaner!',
        createdAt: new Date('2023-05-08')
      }
    ],
    duration: 120,
    availableDays: ['monday', 'wednesday', 'friday'],
    availableTimeSlots: ['08:00', '11:00', '14:00'],
    createdAt: new Date('2023-04-01')
  },
  {
    id: 's3',
    providerId: 'p1',
    name: 'Traditional Cooking Classes',
    description: 'Learn to cook traditional African dishes with our experienced chef. Classes are held in small groups for a personalized experience.',
    price: 40.00,
    image: 'https://images.pexels.com/photos/3298637/pexels-photo-3298637.jpeg',
    category: 'Education',
    location: 'Gweru, Zimbabwe',
    rating: 4.9,
    reviews: [
      {
        id: 'rev7',
        userId: 'c1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing experience! I learned so much about traditional cooking techniques.',
        createdAt: new Date('2023-05-20')
      }
    ],
    duration: 180,
    availableDays: ['saturday', 'sunday'],
    availableTimeSlots: ['10:00', '14:00'],
    createdAt: new Date('2023-04-15')
  },
  {
    id: 's4',
    providerId: 'p1',
    name: 'Car Repair & Maintenance',
    description: 'Professional auto repair and maintenance services. We work on all makes and models with competitive pricing.',
    price: 75.00,
    image: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg',
    category: 'Automotive',
    location: 'Harare, Zimbabwe',
    rating: 4.7,
    reviews: [
      {
        id: 'rev8',
        userId: 'c1',
        userName: 'John Doe',
        rating: 4,
        comment: 'Great service at a fair price. My car is running perfectly now.',
        createdAt: new Date('2023-06-05')
      }
    ],
    duration: 240,
    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    availableTimeSlots: ['08:00', '10:00', '12:00', '14:00', '16:00'],
    createdAt: new Date('2023-05-01')
  }
];

// Mock Orders
export const orders: Order[] = [
  {
    id: 'o1',
    customerId: 'c1',
    sellerId: 'r1',
    productId: 'p1',
    quantity: 2,
    totalPrice: 51.98,
    status: 'delivered',
    shippingAddress: '123 Main St, Harare, Zimbabwe',
    paymentMethod: 'EcoCash',
    createdAt: new Date('2023-04-05')
  },
  {
    id: 'o2',
    customerId: 'c1',
    sellerId: 'r1',
    productId: 'p3',
    quantity: 1,
    totalPrice: 45.99,
    status: 'processing',
    shippingAddress: '123 Main St, Harare, Zimbabwe',
    paymentMethod: 'Cash on Delivery',
    createdAt: new Date('2023-05-10')
  }
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: 'b1',
    customerId: 'c1',
    providerId: 'p1',
    serviceId: 's1',
    date: new Date('2023-05-15'),
    timeSlot: '10:00',
    status: 'completed',
    totalPrice: 30.00,
    createdAt: new Date('2023-05-10')
  },
  {
    id: 'b2',
    customerId: 'c1',
    providerId: 'p1',
    serviceId: 's3',
    date: new Date('2023-06-10'),
    timeSlot: '14:00',
    status: 'confirmed',
    totalPrice: 40.00,
    createdAt: new Date('2023-05-25')
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: 'm1',
    senderId: 'c1',
    receiverId: 'r1',
    content: 'Hello, I am interested in your Traditional Handwoven Basket. Is it still available?',
    read: true,
    createdAt: new Date('2023-04-03')
  },
  {
    id: 'm2',
    senderId: 'r1',
    receiverId: 'c1',
    content: 'Yes, it is still available. We have 12 in stock. Would you like to place an order?',
    read: true,
    createdAt: new Date('2023-04-03')
  },
  {
    id: 'm3',
    senderId: 'c1',
    receiverId: 'p1',
    content: 'Hi, I would like to book a hair styling appointment for next week. What times do you have available?',
    read: true,
    createdAt: new Date('2023-05-08')
  },
  {
    id: 'm4',
    senderId: 'p1',
    receiverId: 'c1',
    content: 'Hello! I have availability on Monday at 10am or Wednesday at 2pm. Which would work better for you?',
    read: false,
    createdAt: new Date('2023-05-08')
  }
];

// Mock Data Access Functions
export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProduct = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(product => product.id === id));
    }, 300);
  });
};

export const getServices = (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
};

export const getService = (id: string): Promise<Service | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services.find(service => service.id === id));
    }, 300);
  });
};

export const getUserOrders = (userId: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orders.filter(order => order.customerId === userId));
    }, 500);
  });
};

export const getUserBookings = (userId: string): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bookings.filter(booking => booking.customerId === userId));
    }, 500);
  });
};

export const getUserMessages = (userId: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages.filter(message => 
        message.senderId === userId || message.receiverId === userId
      ));
    }, 500);
  });
};

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        ...orderData,
        id: generateId(),
        createdAt: new Date()
      };
      orders.push(newOrder);
      resolve(newOrder);
    }, 700);
  });
};

export const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBooking: Booking = {
        ...bookingData,
        id: generateId(),
        createdAt: new Date()
      };
      bookings.push(newBooking);
      resolve(newBooking);
    }, 700);
  });
};

export const sendMessage = (messageData: Omit<Message, 'id' | 'read' | 'createdAt'>): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        ...messageData,
        id: generateId(),
        read: false,
        createdAt: new Date()
      };
      messages.push(newMessage);
      resolve(newMessage);
    }, 300);
  });
};