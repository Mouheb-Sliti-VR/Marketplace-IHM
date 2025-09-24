import React from 'react';
import style from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={`${style.footer}`}>
      <div className="container-xxl footer-terms d-flex align-items-center justify-content-center h-100">
          <ul className="navbar-nav d-flex flex-row align-items-center gap-md-3">
              <li><a className={`${style.navLink} fw-bold text-white`} id="test" href="#" aria-current="page">© Orange 2025</a></li>
              <li><a className={`${style.navLink}`} href="#">Terms and conditions</a></li>
              <li><a className={`${style.navLink}`} href="#">Privacy</a></li>
              <li><a className={`${style.navLink}`} href="#">Cookie policy</a></li>
              <li><a className={`${style.navLink}`} href="#">Accessibility statement</a></li>
              <li><a className={`${style.navLink} text-white`} id="test" href="#" aria-current="page">Orange Partners Marketplace</a></li>
          </ul>
      </div>
    </div>
  );
};

export default Footer;