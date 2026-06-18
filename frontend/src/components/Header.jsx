import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function Header() {
  const { currentUser, logout, openOrderModal } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && isAtTop && !menuOpen;

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY <= 4);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  function cabinetLink() {
    if (!currentUser) return '/login';
    return currentUser.role === 'customer' ? '/customer/orders' : '/executor/orders';
  }

  function handleOrderClick() {
    setMenuOpen(false);
    openOrderModal();
  }

  return (
    <header className={`header ${isHomePage ? 'header--home' : ''} ${isTransparent ? 'header--transparent' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="logo"><span>АВР</span> Систем</Link>

        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <span /><span /><span />
        </button>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Главная</NavLink>
          <NavLink to="/services" onClick={() => setMenuOpen(false)}>Услуги</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>О компании</NavLink>
          <NavLink to="/contacts" onClick={() => setMenuOpen(false)}>Контакты</NavLink>
          <a href="tel:+78001234567" className="nav-phone" onClick={() => setMenuOpen(false)}>
            +7 (800) 123-45-67
            <small>Пн–Пт 9:00–18:00</small>
          </a>
          <button className="btn-nav btn-nav--order" onClick={handleOrderClick}>Оставить заявку</button>
          {currentUser ? (
            <>
              <Link to={cabinetLink()} onClick={() => setMenuOpen(false)} className="btn-nav">
                Личный кабинет
              </Link>
              <button onClick={handleLogout} className="btn-nav btn-nav--outline">Выйти</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-nav">Войти</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
