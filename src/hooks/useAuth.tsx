import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  year: string;
  branch: string;
  role: 'student' | 'admin' | 'faculty';
  rating: number;
  solved: number;
  streak: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage or token)
    const storedUser = localStorage.getItem('auth-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock authentication - replace with actual API call
      if (email === 'admin@codemaster.com' && password === 'admin123') {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          avatar: '',
          year: 'Final',
          branch: 'Computer Science',
          role: 'admin',
          rating: 1850,
          solved: 156,
          streak: 7,
          badges: ['Problem Setter', 'Contest Winner']
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('auth-user', JSON.stringify(mockUser));
      } else if (email === 'student@codemaster.com' && password === 'student123') {
        const mockUser: User = {
          id: '2',
          name: 'Jane Smith',
          email: email,
          avatar: '',
          year: 'Third',
          branch: 'Information Technology',
          role: 'student',
          rating: 1450,
          solved: 89,
          streak: 3,
          badges: ['Fast Learner', 'Debug Master']
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('auth-user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth-user');
  };

  const register = async (userData: Partial<User> & { email: string; password: string }) => {
    try {
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email,
        avatar: '',
        year: userData.year || 'First',
        branch: userData.branch || 'Computer Science',
        role: 'student',
        rating: 1200,
        solved: 0,
        streak: 0,
        badges: ['Newcomer']
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('auth-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};