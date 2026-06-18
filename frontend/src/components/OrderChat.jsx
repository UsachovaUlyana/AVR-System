import { useState } from 'react';
import { api } from '../api';
import { useApp } from '../context/useApp';

function senderLabel(message, currentUser) {
  if (message.sender_login === currentUser?.login) return 'Вы';
  return message.sender_role === 'executor' ? 'Исполнитель' : 'Заказчик';
}

export default function OrderChat({ orderId, messages = [], onMessageAdded }) {
  const { currentUser } = useApp();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) {
      setError('Введите сообщение');
      return;
    }
    setError('');
    setSending(true);
    try {
      const message = await api.sendOrderMessage(orderId, { text });
      onMessageAdded(message);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-block">
      <h2>Чат по заявке</h2>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="chat-empty">Сообщений пока нет</p>
        ) : (
          messages.map(message => {
            const own = message.sender_login === currentUser?.login;
            return (
              <div key={message.id} className={`chat-message ${own ? 'chat-message--own' : ''}`}>
                <div className="chat-message-meta">
                  <span>{senderLabel(message, currentUser)}</span>
                  <time>{new Date(message.created_at).toLocaleString('ru-RU')}</time>
                </div>
                <div className="chat-message-text">{message.text}</div>
              </div>
            );
          })
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          placeholder="Введите сообщение..."
        />
        <button className="btn btn-primary" type="submit" disabled={sending}>
          {sending ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}
