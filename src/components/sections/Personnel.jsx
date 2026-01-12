import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const Person = ({ name, role, img, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="bg-slate-800 p-6 rounded-xl border border-white/5 flex flex-col items-center text-center hover:border-blue-500/50 transition-colors"
    >
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-slate-700 bg-slate-700">
            {/* Placeholder avatar */}
            <img src={img || `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0D8ABC&color=fff`} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-white font-bold text-lg">{name}</h3>
        <p className="text-blue-400 text-sm">{role}</p>
    </motion.div>
);

export function Personnel() {
    const { t } = useLanguage();

    const faculty = [
        { name: "Dr. Somchai Maker", role: t('personnel.role_head') },
        { name: "Asst. Prof. Jane Engineer", role: t('personnel.role_lecturer') },
        { name: "Dr. Narong Tech", role: t('personnel.role_lecturer') },
        { name: "Ajarn Suda Logic", role: t('personnel.role_lecturer') },
    ];

    return (
        <section id="personnel" className="py-24 bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('personnel.title')}</h2>
                    <p className="text-slate-400">{t('personnel.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {faculty.map((p, idx) => (
                        <Person key={idx} {...p} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
