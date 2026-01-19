import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllOrders, updateOrderStatus } from '../services/api';
import { useTranslation } from 'react-i18next';
import './StaffDashboard.css';
import { FaCheck, FaBoxOpen, FaClock, FaSignOutAlt, FaRedo } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const StaffDashboard = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Check for orderId in URL (from QR scan)
    const queryParams = new URLSearchParams(location.search);
    const scannedOrderId = queryParams.get('orderId');

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus, paymentStatus) => {
        try {
            await updateOrderStatus(orderId, { status: newStatus, paymentStatus });
            fetchOrders(); // Refresh
        } catch (err) {
            alert(t('common.error'));
        }
    };

    if (loading) return <div className="loading">{t('common.loading')}</div>;

    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const confirmedCount = orders.filter(o => o.status === 'Confirmed').length;

    return (
        <div className="staff-dashboard">
            <header className="staff-header">
                <div>
                    <h1>{t('staff.title')}</h1>
                    <p>{t('common.welcome')}, Chef {user?.name}</p>
                </div>
                <div className="header-actions">
                    <button onClick={fetchOrders} className="refresh-btn">
                        <FaRedo />
                    </button>
                    <button onClick={logout} className="logout-btn">
                        <FaSignOutAlt /> {t('common.logout')}
                    </button>
                </div>
            </header>

            <div className="staff-stats">
                <div className="stat-card">
                    <h3>{t('staff.orders_pending')}</h3>
                    <div className="stat-value">{pendingCount}</div>
                </div>
                <div className="stat-card">
                    <h3>{t('staff.orders_preparing')}</h3>
                    <div className="stat-value">{confirmedCount}</div>
                </div>
                <div className="stat-card">
                    <h3>{t('common.total')}</h3>
                    <div className="stat-value">{orders.length}</div>
                </div>
            </div>

            <main className="orders-section">
                <h2>{t('staff.orders_pending')}</h2>
                <div className="orders-grid">
                    <AnimatePresence>
                        {orders.map(order => (
                            <motion.div
                                key={order.id}
                                className={`order-card ${scannedOrderId == order.id ? 'highlighted' : ''}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                layout
                            >
                                <div className="order-header">
                                    <span className="order-id">#{order.id.toString().padStart(6, '0')}</span>
                                    <span className="order-time">
                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                <div className="customer-info">
                                    <h4>{order.customer?.name}</h4>
                                    <p>{order.paymentMethod === 'Cash' ? t('menu.pay_cash') : t('menu.pay_card')} • {order.paymentStatus}</p>
                                </div>

                                <div className="order-items-list">
                                    {order.OrderItems?.map(item => (
                                        <div key={item.id} className="order-item-row">
                                            <span>
                                                <span className="item-qty">{item.quantity}x</span>
                                                {item.Product?.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                    <span className="total-price">{order.totalPrice}₺</span>
                                </div>

                                {order.status === 'Pending' && (
                                    <div className="action-buttons">
                                        <button
                                            className="action-btn btn-confirm"
                                            onClick={() => handleStatusUpdate(order.id, 'Confirmed', 'Paid')}
                                        >
                                            <FaCheck /> {t('staff.confirm_payment')}
                                        </button>
                                    </div>
                                )}

                                {order.status === 'Confirmed' && (
                                    <div className="action-buttons">
                                        <button
                                            className="action-btn btn-complete"
                                            onClick={() => handleStatusUpdate(order.id, 'Completed')}
                                        >
                                            <FaBoxOpen /> {t('staff.mark_ready')}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default StaffDashboard;
