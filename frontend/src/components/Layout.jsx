import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import OrderModal from './OrderModal';
import { useApp } from '../context/useApp';

export default function Layout() {
  const { currentUser, orderModalOpen, closeOrderModal } = useApp();
  const { pathname } = useLocation();
  const isCabinetRoute = pathname.startsWith('/customer') || pathname.startsWith('/executor');
  const hideSiteChrome = Boolean(currentUser) || isCabinetRoute;

  return (
    <div className={`layout ${hideSiteChrome ? 'layout--no-chrome' : ''}`}>
      {!hideSiteChrome && <Header />}
      <main className="main"><Outlet /></main>
      {!hideSiteChrome && <Footer />}
      {orderModalOpen && <OrderModal onClose={closeOrderModal} />}
    </div>
  );
}
