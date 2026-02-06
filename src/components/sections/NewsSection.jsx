import React from 'react';
import { useNews } from '../../context/NewsContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { NewsCard } from '../ui/NewsCard';
import { Button } from '../ui/Button';

export function NewsSection() {
    const { news } = useNews();
    const { t } = useLanguage();

    // Take only the first 6 items for the home page
    const displayNews = news.slice(0, 6);

    return (
        <section id="news" className="py-24 bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                            {t('news.title_prefix')} <span className="text-amber-500">{t('news.title_highlight')}</span>
                        </h2>
                        <p className="text-slate-400">
                            {t('news.subtitle')}
                        </p>
                    </div>
                    <Link to="/news">
                        <Button variant="outline" className="hidden md:flex">
                            View All News
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayNews.map(item => (
                        <NewsCard
                            key={item.id}
                            {...item}
                        />
                    ))}
                    {displayNews.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
                            <p className="text-slate-500">No news updates available at the moment.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/news">
                        <Button variant="outline" className="w-full">
                            View All News
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
