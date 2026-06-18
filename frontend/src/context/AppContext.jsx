import { useState, useEffect } from 'react';
import { AppContext } from './AppContextValue';

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(user => { setCurrentUser(user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function login(loginVal, password) {
    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: loginVal, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка входа');
    setCurrentUser(data);
    return data;
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setCurrentUser(null);
  }

  function openOrderModal() { setOrderModalOpen(true); }
  function closeOrderModal() { setOrderModalOpen(false); }

  return (
    <AppContext.Provider value={{ currentUser, loading, login, logout, orderModalOpen, openOrderModal, closeOrderModal }}>
      {children}
    </AppContext.Provider>
  );
}
