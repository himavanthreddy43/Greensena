import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock check for existing session in localStorage
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setSession({ user: parsedUser });
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const sendOtp = async (phone) => {
    // Mock OTP send - always succeed
    return { error: null };
  };

  const verifyOtp = async (phone, token) => {
    // Mock verify OTP - accept any 6 digit token
    const mockUser = { id: '1', phone: phone };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setSession({ user: mockUser });
    setUser(mockUser);
    return { error: null };
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setSession({ user: mockUser });
    setUser(mockUser);
    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('mock_user');
    setSession(null);
    setUser(null);
    return { error: null };
  };

  const value = {
    session,
    user,
    loading,
    sendOtp,
    verifyOtp,
    signInWithGoogle,
    signOut
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
