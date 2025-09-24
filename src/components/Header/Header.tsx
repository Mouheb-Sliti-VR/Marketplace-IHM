import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import style from './Header.module.css'; // Assuming you have a CSS module for styles
import { Link, useNavigate } from 'react-router-dom';
import ButtonCircle from '../Button/ButtonCircle';

const DeafultHeader = () => (
  <header className="bg-black">
    <nav className="d-flex justify-content-between align-items-center">
      <div className={style.brand}>
        <Link className='text-decoration-none' to="/">
          <img src="/Orange_logo.png" alt="Brand Logo" />
          <span>Partners Marketplace</span>
        </Link>
      </div>
      <a href="/login"><i className="text-white fas fa-sign-in-alt fa-2x"></i></a>
    </nav>
  </header>
);

const AuthenticatedHeader = ({ logout }: { logout: () => void }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-black">
      <nav className='d-flex justify-content-between align-items-center'>
        <div className={style.brand}>
          <Link className='text-decoration-none' to="/dashboard">
            <img src="/Orange_logo.png" alt="Brand Logo" />
            <span>Partners Marketplace</span>
          </Link>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <span className={style.companyName} style={{color: '#ff8c1a'}}>{localStorage.getItem('companyName') && localStorage.getItem('companyName') != undefined ? localStorage.getItem('companyName') : ''}</span>
          <ButtonCircle 
            value='Profile'
            icon='fas fa-user'
            onClick={() => navigate('/profile', { replace: false })}
          />
          <ButtonCircle
            value="Logout"
            icon="fas fa-sign-out-alt"
            onClick={logout}
          />
        </div>
      </nav>
    </header>
  );
};

const Header: React.FC = () => {
  const {logout } = useAuth();

  return (
    <>
      {!localStorage.getItem('token') ? (
        <DeafultHeader />
      ) : (
        <AuthenticatedHeader logout={logout} />
      )}
    </>
  );
};

export default Header;