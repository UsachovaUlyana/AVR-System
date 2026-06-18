import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/useApp';
import OrderChat from '../../components/OrderChat';

export default function CustomerOrderDetail() {
  const { id } = useParams();
  const { currentUser, logout } = useApp();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getOrder(id)
      .then(setOrder)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleMessageAdded(message) {
    setOrder(prev => ({
      ...prev,
      messages: [...(prev.messages || []), message],
    }));
  }

  return (
    <div className="cabinet-layout">
      <aside className="cabinet-sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">👤</div>
          <div>{currentUser?.login}</div>
          <div className="sidebar-role">Заказчик</div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/customer/orders" className="sidebar-link">Мои заявки</Link>
          <Link to="/contacts" className="sidebar-link">Новая заявка</Link>
        </nav>
        <button className="btn btn-outline sidebar-logout" onClick={logout}>Выйти</button>
      </aside>

      <div className="cabinet-content">
        <div className="content-header">
          <Link to="/customer/orders" className="back-link">← Назад к заявкам</Link>
          <h1>Заявка</h1>
        </div>

        {loading && <p>Загрузка...</p>}
        {error && <div className="alert alert-error">{error}</div>}

        {order && (
          <>
            <div className="order-detail-card">
              <div className="order-detail-header">
                <StatusBadge status={order.status} />
                <span className="order-date">{new Date(order.created_at).toLocaleString('ru-RU')}</span>
              </div>
              <div className="order-fields">
                <div className="order-field"><label>Имя:</label><span>{order.customer_name}</span></div>
                <div className="order-field"><label>Телефон:</label><span>{order.phone}</span></div>
                <div className="order-field"><label>Адрес объекта:</label><span>{order.address}</span></div>
                <div className="order-field"><label>Вид работ:</label><span>{order.work_type}</span></div>
                <div className="order-field"><label>Описание:</label><span>{order.description}</span></div>
              </div>
            </div>

            <OrderChat
              orderId={order.id}
              messages={order.messages || []}
              onMessageAdded={handleMessageAdded}
            />

            <div className="history-block">
              <h2>История статусов</h2>
              {order.status_history && order.status_history.length > 0 ? (
                <ul className="history-list">
                  {order.status_history.map(h => (
                    <li key={h.id} className="history-item">
                      <StatusBadge status={h.status} />
                      <span className="history-date">{new Date(h.changed_at).toLocaleString('ru-RU')}</span>
                      {h.comment && <span className="history-comment">— {h.comment}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="history-empty">История изменений пока пуста</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
