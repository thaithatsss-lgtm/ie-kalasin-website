import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Import new 3D icons
import iconAutomation from '../../assets/icon_automation.png';
import iconData from '../../assets/icon_data.png';
import iconLogistics from '../../assets/icon_logistics.png';

const FeatureCard = ({ image, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        className="group relative p-8 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300 shadow-xl"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

        <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300 shadow-lg overflow-hidden p-2">
                <img src={image} alt={title} className="w-full h-full object-contain" />
            </div>

            <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {title}
            </h3>

            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {description}
            </p>
        </div>
    </motion.div>
);

export function ValueProp() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-500 font-medium tracking-wider uppercase text-sm mb-2 block">{t('valueProp.badge')}</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                        {t('valueProp.title')}
                    </h2>
                    <p className="text-slate-400 text-lg">
                        {t('valueProp.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        image={iconAutomation}
                        title={t('valueProp.card1_title')}
                        description={t('valueProp.card1_desc')}
                        delay={0}
                    />
                    <FeatureCard
                        image={iconData}
                        title={t('valueProp.card2_title')}
                        description={t('valueProp.card2_desc')}
                        delay={0.1}
                    />
                    <FeatureCard
                        image={iconLogistics}
                        title={t('valueProp.card3_title')}
                        description={t('valueProp.card3_desc')}
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}
