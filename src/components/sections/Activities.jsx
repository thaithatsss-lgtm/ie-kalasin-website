import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Plus, Lock, X, Trash2, Upload } from 'lucide-react';
import { initialActivities } from '../../data/initialActivities';
import { RichTextEditor } from '../ui/RichTextEditor';

const ActivityCard = ({ id, title, date, img, isAdmin, onDelete }) => (
    <div className="relative group block">
        <Link to={`/activity/${id}`} className="group relative overflow-hidden rounded-xl bg-slate-800 aspect-[4/3] block">
            <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <span className="text-orange-500 text-xs font-bold uppercase mb-2">{date}</span>
                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors">{title}</h3>
            </div>
        </Link>
        {isAdmin && (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm('Are you sure you want to delete this activity?')) onDelete(id);
                }}
                className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        )}
    </div>
);

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
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

export function Activities() {
    const { t } = useLanguage();
    const { isAdmin } = useAuth();
    const [activities, setActivities] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [newActivity, setNewActivity] = useState({
        title: '',
        date: '',
        img: '',
        description: ''
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('activities') || '[]');
        if (stored.length > 0) {
            setActivities(stored);
        } else {
            setActivities(initialActivities);
            localStorage.setItem('activities', JSON.stringify(initialActivities));
        }
    }, []);

    const handleAddActivity = (e) => {
        e.preventDefault();
        const id = Math.max(0, ...activities.map(a => a.id)) + 1;
        const activityToAdd = { ...newActivity, id };
        const updated = [...activities, activityToAdd]; // Newest last (append)

        setActivities(updated);
        localStorage.setItem('activities', JSON.stringify(updated));

        setShowAdd(false);
        setNewActivity({ title: '', date: '', img: '', description: '' });
    };

    const handleDeleteActivity = (id) => {
        const updated = activities.filter(a => a.id !== id);
        setActivities(updated);
        localStorage.setItem('activities', JSON.stringify(updated));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewActivity(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id="activities" className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('activities.title')}</h2>
                        <p className="text-slate-400 max-w-xl">{t('activities.subtitle')}</p>
                    </div>
                    <div className="flex gap-4">
                        {isAdmin ? (
                            <>
                                <Button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-700">
                                    <Plus className="w-4 h-4 mr-2" /> Add Activity
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

                <div className="grid md:grid-cols-3 gap-6">
                    {activities.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            {...activity}
                            isAdmin={isAdmin}
                            onDelete={handleDeleteActivity}
                        />
                    ))}
                </div>
            </div>

            {/* Add Activity Modal */}
            {showAdd && (
                <Modal title="Add New Activity" onClose={() => setShowAdd(false)}>
                    <form onSubmit={handleAddActivity} className="space-y-4">
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Topic / Title</label>
                            <input
                                required
                                type="text"
                                value={newActivity.title}
                                onChange={e => setNewActivity({ ...newActivity, title: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Science Week 2026"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Date</label>
                            <input
                                required
                                type="text"
                                value={newActivity.date}
                                onChange={e => setNewActivity({ ...newActivity, date: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. JAN 15, 2026"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Image Upload</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 border-dashed rounded-lg p-4 text-slate-400 hover:text-white hover:border-slate-500 cursor-pointer transition-colors"
                                >
                                    <Upload className="w-5 h-5" />
                                    {newActivity.img ? "Image Selected" : "Click to Upload Image"}
                                </label>
                            </div>
                            {newActivity.img && (
                                <div className="mt-2 h-32 rounded-lg overflow-hidden">
                                    <img src={newActivity.img} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Details (Customize text, add images & links)</label>
                            <RichTextEditor
                                value={newActivity.description}
                                onChange={(html) => setNewActivity({ ...newActivity, description: html })}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Add Post</Button>
                    </form>
                </Modal>
            )}
        </section>
    );
}
