
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user types
export type UserType = 'company' | 'individual' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUserType: (type: UserType) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  isAuthenticated: false,
  isLoading: true,
  setUserType: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock authentication functions
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      const userType = localStorage.getItem('userType') as UserType || 'individual';
      resolve({
        id: '1',
        name: 'John Doe',
        email: email,
        type: userType,
        bio: 'Lorem ipsum dolor sit amet',
        createdAt: new Date(),
      });
    }, 1000);
  });
};

const mockRegister = async (userData: RegisterData): Promise<User> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: userData.name,
        email: userData.email,
        type: userData.type,
        createdAt: new Date(),
      });
    }, 1000);
  });
};

// Auth Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // For demo purposes, check localStorage
        const token = localStorage.getItem('token');
        const savedUserType = localStorage.getItem('userType') as UserType;
        
        setUserType(savedUserType);
        
        if (token) {
          // Simulate fetching user data
          const userData = await mockLogin('user@example.com', 'password');
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSetUserType = (type: UserType) => {
    setUserType(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await mockLogin(email, password);
      setUser(userData);
      localStorage.setItem('token', 'mock-token');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const newUser = await mockRegister(userData);
      setUser(newUser);
      handleSetUserType(userData.type);
      localStorage.setItem('token', 'mock-token');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isAuthenticated: !!user,
        isLoading,
        setUserType: handleSetUserType,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
