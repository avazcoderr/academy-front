import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'superadmin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const demoUsers: { [key: string]: User } = {
  'superadmin@sudoteach.com': {
    id: '1',
    name: 'Супер Админ',
    email: 'superadmin@sudoteach.com',
    role: 'superadmin'
  },
  'student@sudoteach.com': {
    id: '3',
    name: 'Студент Курсов',
    email: 'student@sudoteach.com',
    role: 'student'
  }
};

const demoPasswords: { [key: string]: string } = {
  'superadmin@sudoteach.com': 'admin123',
  
  'student@sudoteach.com': 'student123'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const demoUser = demoUsers[email];
    const demoPassword = demoPasswords[email];
    
    if (demoUser && demoPassword === password) {
      setUser(demoUser);
      localStorage.setItem('authUser', JSON.stringify(demoUser));
      return true;
    }
    
    // For any other email/password, create a basic student account
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
        role: 'student'
      };
      setUser(newUser);
      localStorage.setItem('authUser', JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  // Check for saved user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};