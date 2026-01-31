import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'jobseeker' | 'employer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  skillset?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  skillset?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('jobconnect_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call to your backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      
      // Simulating API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo - replace with actual API response
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email,
        phone: '+1234567890',
        role: 'jobseeker',
        skillset: ['JavaScript', 'React'],
      };
      
      setUser(mockUser);
      localStorage.setItem('jobconnect_user', JSON.stringify(mockUser));
      localStorage.setItem('jobconnect_token', 'mock_jwt_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call to your backend
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
      
      // Simulating API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful registration, user should login
      // For now, we'll auto-login after registration
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        skillset: data.skillset,
      };
      
      setUser(newUser);
      localStorage.setItem('jobconnect_user', JSON.stringify(newUser));
      localStorage.setItem('jobconnect_token', 'mock_jwt_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('jobconnect_user');
    localStorage.removeItem('jobconnect_token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
