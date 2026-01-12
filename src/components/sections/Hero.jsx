import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, GraduationCap, Factory, Monitor, HardHat } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const HeroFeature = ({ icon: Icon, title, desc }) => (
    <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2 text-blue-400">
            <Icon className="w-6 h-6" />
            <span className="font-heading font-bold text-lg text-white">{title}</span>
        </div>
        <span className="text-sm text-slate-400 leading-relaxed max-w-[200px]">{desc}</span>
    </div>
);

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-slate-900/90 to-black z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 pointer-events-none" />
            </div>

            <div className="container relative z-20 mx-auto px-4 grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <span>{t('hero.badge')}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-white mb-6">
                            {t('hero.title_prefix')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{t('hero.title_suffix')}</span>
                        </h1>

                        <h2 className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
                            {t('hero.subtitle_prefix')} <span className="text-orange-500 font-semibold">{t('hero.subtitle_highlight')}</span>.
                            {t('hero.subtitle_suffix')}
                        </h2>
                    </motion.div>

                    {/* ... Buttons ... */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <a href="https://admission.ksu.ac.th/" target="_blank" rel="noopener noreferrer">
                            <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                                {t('hero.cta_primary')}
                                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                        <a href="https://www.dropbox.com/scl/fi/a3u5teuv545lioh7zhvlm/2566-IE-..pdf?rlkey=t93z36br3rdml6mieccr4b469&dl=0" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                                {t('hero.cta_secondary')}
                            </Button>
                        </a>
                    </motion.div>

                    {/* ... Stats ... */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10 mt-12"
                    >
                        <HeroFeature icon={GraduationCap} title={t('hero.feature_practice_title')} desc={t('hero.feature_practice_desc')} />
                        <HeroFeature icon={Factory} title={t('hero.feature_coop_title')} desc={t('hero.feature_coop_desc')} />
                        <HeroFeature icon={Monitor} title={t('hero.feature_software_title')} desc={t('hero.feature_software_desc')} />
                        <HeroFeature icon={HardHat} title={t('hero.feature_license_title')} desc={t('hero.feature_license_desc')} />
                    </motion.div>
                </div>

                {/* Hero Image Section */}
                <div className="md:col-span-5 relative hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative z-10"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 glow-box">
                            {/* Image Mask/Blend */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
                            <img
                                src="/images/hero-students.png"
                                alt="IE Students and Technology"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative Elements around image */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
