import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function LoginPage() {
  const [loginVal, setLoginVal] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!loginVal || !password) { setError('Введите логин и пароль'); return; }
    setError('');
    setLoading(true);
    try {
      const user = await login(loginVal, password);
      const from = location.state?.from;
      if (from) { navigate(from, { replace: true }); return; }
      navigate(user.role === 'customer' ? '/customer/orders' : '/executor/orders', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-center">
      <div className="login-card">
        <h1>Вход в личный кабинет</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>Логин</label>
            <input
              type="text"
              value={loginVal}
              onChange={e => setLoginVal(e.target.value)}
              placeholder="customer1 или executor1"
              autoFocus
            />
          </div>
          <div className="field">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="pass123"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <div className="login-hint" style={{ textAlign: 'center', marginTop: 16 }}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
        <div className="login-hint">
          <p>Тестовые аккаунты:</p>
          <p>Заказчик: <code>customer1 / pass123</code></p>
          <p>Исполнитель: <code>executor1 / pass123</code></p>
        </div>
      </div>
    </div>
  );
}
