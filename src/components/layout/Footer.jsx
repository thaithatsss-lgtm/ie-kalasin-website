import React from 'react';
import { Button } from '../ui/Button';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-navy-900 border-t border-white/5 relative overflow-hidden">
            {/* Circuit Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] pointer-events-none" />

            {/* Conversion Push */}
            <div className="relative z-10 border-b border-white/10">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-tight">
                        {t('footer.title_prefix')} <span className="text-orange-500">{t('footer.title_highlight')}</span> {t('footer.title_suffix')}
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="https://admission.ksu.ac.th/" target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="lg" className="text-lg px-12 shadow-orange-500/20 shadow-2xl animate-pulse">
                                {t('footer.btn_apply')}
                            </Button>
                        </a>
                        <Link to="/contact">
                            <Button variant="outline" size="lg" className="text-lg px-8 border-slate-600 text-slate-300 hover:text-white hover:border-white">
                                {t('footer.btn_contact')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <img src="/images/logo.png" alt="IE Kalasin Logo" className="h-12 w-auto object-contain" />
                            <span className="font-heading font-bold text-xl text-white tracking-tight">{t('footer.department')}</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
                            {t('footer.desc')}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-white mb-6">{t('footer.links_title')}</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li><Link to="/curriculum" className="hover:text-orange-500 transition-colors">{t('pathways.tab_m6')}</Link></li>
                            <li><Link to="/curriculum" className="hover:text-orange-500 transition-colors">{t('pathways.tab_diploma')}</Link></li>
                            <li><Link to="/faculty" className="hover:text-orange-500 transition-colors">{t('nav.personnel')}</Link></li>
                            <li><Link to="/activities" className="hover:text-orange-500 transition-colors">{t('nav.activities')}</Link></li>
                            <li><Link to="/services" className="hover:text-orange-500 transition-colors">{t('nav.services')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-white mb-6">{t('footer.contact_title')}</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                                <span>{t('footer.address')}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                                <span>{t('footer.phone')}</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 text-blue-500 shrink-0" />
                                <span>{t('footer.email')}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
