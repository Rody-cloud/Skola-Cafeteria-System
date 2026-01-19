import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaQrcode, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

const OrderConfirmationModal = ({ isOpen, onClose, orderData }) => {
    const { t } = useTranslation();
    if (!orderData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="qr-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="qr-card"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    >
                        <button className="qr-close" onClick={onClose}>
                            <FaTimes />
                        </button>

                        <div className="qr-header">
                            <div className="qr-icon-circle">
                                <FaCheckCircle className="success-icon" />
                            </div>
                            <h2>{t('menu.qr_title')}</h2>
                            <p>{t('menu.qr_desc')}</p>
                        </div>

                        <div className="qr-display-section">
                            <div className="qr-wrapper">
                                <QRCodeSVG
                                    value={`${import.meta.env.VITE_FRONTEND_URL}/staff?orderId=${orderData.id}`}
                                    size={140}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <div className="order-id-badge">
                                ID: {orderData.id.toString().padStart(6, '0')}
                            </div>
                        </div>

                        <div className="order-summary-mini">
                            <div className="summary-row">
                                <span>{t('common.total')}</span>
                                <span className="total-amount">{orderData.total}₺</span>
                            </div>
                            <div className="summary-row">
                                <span>{t('menu.payment_method')}</span>
                                <span className="cash-label">{t('menu.pay_cash')}</span>
                            </div>
                        </div>

                        <div className="qr-instructions">
                            <FaExclamationTriangle className="warn-icon" />
                            <p>{t('menu.qr_hold_note')}</p>
                        </div>

                        <button className="qr-done-btn" onClick={onClose}>
                            {t('menu.qr_done')}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OrderConfirmationModal;
