import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api';
import { useApp } from '../../context/useApp';
import StatusBadge from '../../components/StatusBadge';
import OrderChat from '../../components/OrderChat';

const STATUSES = ['Новая', 'В работе', 'Выполнена', 'Отклонена'];

export default function ExecutorOrderManage() {
  const { id } = useParams();
  const { currentUser, logout } = useApp();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getOrder(id)
      .then(o => { setOrder(o); setStatus(o.status); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const updated = await api.updateOrderStatus(id, { status, statusComment });
      setOrder(updated);
      setStatusComment('');
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

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
          <div className="sidebar-avatar">🔧</div>
          <div>{currentUser?.login}</div>
          <div className="sidebar-role">Исполнитель</div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/executor/orders" className="sidebar-link">Все заявки</Link>
        </nav>
        <button className="btn btn-outline sidebar-logout" onClick={logout}>Выйти</button>
      </aside>

      <div className="cabinet-content">
        <div className="content-header">
          <Link to="/executor/orders" className="back-link">← Назад к заявкам</Link>
          <h1>Управление заявкой</h1>
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
                <div className="order-field"><label>Имя заказчика:</label><span>{order.customer_name}</span></div>
                <div className="order-field"><label>Телефон:</label><span>{order.phone}</span></div>
                <div className="order-field"><label>Адрес объекта:</label><span>{order.address}</span></div>
                <div className="order-field"><label>Вид работ:</label><span>{order.work_type}</span></div>
                <div className="order-field"><label>Описание:</label><span>{order.description}</span></div>
              </div>
            </div>

            <div className="manage-block">
              <h2>Изменить статус</h2>
              {saved && <div className="alert alert-success">Изменения сохранены</div>}
              <div className="field">
                <label>Статус заявки</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Комментарий к изменению статуса</label>
                <textarea
                  value={statusComment}
                  onChange={e => setStatusComment(e.target.value)}
                  rows={3}
                  placeholder="Например, причина отклонения или пояснение к этапу..."
                />
              </div>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>

            {order.chat_available ? (
              <OrderChat
                orderId={order.id}
                messages={order.messages || []}
                onMessageAdded={handleMessageAdded}
              />
            ) : (
              <div className="chat-unavailable">
                <h2>Чат недоступен</h2>
                <p>Заявка оставлена без авторизации. Свяжитесь с клиентом по телефону, указанному в заявке.</p>
              </div>
            )}

            {order.status_history && order.status_history.length > 0 && (
              <div className="history-block">
                <h2>История изменений</h2>
                <ul className="history-list">
                  {order.status_history.map(h => (
                    <li key={h.id} className="history-item">
                      <StatusBadge status={h.status} />
                      <span className="history-date">{new Date(h.changed_at).toLocaleString('ru-RU')}</span>
                      {h.comment && <span className="history-comment">— {h.comment}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
