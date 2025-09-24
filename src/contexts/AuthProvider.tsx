import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlert } from './AlertProvider';
import LoadingWheel from '../components/LoadingWheel/LoadingWheel';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (payload: {email: string, password:string}) => void;
  logout: () => void;
  register: (payload: {email: string, companyName: string, password: string}) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {showAlert} = useAlert();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      navigate('/dashboard', { replace: true });
    }   
    else if (location.pathname !== '/login' && location.pathname !== '/register') {
      setIsLoggedIn(false);
      navigate('/', { replace: true });
    }   
  }, [isLoggedIn]);

  const login = async (payload: {email: string, password:string}) => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL || '';
    const loginUrl = import.meta.env.VITE_LOGIN_URL || '';
    await fetch(`${baseUrl}${loginUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => {
      setLoading(false);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('companyName', data.companyName);
      localStorage.setItem('email', data.email);
      console.log('Login successful:', data);
      showAlert('Login successful!', '#6ebb6eff', () => navigate('/dashboard', { replace: true }));
    }).catch(error => {
      console.error('Login failed:', error);
      showAlert(`Login failed: Invalid email or password`, '#c44444ff');
    }).finally(() => {
      setLoading(false);
    });
    
  }

  const register = async (payload: {email: string, companyName: string, password: string}) => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL || '';
    const registerUrl = import.meta.env.VITE_REGISTER_URL || '';
    await fetch(`${baseUrl}${registerUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(data => {
      console.log('Registration successful:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('companyName', data.user.companyName);
      localStorage.setItem('email', data.user.email);
      showAlert('Registration successful!', '#6ebb6eff', () => navigate('/edit-profile', { replace: true }));
    }).catch(error => {
      console.error('Registration failed:', error);
      showAlert(`Registration failed: ${error}`, '#c44444ff');
    }).finally(() => {
      setLoading(false);
    });


    
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('companyName');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {loading && <LoadingWheel isLoading={loading} />}
      {children}
    </AuthContext.Provider>
  );
};
