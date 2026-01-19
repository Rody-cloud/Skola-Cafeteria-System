import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import {
    FaShoppingCart,
    FaClock,
    FaQrcode,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaChevronRight
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Home = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleOrderNow = () => {
        navigate("/menu");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.68, -0.6, 0.32, 1.6] } }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.68, -0.6, 0.32, 1.6] } }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.68, -0.6, 0.32, 1.6] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div className="home-container">
            {/* HEADER */}
            <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
                <div className="header-main">
                    <div className="header-left">
                        <span><FaPhoneAlt size={10} /> +90 216 123 45 67</span>
                        <LanguageSwitcher />
                    </div>

                    <Link to="/" className="logo-container">
                        <img src="/Images/logo.png" alt="Skola Logo" className="logo" />
                    </Link>

                    <div className="header-right">
                        <nav className="nav-wrapper">
                            <Link to="/" className="nav-link active">Home</Link>
                            <Link to="/menu" className="nav-link">Menu</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>
                            <Link to="/menu" className="nav-link">Order</Link>
                        </nav>

                        <div className="auth-wrapper">
                            {user ? (
                                <>
                                    <span className="user-name">{t('common.welcome')}, {user.name}</span>
                                    <button onClick={handleLogout} className="logout-btn">{t('common.logout')}</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" className="signup-btn">{t('common.register')}</Link>
                                    <Link to="/login" className="login-btn">{t('common.login')}</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="hero">
                <div className="video-background-container">
                    <video className="hero-video" autoPlay muted loop playsInline>
                        <source src="/videos/cafeteria.mp4" type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>

                <motion.div
                    className="hero-content"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span variants={fadeInUp} className="hero-tag">
                        {t('home.hero_tag')}
                    </motion.span>
                    <motion.h1 variants={fadeInUp} className="hero-title">
                        {t('home.hero_title')}
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="hero-desc">
                        {t('home.hero_desc')}
                    </motion.p>
                    <motion.div variants={fadeInUp} className="hero-btns">
                        <button className="primary-btn pulse" onClick={handleOrderNow}>
                            {t('home.get_started')} <FaChevronRight />
                        </button>
                        <Link to="/menu" className="secondary-btn">
                            {t('home.view_menu')}
                        </Link>
                    </motion.div>
                </motion.div>
                <div className="section-divider"></div>
            </section>

            {/* HOW IT WORKS */}
            <section className="how-it-works">
                <div className="container">
                    <motion.div
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span>{t('home.process_title').split(' ')[0]}</span>
                        <h2>{t('home.process_title')}</h2>
                    </motion.div>

                    <div className="process-grid">
                        <motion.div
                            className="process-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInLeft}
                        >
                            <span className="step-number">01</span>
                            <div className="icon-box"><FaShoppingCart /></div>
                            <h4>{t('home.process_step1_title')}</h4>
                            <p>{t('home.process_step1_desc')}</p>
                        </motion.div>
                        <motion.div
                            className="process-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <span className="step-number">02</span>
                            <div className="icon-box"><FaClock /></div>
                            <h4>{t('home.process_step2_title')}</h4>
                            <p>{t('home.process_step2_desc')}</p>
                        </motion.div>
                        <motion.div
                            className="process-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInRight}
                        >
                            <span className="step-number">03</span>
                            <div className="icon-box"><FaQrcode /></div>
                            <h4>{t('home.process_step3_title')}</h4>
                            <p>{t('home.process_step3_desc')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FEATURED ITEMS */}
            <section className="featured-items">
                <div className="container">
                    <div className="section-title">
                        <span>{t('home.featured_title').toUpperCase()}</span>
                        <h2>{t('home.featured_desc')}</h2>
                    </div>

                    <div className="food-grid">
                        {[
                            { img: "/Images/pasta.jpg", title: "Grilled Chicken Pasta", desc: "Alfredo base, parmesan, fresh herbs", price: "₺150" },
                            { img: "/Images/burger.jpg", title: "Classic Beef Burger", desc: "150g patty, cheddar, carmelized onions", price: "₺125" },
                            { img: "/Images/salad.jpg", title: "Avocado Garden Salad", desc: "Mixed greens, seeds, light lemon zest", price: "₺160" },
                            { img: "/Images/pizza.jpg", title: "Margherita Pizza", desc: "Mozzarella, basil, san marzano tomato", price: "₺145" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="food-item-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                            >
                                <div className="img-wrapper">
                                    <img src={item.img} alt={item.title} />
                                    <div className="price-tag">{item.price}</div>
                                </div>
                                <div className="food-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <Link to="/menu" className="order-link">{t('home.view_menu')}</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-col">
                            <img src="/Images/logo.png" alt="Skola Logo" className="footer-logo" />
                            <p>{t('footer.tagline')}</p>
                        </div>
                        <div className="footer-col">
                            <h4>{t('footer.links_title')}</h4>
                            <div className="links">
                                <Link to="/">{t('common.back')}</Link>
                                <Link to="/menu">Menu</Link>
                                <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h4>Support</h4>
                            <p><FaPhoneAlt /> +90 216 123 45 67</p>
                            <p><FaEnvelope /> skola@topkapi.edu.tr</p>
                            <p><FaMapMarkerAlt /> Altunizade Campus</p>
                        </div>
                        <div className="footer-col">
                            <div className="map">
                                <iframe
                                    title="map"
                                    src="https://www.google.com/maps?q=Altunizade,+Üsküdar,+İstanbul&output=embed"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 Skola Cafeteria. Precision Designed.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
