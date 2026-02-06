import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { NewsCard } from '../components/ui/NewsCard';
import { NewsForm } from '../components/admin/NewsForm';
import { Button } from '../components/ui/Button';
import { Plus, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5">
                    <X className="w-5 h-5" />
                </button>
            </div>
            {children}
        </div>
    </div>
);

export function NewsPage() {
    const { news, addNews, deleteNews } = useNews();
    const { isAdmin } = useAuth();
    const { t } = useLanguage();
    const [showAdd, setShowAdd] = useState(false);

    const handleCreate = (data) => {
        addNews(data);
        setShowAdd(false);
    };

    // Safety check
    if (!news || !Array.isArray(news)) {
        return (
            <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
                <div className="text-white">Loading news...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-20">
            <div className="py-12 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                                {t('news.title_prefix')} <span className="text-amber-500">{t('news.title_highlight')}</span>
                            </h1>
                            <p className="text-slate-400 text-lg">
                                {t('news.subtitle')}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {isAdmin ? (
                                <>
                                    <Button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-700">
                                        <Plus className="w-4 h-4 mr-2" /> Add News
                                    </Button>
                                    <Link to="/admin">
                                        <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400/10">
                                            Dashboard
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login">
                                    <button
                                        className="text-sm text-slate-400 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <Lock className="w-4 h-4" />
                                        <span>Admin</span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {news.map(item => (
                            <NewsCard
                                key={item.id}
                                {...item}
                                isAdmin={isAdmin}
                                onDelete={deleteNews}
                            />
                        ))}
                    </div>

                    {news.length === 0 && (
                        <div className="text-center py-24 bg-slate-800/30 rounded-3xl border border-slate-700/50 border-dashed">
                            <p className="text-slate-500 text-lg">No news announcements found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add News Modal */}
            {showAdd && (
                <Modal title="Add News" onClose={() => setShowAdd(false)}>
                    <NewsForm
                        onSubmit={handleCreate}
                        onCancel={() => setShowAdd(false)}
                    />
                </Modal>
            )}
        </div>
    );
}
