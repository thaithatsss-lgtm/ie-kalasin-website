import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const PathwayContent = ({ type, data, badge }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-2 gap-12 items-center"
    >
        <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-bold uppercase tracking-wider">
                {badge}
            </div>
            <h3 className="text-3xl font-heading font-bold text-white leading-tight">
                {data.title}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
                {data.description}
            </p>
            <ul className="space-y-3">
                {data.points.map((point, i) => (
                    <li key={i} className="flex items-start text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        {point}
                    </li>
                ))}
            </ul>
            <div className="pt-4">
                <a
                    href="https://www.dropbox.com/scl/fi/a3u5teuv545lioh7zhvlm/2566-IE-..pdf?rlkey=t93z36br3rdml6mieccr4b469&dl=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block md:inline-block w-full md:w-auto"
                >
                    <Button variant="primary" className="w-full">
                        {data.btn_text} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </a>
            </div>
        </div>

        <div className="relative">
            <div className="bg-slate-800 rounded-2xl p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="space-y-8 relative z-10">
                    {data.timeline.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === data.timeline.length - 1 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                    {idx + 1}
                                </div>
                                {idx !== data.timeline.length - 1 && <div className="w-0.5 h-full bg-slate-700 my-2" />}
                            </div>
                            <div className="pb-8">
                                <h4 className="text-white font-bold text-lg">{item.year}</h4>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

export function Pathways() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('m6');

    // Helper to restructure translation data for the component
    const content = {
        m6: {
            title: t('pathways.m6_title'),
            description: t('pathways.m6_desc'),
            points: [
                t('pathways.m6_p1'),
                t('pathways.m6_p2'),
                t('pathways.m6_p3'),
                t('pathways.m6_p4')
            ],
            btn_text: t('pathways.btn_download'),
            timeline: [
                { year: "Year 1-2", desc: "Basic Engineering & Sciences" },
                { year: "Year 3", desc: "Core IE Modules & Lab Work" },
                { year: "Year 3.5", desc: "Co-operative Education & Capstone" }
            ]
        },
        diploma: {
            title: t('pathways.diploma_title'),
            description: t('pathways.diploma_desc'),
            points: [
                t('pathways.diploma_p1'),
                t('pathways.diploma_p2'),
                t('pathways.diploma_p3'),
                t('pathways.diploma_p4')
            ],
            btn_text: t('pathways.btn_download'),
            timeline: [
                { year: "Year 1", desc: "Bridge Courses & Advanced Theory" },
                { year: "Year 2", desc: "Specialized Labs & Management" },
                { year: "Year 2.5", desc: "Project & Industry Integration" }
            ]
        }
    };

    return (
        <section id="curriculum" className="py-24 bg-slate-900 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                        {t('pathways.title')}
                    </h2>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex bg-slate-800 p-1 rounded-xl">
                                {['m6', 'diploma'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === tab
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {t(`pathways.tab_${tab}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <PathwayContent
                                key={activeTab}
                                type={activeTab === 'm6' ? 'High School' : 'Diploma'}
                                badge={t(`pathways.${activeTab}_badge`)}
                                data={content[activeTab]}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
