import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await registerApi({ name, email, password, role: 'professor' });

            // Auto-login
            if (data.token && data.user) {
                login(data.token, data.user);
                navigate('/dashboard'); // Professor home is likely /dashboard based on previous checks
            } else {
                navigate('/login');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="card">
            <h2>Professor Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
