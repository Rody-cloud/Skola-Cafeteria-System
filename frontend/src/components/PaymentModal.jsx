import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaLock, FaShieldAlt, FaUniversity, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, onConfirm, total }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState('entry'); // 'entry', 'verifying', 'success'
    const [cardData, setCardData] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Basic formatting for card number
        if (name === 'number') {
            const val = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (val.length <= 19) setCardData(prev => ({ ...prev, [name]: val }));
        } else if (name === 'expiry') {
            const val = value.replace(/\//g, '').replace(/(\d{2})/, '$1/').trim();
            if (val.length <= 5) setCardData(prev => ({ ...prev, [name]: val }));
        } else if (name === 'cvv') {
            if (value.length <= 3) setCardData(prev => ({ ...prev, [name]: value }));
        } else {
            setCardData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('verifying');

        // Simulate Bank Verification (3D Secure)
        setTimeout(() => {
            setStep('success');
            // After 2 seconds of showing success, confirm the transaction
            setTimeout(() => {
                onConfirm();
                onClose();
                setStep('entry'); // Reset for next time
            }, 2000);
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="payment-modal-overlay">
                <motion.div
                    className="payment-modal-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    {step === 'entry' && (
                        <div className="payment-step-entry">
                            <div className="modal-header">
                                <h3><FaCreditCard /> {t('menu.secure_payment')}</h3>
                                <button className="modal-close-x" onClick={onClose}>&times;</button>
                            </div>

                            <div className="payment-amount-banner">
                                <span>{t('menu.amount_to_pay')}</span>
                                <strong>{total}₺</strong>
                            </div>

                            <form onSubmit={handleSubmit} className="card-form">
                                <div className="input-field">
                                    <label>{t('menu.cardholder_name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t('auth.name_label')}
                                        required
                                        value={cardData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <label>{t('menu.card_number')}</label>
                                    <div className="input-with-icon">
                                        <input
                                            type="text"
                                            name="number"
                                            placeholder="0000 0000 0000 0000"
                                            required
                                            value={cardData.number}
                                            onChange={handleInputChange}
                                        />
                                        <FaLock className="field-icon" />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-field">
                                        <label>{t('menu.expiry_date')}</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            required
                                            value={cardData.expiry}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>{t('menu.cvv')}</label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            placeholder="***"
                                            required
                                            value={cardData.cvv}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="security-info">
                                    <FaShieldAlt />
                                    <span>{t('menu.security_info')}</span>
                                </div>

                                <button type="submit" className="pay-now-btn">
                                    {t('menu.pay_now')} {total}₺
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 'verifying' && (
                        <div className="payment-step-verifying">
                            <motion.div
                                className="bank-logo"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <FaUniversity />
                            </motion.div>
                            <h3>{t('menu.bank_connecting')}</h3>
                            <p>{t('menu.bank_help')}</p>
                            <div className="verification-loader">
                                <motion.div
                                    className="loader-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 3 }}
                                />
                            </div>
                            <span className="secure-badge">3D Secure Verified</span>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="payment-step-success">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="success-icon"
                            >
                                <FaCheckCircle />
                            </motion.div>
                            <h3>{t('menu.bank_success')}</h3>
                            <p>{t('menu.bank_redirect')}</p>
                            <div className="receipt-info">
                                <small>{t('common.loading')}</small>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PaymentModal;
