import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../services/api';
import { FaEnvelope, FaLock, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginApi({ email, password });
            login(data.token, data.user);
            navigate('/menu');
        } catch (err) {
            setError(err.message || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="auth-header">
                    <img src="/Images/logo.png" alt="Skola Logo" className="auth-logo" />
                    <h2>{t('auth.login_title')}</h2>
                    <p>{t('auth.login_desc')}</p>
                </div>

                {error && (
                    <motion.div
                        className="error-message"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <FaExclamationCircle /> {error}
                    </motion.div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>{t('auth.email_label')}</label>
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder="name@stu.topkapi.edu.tr"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label>{t('auth.password_label')}</label>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading ? t('common.loading') : t('auth.submit_login')}
                        <FaArrowRight size={14} />
                    </button>
                </form>

                <div className="auth-footer">
                    {t('auth.signup_prompt')} <Link to="/register">{t('common.register')}</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
