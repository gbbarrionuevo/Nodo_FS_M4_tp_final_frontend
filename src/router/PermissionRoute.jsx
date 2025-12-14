import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function PermissionRoute({ perm, children }) {
  const { hasPermission } = useAuth();
  const perms = Array.isArray(perm) ? perm : [perm];

  if (!perms.every(p => hasPermission(p))) {
    return <Navigate to="/home" replace />;
  }

  return children;
}