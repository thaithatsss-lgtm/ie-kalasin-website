import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Plus, Lock, X, Trash2, Upload } from 'lucide-react';
import { initialServices } from '../../data/initialServices';
import { RichTextEditor } from '../ui/RichTextEditor';

const ServiceCard = ({ id, title, description, img, isAdmin, onDelete }) => (
    <div className="relative group block bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-colors">
        <div className="h-48 overflow-hidden relative">
            <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
            <div
                className="text-slate-400 text-sm line-clamp-3 prose prose-invert max-w-none prose-sm"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>

        {isAdmin && (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm('Are you sure you want to delete this service?')) onDelete(id);
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

export function Services() {
    const { t } = useLanguage();
    const [services, setServices] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    // Login Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Add Service Form State
    const [newService, setNewService] = useState({
        title: '',
        img: '',
        description: ''
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('services') || '[]');
        if (stored.length > 0) {
            setServices(stored);
        } else {
            setServices(initialServices);
            localStorage.setItem('services', JSON.stringify(initialServices));
        }

        const adminSession = sessionStorage.getItem('isAdmin');
        if (adminSession === 'true') setIsAdmin(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'ttcsss' && password === 'plai1234') {
            setIsAdmin(true);
            sessionStorage.setItem('isAdmin', 'true');
            setShowLogin(false);
            setLoginError('');
            setUsername('');
            setPassword('');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem('isAdmin');
    };

    const handleAddService = (e) => {
        e.preventDefault();
        const id = Math.max(0, ...services.map(s => s.id)) + 1;
        const serviceToAdd = { ...newService, id };
        // Add to end (append)
        const updated = [...services, serviceToAdd];

        setServices(updated);
        localStorage.setItem('services', JSON.stringify(updated));

        setShowAdd(false);
        setNewService({ title: '', img: '', description: '' });
    };

    const handleDeleteService = (id) => {
        const updated = services.filter(s => s.id !== id);
        setServices(updated);
        localStorage.setItem('services', JSON.stringify(updated));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewService(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id="services" className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div className="text-left">
                        <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('services.title')}</h2>
                        <p className="text-slate-400 max-w-xl">{t('services.subtitle')}</p>
                    </div>
                    <div className="flex gap-4">
                        {isAdmin ? (
                            <>
                                <Button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-700">
                                    <Plus className="w-4 h-4 mr-2" /> Add Service
                                </Button>
                                <Button variant="outline" onClick={handleLogout} className="text-red-400 border-red-400 hover:bg-red-400/10">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="text-sm text-slate-400 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Admin</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            {...service}
                            isAdmin={isAdmin}
                            onDelete={handleDeleteService}
                        />
                    ))}
                </div>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <Modal title="Admin Login" onClose={() => setShowLogin(false)}>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </Modal>
            )}

            {/* Add Service Modal */}
            {showAdd && (
                <Modal title="Add New Service" onClose={() => setShowAdd(false)}>
                    <form onSubmit={handleAddService} className="space-y-4">
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Service Title</label>
                            <input
                                required
                                type="text"
                                value={newService.title}
                                onChange={e => setNewService({ ...newService, title: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Industry Consultation"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Cover Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="service-image-upload"
                                />
                                <label
                                    htmlFor="service-image-upload"
                                    className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 border-dashed rounded-lg p-4 text-slate-400 hover:text-white hover:border-slate-500 cursor-pointer transition-colors"
                                >
                                    <Upload className="w-5 h-5" />
                                    {newService.img ? "Image Selected" : "Click to Upload Image"}
                                </label>
                            </div>
                            {newService.img && (
                                <div className="mt-2 h-32 rounded-lg overflow-hidden">
                                    <img src={newService.img} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Description</label>
                            <RichTextEditor
                                value={newService.description}
                                onChange={(html) => setNewService({ ...newService, description: html })}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Add Service</Button>
                    </form>
                </Modal>
            )}
        </section>
    );
}
