import { Navigate } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function PrivateRoute({ children, role }) {
  const { currentUser, loading } = useApp();

  if (loading) return <div className="page-center">Загрузка...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (role && currentUser.role !== role) return <Navigate to="/login" replace />;

  return children;
}
