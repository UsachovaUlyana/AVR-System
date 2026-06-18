import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerOrdersList from './pages/customer/OrdersList';
import CustomerOrderDetail from './pages/customer/OrderDetail';
import ExecutorAllOrdersList from './pages/executor/AllOrdersList';
import ExecutorOrderManage from './pages/executor/OrderManage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename="/AVR-System">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customer/orders" element={
              <PrivateRoute role="customer"><CustomerOrdersList /></PrivateRoute>
            } />
            <Route path="/customer/orders/:id" element={
              <PrivateRoute role="customer"><CustomerOrderDetail /></PrivateRoute>
            } />
            <Route path="/executor/orders" element={
              <PrivateRoute role="executor"><ExecutorAllOrdersList /></PrivateRoute>
            } />
            <Route path="/executor/orders/:id" element={
              <PrivateRoute role="executor"><ExecutorOrderManage /></PrivateRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
