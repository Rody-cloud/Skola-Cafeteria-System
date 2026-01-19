import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register as registerApi } from '../services/api';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // 'student' or 'professor'
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const requiredDomain = role === 'professor' ? '@topkapi.edu.tr' : '@stu.topkapi.edu.tr';

        if (!email.endsWith(requiredDomain)) {
            setError(role === 'professor' ? t('auth.email_error_professor') : t('auth.email_error_student'));
            return;
        }

        setLoading(true);
        try {
            const data = await registerApi({ name, email, password, role });

            // Auto-login if token is present
            if (data.token && data.user) {
                login(data.token, data.user);
                navigate('/');
            } else {
                navigate('/login');
            }
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
                    <h2>{t('auth.register_title')}</h2>
                    <p>{t('auth.register_desc')}</p>
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

                <div className="role-selector">
                    <button
                        type="button"
                        className={`role-btn ${role === 'student' ? 'active' : ''}`}
                        onClick={() => setRole('student')}
                    >
                        {t('common.role_student')}
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${role === 'professor' ? 'active' : ''}`}
                        onClick={() => setRole('professor')}
                    >
                        {t('common.role_professor')}
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>{t('auth.name_label')}</label>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label>{role === 'professor' ? t('common.role_professor') + ' Email' : t('common.role_student') + ' Email'}</label>
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder={role === 'professor' ? t('auth.email_placeholder_professor') : t('auth.email_placeholder_student')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <span className="domain-badge">
                            {role === 'professor' ? '@topkapi.edu.tr' : '@stu.topkapi.edu.tr'}
                        </span>
                    </div>

                    <div className="form-field">
                        <label>{t('auth.password_label')}</label>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="********"
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
                        {loading ? t('common.loading') : t('auth.submit_register')}
                        <FaArrowRight size={14} />
                    </button>
                </form>

                <div className="auth-footer">
                    {t('auth.login_prompt')} <Link to="/login">{t('auth.submit_login')}</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
