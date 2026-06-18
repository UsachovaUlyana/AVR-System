import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';
import { useApp } from '../../context/useApp';
import StatusBadge from '../../components/StatusBadge';

const STATUSES = ['', 'Новая', 'В работе', 'Выполнена', 'Отклонена'];

export default function ExecutorAllOrdersList() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getAllOrders(filter)
      .then(setOrders)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [filter]);

  function handleFilterChange(e) {
    setLoading(true);
    setFilter(e.target.value);
  }

  return (
    <div className="cabinet-layout">
      <aside className="cabinet-sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">🔧</div>
          <div>{currentUser?.login}</div>
          <div className="sidebar-role">Исполнитель</div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/executor/orders" className="sidebar-link sidebar-link--active">Все заявки</Link>
        </nav>
        <button className="btn btn-outline sidebar-logout" onClick={logout}>Выйти</button>
      </aside>

      <div className="cabinet-content">
        <h1>Все заявки</h1>

        <div className="filters">
          <label>Фильтр по статусу:</label>
          <select value={filter} onChange={handleFilterChange}>
            {STATUSES.map(s => <option key={s} value={s}>{s || '— Все —'}</option>)}
          </select>
        </div>

        {loading && <p>Загрузка...</p>}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && orders.length === 0 && (
          <div className="empty-state"><p>Заявок нет</p></div>
        )}

        {orders.length > 0 && (
          <div className="table-wrap">
            <p className="table-hint">Новые сообщения и изменения статуса поднимают заявку выше в списке</p>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Дата</th>
                  <th>Заказчик</th>
                  <th>Вид работ</th>
                  <th>Адрес</th>
                  <th>Новые</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={o.id} onClick={() => navigate(`/executor/orders/${o.id}`)} className="table-row-link">
                    <td>{i + 1}</td>
                    <td>{new Date(o.created_at).toLocaleDateString('ru-RU')}</td>
                    <td>{o.customer_name}</td>
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
