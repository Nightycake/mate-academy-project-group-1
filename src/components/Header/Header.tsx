import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import defaultpicture from './defaultpicture.png';
import './header.scss';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(currentScroll < lastScrollTop || currentScroll <= 0);
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? 'activeLink' : '';
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className={`header ${isVisible ? '' : 'header--hidden'}`}>
      <div className="navbar">
        <div className="navbar__left">BLOG_NAME</div>
        <div className="navbar__right">
          <Link to="/" className={`header__link ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/add" className={`header__link ${isActive('/add')}`}>
            Add
          </Link>
          <span className="separator"> | </span>
          <div className="profile-wrapper">
            <div className="profile-icon" onClick={toggleProfileMenu}>
              <img src={defaultpicture} alt="User" className="profile-icon" />
            </div>
            {isProfileMenuOpen && (
              <div ref={profileMenuRef} className="profile-menu">
                <Link to="/profil-uzytkownia" onClick={toggleProfileMenu} className="profile-menu__link">
                  Profil
                </Link>
                <Link to="/posty-uzytkownika" onClick={toggleProfileMenu} className="profile-menu__link">
                  Posty
                </Link>
                <Link to="/ustawienia-profilu-uzytkownika" onClick={toggleProfileMenu} className="profile-menu__link">
                  Ustawienia
                </Link>
                <Link to="" onClick={toggleProfileMenu} className="profile-menu__link">
                  Wyloguj
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
