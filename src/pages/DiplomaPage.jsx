import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Download, BookOpen, Clock, Award, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function DiplomaPage() {
    const { t } = useLanguage();

    const timeline = [
        { year: t('diploma_page.year_1'), desc: t('diploma_page.year_1_desc') },
        { year: t('diploma_page.year_2'), desc: t('diploma_page.year_2_desc') },
    ];

    const subjects = t('diploma_page.subjects'); // Expecting an array

    return (
        <div className="pt-24 pb-12 min-h-screen bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold uppercase tracking-wider mb-4">
                        {t('nav.diploma')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        {t('diploma_page.title')}
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        {t('diploma_page.subtitle')}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

                    {/* Left Column: Timeline & download */}
                    <div className="space-y-8">
                        {/* Timeline Card */}
                        <div className="bg-slate-800 rounded-2xl p-8 border border-white/5 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-50" />
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-orange-400" />
                                {t('diploma_page.timeline_title')}
                            </h3>

                            <div className="space-y-8 relative ml-2">
                                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-700" />

                                {timeline.map((item, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className={`absolute left-[-5px] top-1.5 w-3 h-3 rounded-full ring-4 ring-slate-800 ${idx === timeline.length - 1 ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                        <h4 className="font-bold text-lg text-white mb-2">{item.year}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subjects Highlight */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-indigo-400" />
                                {t('diploma_page.subjects_title')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(subjects) && subjects.map((subj, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full border border-slate-600">
                                        {subj}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Features & CTA */}
                    <div className="space-y-6">
                        <div className="grid gap-6">
                            <FeatureCard
                                icon={<Award className="w-6 h-6 text-purple-400" />}
                                title={t('diploma_page.feature_1_title')}
                                desc={t('diploma_page.feature_1_desc')}
                            />
                            <FeatureCard
                                icon={<BookOpen className="w-6 h-6 text-rose-400" />}
                                title={t('diploma_page.feature_2_title')}
                                desc={t('diploma_page.feature_2_desc')}
                            />
                            <FeatureCard
                                icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                                title={t('diploma_page.feature_3_title')}
                                desc={t('diploma_page.feature_3_desc')}
                            />
                        </div>

                        {/* Download CTA */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg text-center mt-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Ready to Upgrade?</h3>
                            <p className="text-blue-100 mb-6 text-sm">Download the full curriculum PDF to see all course details.</p>
                            <a
                                href="https://www.dropbox.com/scl/fi/zifs1wphyal4wm629uxpw/65_06-01-65-1-1.pdf?rlkey=ja9bjer02godqbg9a9lxyz28j&st=zbcg78st&dl=0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-slate-100 font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md w-full sm:w-auto">
                                    <Download className="w-5 h-5" />
                                    {t('diploma_page.download_btn')}
                                </button>
                            </a>
                        </div>

                        <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center">
                            <p className="text-slate-500 text-xs leading-relaxed">
                                * หลักสูตรได้รับการรับรองจากสภาวิศวกร (Associate Engineer License path)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
    >
        <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{desc}</p>
    </motion.div>
);
