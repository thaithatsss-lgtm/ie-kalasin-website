import React from 'react';
import { motion } from 'framer-motion';
import { Search, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const GalleryItem = ({ image, title, spec, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative group mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
    >
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-100"
        />

        {/* Data Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-white font-heading font-bold text-lg">{title}</h4>
                    <div className="flex items-center text-blue-400 text-xs font-mono mt-1">
                        <Info className="w-3 h-3 mr-1" />
                        {spec}
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Search className="w-4 h-4" />
                </div>
            </div>
        </div>
    </motion.div>
);

export function Gallery({ limit }) {
    const { t } = useLanguage();

    const images = [
        { id: 'building', url: '/images/building-manufacturing.png', title_key: 'item_building', spec: 'Main Laboratory' },
        { id: 'cnc', url: '/images/facilities/cnc_operation.png', title_key: 'item_cnc', spec: 'Advanced Manufacturing' },
        { id: 'robot', url: '/images/facilities/robotic_arm.png', title_key: 'item_robot', spec: 'Automation Systems' },
        { id: 'cad', url: '/images/facilities/cad_design.png', title_key: 'item_cad', spec: 'Engineering Design' },
        { id: 'metrology', url: '/images/facilities/metrology.png', title_key: 'item_metrology', spec: 'Quality Assurance' },
        { id: 'laser', url: '/images/facilities/laser_cut.png', title_key: 'item_laser', spec: 'Precision Cutting' }
    ];

    const displayImages = limit ? images.slice(0, limit) : images;

    return (
        <section id="facilities" className="py-24 bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                            {t('gallery.title_prefix')} <span className="text-blue-500">{t('gallery.title_highlight')}</span> {t('gallery.title_suffix')}
                        </h2>
                        <p className="text-slate-400">
                            {t('gallery.subtitle')}
                        </p>
                    </div>
                    {limit && (
                        <a href="/facilities" className="hidden md:inline-flex items-center px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            {t('activities.read_more')}
                        </a>
                    )}
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {displayImages.map((img, idx) => (
                        <GalleryItem
                            key={img.id}
                            image={img.url}
                            title={t(`gallery.${img.title_key}`)}
                            spec={img.spec}
                            index={idx}
                        />
                    ))}
                </div>

                {limit && (
                    <div className="mt-8 text-center md:hidden">
                        <a href="/facilities" className="inline-flex items-center px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            {t('activities.read_more')}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
