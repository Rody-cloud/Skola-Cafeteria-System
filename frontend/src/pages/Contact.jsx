import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import "./Contact.css";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaClock
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Contact = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const [formData, setFormData] = useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        message: ""
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! (Mock)");
        setFormData({ ...formData, message: "" });
    };

    return (
        <div className="contact-page">
            {/* HEADER (Emerald Style) */}
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
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/menu" className="nav-link">Menu</Link>
                            <Link to="/contact" className="nav-link active">Contact</Link>
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

            {/* CONTACT HERO */}
            <section className="contact-hero">
                <div className="hero-overlay"></div>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Get In <span className="accent">Touch</span></h1>
                    <p>We're here to help you.</p>
                </motion.div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="contact-container container">
                <div className="contact-grid">
                    {/* LEFT: FORM */}
                    <motion.div
                        className="contact-form-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>Send a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                Send Message <FaPaperPlane size={14} />
                            </button>
                        </form>
                    </motion.div>

                    {/* RIGHT: INFO */}
                    <motion.div
                        className="contact-info-panel"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="info-item">
                            <div className="info-icon"><FaPhoneAlt /></div>
                            <div className="info-text">
                                <h4>Phone</h4>
                                <p>+90 216 123 45 67</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon"><FaEnvelope /></div>
                            <div className="info-text">
                                <h4>Email</h4>
                                <p>skola@topkapi.edu.tr</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon"><FaMapMarkerAlt /></div>
                            <div className="info-text">
                                <h4>Location</h4>
                                <p>Altunizade Campus, Istanbul</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon"><FaClock /></div>
                            <div className="info-text">
                                <h4>Hours</h4>
                                <p>Mon - Fri: 09:00 - 18:00</p>
                            </div>
                        </div>

                        <div className="map-wrapper">
                            <iframe
                                title="contact-map"
                                src="https://www.google.com/maps?q=Altunizade,+Üsküdar,+İstanbul&output=embed"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-col">
                            <img src="/Images/logo.png" alt="Skola Logo" className="footer-logo" />
                            <p>Premium campus dining, simplified through technology.</p>
                        </div>
                        <div className="footer-col">
                            <h4>Links</h4>
                            <div className="links">
                                <Link to="/">Home</Link>
                                <Link to="/menu">Menu</Link>
                                <Link to="/contact">Contact</Link>
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

export default Contact;
