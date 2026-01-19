import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to their specific home if they try to access a route they aren't allowed in
        return <Navigate to="/" />;
    }

    return children;
};

export default RoleRoute;
