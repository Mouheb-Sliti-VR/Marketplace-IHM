import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/EditProfile/EditProfile';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'

import { AuthProvider } from './contexts/AuthProvider';
import { AlertProvider } from './contexts/AlertProvider';

const App = () => {
  return (
    <Router>
      <AlertProvider>
        <AuthProvider> 
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
          <Footer /> 
        </AuthProvider>
      </AlertProvider>
      
    </Router>
  );
};

export default App;