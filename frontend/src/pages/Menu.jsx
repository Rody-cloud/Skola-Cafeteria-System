import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaPlus, FaTrash, FaTimes, FaCreditCard, FaMoneyBillWave, FaArrowRight, FaChevronRight } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts, createOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './Menu.css';
import PaymentModal from '../components/PaymentModal';
import OrderConfirmationModal from '../components/OrderConfirmationModal';
import '../components/OrderConfirmationModal.css';

const Menu = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState(null);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                if (data.length > 0) {
                    let categories = [...new Set(data.map(p => p.category))];
                    categories = categories.filter(c => c !== 'EKSTRALAR').concat(categories.includes('EKSTRALAR') ? ['EKSTRALAR'] : []);
                    setActiveCategory(categories[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (!user) {
            alert('Please log in to place an order');
            return;
        }

        if (paymentMethod === 'Card') {
            setIsPaymentModalOpen(true);
        } else {
            // Straight to creation for Cash
            proceedToOrderCreation();
        }
    };

    const proceedToOrderCreation = async () => {
        setIsCheckingOut(true);
        try {
            const orderData = {
                customerId: user.id,
                paymentMethod: paymentMethod,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await createOrder(orderData);

            if (paymentMethod === 'Cash') {
                setConfirmedOrder({
                    id: response.orderId,
                    total: totalPrice
                });
                setIsQRModalOpen(true);
            } else {
                setOrderSuccess(true);
                setTimeout(() => setOrderSuccess(false), 5000);
            }

            setCart([]);
            setIsCartOpen(false);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsCheckingOut(false);
            setIsPaymentModalOpen(false);
        }
    };

    let categories = [...new Set(products.map(p => p.category))];
    categories = categories.filter(c => c !== 'EKSTRALAR').concat(categories.includes('EKSTRALAR') ? ['EKSTRALAR'] : []);
    const filteredProducts = products.filter(p => p.category === activeCategory);

    const getTranslatedCategory = (cat) => {
        const keyMap = {
            'Main Dishes': 'category_main',
            'Snacks': 'category_snacks',
            'Beverages': 'category_drinks',
            'Desserts': 'category_desserts',
            'EKSTRALAR': 'category_extras',
            'SICAK İÇECEKLER': 'category_hot_drinks',
            'SOĞUK KAHVELER': 'category_cold_coffees',
            'SOĞUK İÇECEKLER': 'category_cold_drinks',
            'FAST FOOD': 'category_fast_food',
            'SALATA': 'category_salads'
        };
        return t(`menu.${keyMap[cat] || cat}`, cat);
    };

    if (loading) return (
        <div className="menu-loading">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="loader"
            />
        </div>
    );

    return (
        <div className="menu-page">
            <header className="menu-header">
                <Link to="/" className="menu-logo-link">
                    <img src="/Images/logo.png" alt="Skola Logo" className="menu-logo" />
                </Link>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {t('menu.title')}
                </motion.h1>
                <p>{t('home.featured_desc')}</p>
            </header>

            {/* CATEGORY TABS */}
            <div className="category-tabs-container">
                <div className="category-tabs">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {getTranslatedCategory(category)}
                        </button>
                    ))}
                </div>
            </div>

            {/* PRODUCT VIEW AREA */}
            <main className="menu-view-area">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="product-grid"
                    >
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                className="menu-product-card"
                                whileHover={{ y: -8 }}
                                layout
                            >
                                <div className="product-image-wrapper">
                                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                                    <span className="product-badge">{getTranslatedCategory(product.category)}</span>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{t('footer.tagline')}</p>
                                    <div className="product-footer">
                                        <span className="product-price">{product.price}₺</span>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={() => addToCart(product)}
                                        >
                                            <FaPlus size={10} /> {t('common.confirm').split(' ')[0]}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* CART TOGGLE */}
            <button className="cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
                <FaShoppingCart size={24} />
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>

            {/* CART SIDEBAR */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            className="cart-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                        />
                        <motion.div
                            className="cart-sidebar open"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="cart-header">
                                <h2>{t('menu.cart_title')}</h2>
                                <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="cart-items">
                                {cart.length === 0 ? (
                                    <div className="empty-cart">
                                        <p>{t('menu.empty_cart')}</p>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <div className="cart-item-price">{item.price}₺</div>
                                                <div className="quantity-controls">
                                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                </div>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>{t('common.total')}</span>
                                        <span>{totalPrice}₺</span>
                                    </div>

                                    <h4 style={{ marginTop: '20px', fontSize: '0.9rem' }}>{t('menu.payment_method').toUpperCase()}</h4>
                                    <div className="payment-methods">
                                        <button
                                            className={`payment-btn ${paymentMethod === 'Card' ? 'active' : ''}`}
                                            onClick={() => setPaymentMethod('Card')}
                                        >
                                            <FaCreditCard />
                                            <span>{t('menu.pay_card')}</span>
                                        </button>
                                        <button
                                            className={`payment-btn ${paymentMethod === 'Cash' ? 'active' : ''}`}
                                            onClick={() => setPaymentMethod('Cash')}
                                        >
                                            <FaMoneyBillWave />
                                            <span>{t('menu.pay_cash')}</span>
                                        </button>
                                    </div>

                                    {paymentMethod === 'Cash' && (
                                        <div className="payment-info-box">
                                            <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginBottom: '15px' }}>
                                                {t('menu.order_help')}
                                            </p>
                                        </div>
                                    )}

                                    <div className="summary-row summary-total">
                                        <span>{t('common.total')}</span>
                                        <span>{totalPrice}₺</span>
                                    </div>

                                    <button
                                        className="checkout-btn"
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                    >
                                        {isCheckingOut ? <div className="loader" /> : (
                                            <>{t('menu.confirm_order')} <FaArrowRight size={14} style={{ marginLeft: '10px' }} /></>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* PAYMENT MODAL */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onConfirm={proceedToOrderCreation}
                total={totalPrice}
            />

            {/* ORDER SUCCESS TOAST */}
            <AnimatePresence>
                {orderSuccess && (
                    <motion.div
                        className="order-success-toast"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        {t('menu.order_success')}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* QR CONFIRMATION MODAL */}
            <OrderConfirmationModal
                isOpen={isQRModalOpen}
                onClose={() => setIsQRModalOpen(false)}
                orderData={confirmedOrder}
            />
        </div>
    );
};

export default Menu;
