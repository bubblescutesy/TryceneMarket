import { User, UserRole } from '../context/AuthContext';
import { generateId } from '../utils/helpers';

// Mock user database - in a real app, this would be a database
const users: User[] = [
  {
    id: 'c1',
    name: 'John Doe',
    email: 'customer@example.com',
    role: 'customer',
    location: 'Harare, Zimbabwe',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 'r1',
    name: 'Alice Vendor',
    email: 'retailer@example.com',
    role: 'retailer',
    location: 'Bulawayo, Zimbabwe',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 'p1',
    name: 'Bob Service',
    email: 'provider@example.com',
    role: 'provider',
    location: 'Gweru, Zimbabwe',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  }
];

// Mock login function - simulates API call
export const mockLogin = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800); // Simulate network delay
  });
};

// Mock register function - simulates API call
export const mockRegister = (
  name: string,
  email: string,
  password: string,
  role: UserRole,
  location?: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some(u => u.email === email)) {
        reject(new Error('Email already exists'));
        return;
      }
      
      const newUser: User = {
        id: generateId(),
        name,
        email,
        role,
        location,
        // Default avatar based on role
        avatarUrl: `https://images.pexels.com/photos/${
          role === 'customer' ? '2379004' : 
          role === 'retailer' ? '1239291' : '614810'
        }/pexels-photo-${
          role === 'customer' ? '2379004' : 
          role === 'retailer' ? '1239291' : '614810'
        }.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
      };
      
      users.push(newUser);
      resolve(newUser);
    }, 800); // Simulate network delay
  });
};

// Mock logout function
export const mockLogout = (): void => {
  // In a real app, this would call an API endpoint
  console.log('User logged out');
};