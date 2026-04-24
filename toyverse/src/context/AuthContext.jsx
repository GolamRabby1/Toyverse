import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const MOCK_USERS = [
  { id: 1, email: 'admin@toyverse.com', password: 'admin123', name: 'Admin User', role: 'admin', avatar: 'https://i.pravatar.cc/80?img=12' },
  { id: 2, email: 'user@toyverse.com', password: 'user123', name: 'Happy Parent', role: 'user', avatar: 'https://i.pravatar.cc/80?img=7' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('toyverse-user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('toyverse-user', JSON.stringify(safeUser));
      toast.success(`Welcome back, ${safeUser.name}! 🎉`, {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid #f97316' },
      });
      return { success: true, user: safeUser };
    }
    toast.error('Invalid email or password');
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (name, email, password) => {
    await new Promise(r => setTimeout(r, 800));
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) {
      toast.error('Email already registered');
      return { success: false, error: 'Email already exists' };
    }
    const newUser = { id: Date.now(), name, email, role: 'user', avatar: 'https://i.pravatar.cc/80?img=15' };
    setUser(newUser);
    localStorage.setItem('toyverse-user', JSON.stringify(newUser));
    toast.success(`Welcome to ToyVerse, ${name}! 🧸`, {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid #f97316' },
    });
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('toyverse-user');
    toast.success('See you soon! 👋');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
