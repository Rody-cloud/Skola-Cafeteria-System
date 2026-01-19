import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaHistory, FaWallet, FaStar, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './ProfessorPortal.css';

const ProfessorPortal = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    const priorityOrders = [
        { id: '10243', date: 'Today, 12:30', total: '42.00', status: 'Priority Preparing' },
        { id: '10212', date: 'Yesterday', total: '35.50', status: 'Completed' }
    ];

    return (
        <div className="prof-portal">
            <motion.header
                className="prof-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="prof-info">
                    <p>{t('professor.title')}</p>
                    <h1>{t('common.welcome')}, {user?.name}</h1>
                </div>
                <button onClick={logout} className="logout-btn">
                    <FaSignOutAlt /> {t('common.logout')}
                </button>
            </motion.header>

            <div className="prof-grid">
                <motion.div
                    className="prof-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2><FaHistory /> {t('professor.history')}</h2>
                    <div className="priority-list">
                        {priorityOrders.map(order => (
                            <div key={order.id} className="priority-item">
                                <div className="item-main">
                                    <span className="item-title">Order #{order.id}</span>
                                    <span className="item-meta">{order.date} • {order.total}₺</span>
                                </div>
                                <span className="badge-priority">{order.status}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="prof-side-stack">
                    <motion.div
                        className="prof-card"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2><FaWallet /> {t('professor.billing')}</h2>
                        <div className="balance-box">
                            <label>Account Balance</label>
                            <div className="balance-amount">245.00₺</div>
                        </div>
                        <div className="action-links">
                            <a href="#" className="prof-action-btn">
                                <FaStar /> Monthly Statements <FaChevronRight style={{ marginLeft: 'auto' }} />
                            </a>
                            <a href="#" className="prof-action-btn">
                                <FaUserGraduate /> Staff Requests <FaChevronRight style={{ marginLeft: 'auto' }} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProfessorPortal;
