import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { path: "/bachelor", label: t('nav.bachelor') },
        { path: "/diploma", label: t('nav.diploma') },
        { path: "/facilities", label: t('nav.facilities') },
        { path: "/faculty", label: t('nav.personnel') },
        { path: "/activities", label: t('nav.activities') },
        { path: "/services", label: t('nav.services') },
        { path: "/contact", label: t('nav.contact') },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    {/* Logo Placeholder */}
                    <img src="/images/logo.png" alt="IE Kalasin Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-xl leading-none tracking-tight text-white group-hover:text-amber-400 transition-colors">{t('nav.brand')}</span>
                        <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">{t('nav.brand_sub')}</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-6">
                    {links.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-all duration-200 ${isActive ? 'text-amber-400 scale-105' : 'text-slate-300 hover:text-white hover:scale-105'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <div className="h-5 w-px bg-slate-700/50" />

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-2 py-1 rounded-md hover:bg-slate-800"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">{language}</span>
                    </button>

                    <a href="https://admission.ksu.ac.th/" target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm">{t('nav.apply')}</Button>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-4 space-y-4 flex flex-col">
                            {links.map((link) => (
                                <NavLink
                                    key={link.label}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block py-2 text-base font-medium ${isActive ? 'text-amber-400' : 'text-slate-300 hover:text-white'}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-2 text-slate-300 hover:text-white"
                                >
                                    <Globe className="w-5 h-5" />
                                    <span className="uppercase font-bold">{language === 'en' ? 'English' : 'ไทย'}</span>
                                </button>
                                <a href="https://admission.ksu.ac.th/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary" size="sm">{t('nav.apply')}</Button>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
