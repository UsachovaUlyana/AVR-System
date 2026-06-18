import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>ООО «АВР Систем»</strong>
          <p>Электромонтаж без переделок для жилых, коммерческих и промышленных объектов.</p>
        </div>
        <nav className="footer-nav">
          <Link to="/">Главная</Link>
          <Link to="/services">Услуги</Link>
          <Link to="/about">О компании</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
        <div className="footer-contacts">
          <p>+7 (800) 123-45-67</p>
          <p>info@avr-system.ru</p>
        </div>
      </div>
      <div className="footer-copy">© 2026 ООО «АВР Систем»</div>
    </footer>
  );
}
