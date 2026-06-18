import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function RegisterPage() {
  const [form, setForm] = useState({ login: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login: doLogin } = useApp();
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.login.trim()) e.login = 'Введите логин';
    else if (form.login.length < 3) e.login = 'Минимум 3 символа';
    if (!form.password) e.password = 'Введите пароль';
    else if (form.password.length < 6) e.password = 'Минимум 6 символов';
    if (!form.confirmPassword) e.confirmPassword = 'Повторите пароль';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Пароли не совпадают';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка регистрации');
      // Автоматически авторизуем через существующий login механизм
      await doLogin(form.login, form.password);
      navigate('/customer/orders', { replace: true });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  return (
    <div className="page page-center">
      <div className="login-card">
        <h1>Регистрация</h1>
        <p className="register-subtitle">Создайте аккаунт, чтобы отслеживать свои заявки</p>
        {errors.general && <div className="alert alert-error">{errors.general}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>Логин *</label>
            <input
              type="text"
              value={form.login}
              onChange={e => handleChange('login', e.target.value)}
              placeholder="минимум 3 символа"
              autoFocus
              className={errors.login ? 'input-error' : ''}
            />
            {errors.login && <span className="error-msg">{errors.login}</span>}
          </div>
          <div className="field">
            <label>Пароль *</label>
            <input
              type="password"
              value={form.password}
              onChange={e => handleChange('password', e.target.value)}
              placeholder="минимум 6 символов"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>
          <div className="field">
            <label>Повторите пароль *</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={e => handleChange('confirmPassword', e.target.value)}
              placeholder="повторите пароль"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="login-hint" style={{ textAlign: 'center', marginTop: 16 }}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
