import { motion, useInView } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { TrendingUp, Quote, User, Briefcase, Award, CheckCircle, Building2, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CareerLevel = ({ icon: Icon, title, roles, color }) => (
    <div className="bg-slate-800/40 p-5 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all">
        <div className={`flex items-center gap-3 mb-3 ${color}`}>
            <Icon className="w-5 h-5" />
            <h4 className="font-bold text-white text-sm">{title}</h4>
        </div>
        <ul className="space-y-1">
            {roles.split(', ').map((role, idx) => (
                <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                    {role}
                </li>
            ))}
        </ul>
    </div>
);

const CheckList = ({ title, items, icon: Icon }) => (
    <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-500" />
            {title}
        </h3>
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const Testimonial = ({ quote, author, role, image }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 relative">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />
        <p className="text-slate-300 italic mb-6 relative z-10">"{quote}"</p>
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-700 mr-3 overflow-hidden">
                <img src={image} alt={author} className="w-full h-full object-cover" />
            </div>
            <div>
                <h4 className="text-white font-bold text-sm">{author}</h4>
                <div className="text-xs text-blue-400">{role}</div>
            </div>
        </div>
    </div>
);

export function Career() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-slate-900 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center space-x-2 text-orange-500 font-bold mb-4">
                            <TrendingUp className="w-5 h-5" />
                            <span className="uppercase tracking-widest text-sm">{t('career.badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                            {t('career.title_prefix')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{t('career.title_highlight')}</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            {t('career.subtitle')}
                        </p>

                        {/* Career Roles Grid */}
                        <div className="grid gap-4 mb-8">
                            <CareerLevel
                                icon={User}
                                title={t('career.level_entry_title')}
                                roles={t('career.level_entry_roles')}
                                color="text-green-400"
                            />
                            <CareerLevel
                                icon={Briefcase}
                                title={t('career.level_mid_title')}
                                roles={t('career.level_mid_roles')}
                                color="text-blue-400"
                            />
                            <CareerLevel
                                icon={Award}
                                title={t('career.level_senior_title')}
                                roles={t('career.level_senior_roles')}
                                color="text-orange-400"
                            />
                        </div>

                        {/* Industry & Readiness Lists */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <CheckList
                                icon={Building2}
                                title={t('career.work_at_title')}
                                items={t('career.work_at_items')}
                            />
                            <CheckList
                                icon={GraduationCap}
                                title={t('career.readiness_title')}
                                items={t('career.readiness_items')}
                            />
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-slate-500 italic mt-6 border-t border-white/5 pt-4">
                            {t('career.disclaimer')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-heading font-bold text-white mb-6">{t('career.welcome_title')}</h3>

                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 rotate-180" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-4 border-slate-700/50 shadow-xl group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src="/images/faculty/amin.png"
                                            alt={t('career.welcome_name')}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-2">
                                            <Award className="w-3 h-3" />
                                            {t('career.welcome_role')}
                                        </div>
                                        <h4 className="text-lg sm:text-xl font-bold text-white">{t('career.welcome_name')}</h4>
                                    </div>
                                </div>

                                <blockquote className="text-slate-300 italic text-lg leading-relaxed border-l-4 border-orange-500/50 pl-4 mb-8">
                                    "{t('career.welcome_msg')}"
                                </blockquote>

                                {/* Video Section */}
                                <VideoPlayer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const isInView = useInView(videoRef, { amount: 0.5 }); // Trigger when 50% visible

    useEffect(() => {
        if (videoRef.current) {
            if (isInView) {
                videoRef.current.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
            <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                muted
                loop
                playsInline
                controls
                src="/videos/video-ie.mp4"
            />
        </div>
    );
};
