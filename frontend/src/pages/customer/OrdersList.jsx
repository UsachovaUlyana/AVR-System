import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useApp } from '../../context/useApp';
import StatusBadge from '../../components/StatusBadge';

export default function CustomerOrdersList() {
  const { currentUser, logout, openOrderModal } = useApp();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getMyOrders()
      .then(setOrders)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="cabinet-layout">
      <aside className="cabinet-sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">👤</div>
          <div>{currentUser?.login}</div>
          <div className="sidebar-role">Заказчик</div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/customer/orders" className="sidebar-link sidebar-link--active">Мои заявки</Link>
          <button className="sidebar-link sidebar-link--btn" onClick={openOrderModal}>+ Новая заявка</button>
        </nav>
        <button className="btn btn-outline sidebar-logout" onClick={logout}>Выйти</button>
      </aside>

      <div className="cabinet-content">
        <h1>Мои заявки</h1>
        {loading && <p>Загрузка...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && orders.length === 0 && (
          <div className="empty-state">
            <p>У вас пока нет заявок</p>
            <button className="btn btn-primary" onClick={openOrderModal}>Оставить заявку</button>
          </div>
        )}
        {orders.length > 0 && (
          <div className="table-wrap">
            <p className="table-hint">Новые сообщения и изменения статуса поднимают заявку выше в списке</p>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Дата</th>
                  <th>Вид работ</th>
                  <th>Адрес</th>
                  <th>Новые</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={o.id} onClick={() => navigate(`/customer/orders/${o.id}`)} className="table-row-link">
                    <td>{i + 1}</td>
                    <td>{new Date(o.created_at).toLocaleDateString('ru-RU')}</td>
                    <td>{o.work_type}</td>
                    <td>{o.address}</td>
                    <td>
                      {o.unread_count > 0 && (
                        <span className="unread-badge">{o.unread_count}</span>
                      )}
                    </td>
                    <td><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
