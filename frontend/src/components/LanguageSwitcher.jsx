import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'tr' ? 'en' : 'tr';
        i18n.changeLanguage(newLang);
    };

    return (
        <span className="lang-toggle" onClick={toggleLanguage} style={{ cursor: 'pointer' }}>
            {i18n.language.toUpperCase() === 'TR' ? 'TR | EN' : 'EN | TR'}
        </span>
    );
};

export default LanguageSwitcher;
