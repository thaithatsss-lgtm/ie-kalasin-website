import React, { useState } from 'react';
import { useAlumni } from '../context/AlumniContext';
import { useAuth } from '../context/AuthContext';
import { AlumniCard } from '../components/alumni/AlumniCard';
import { AlumniForm } from '../components/admin/AlumniForm';
import { Button } from '../components/ui/Button';
import { Plus, X, Lock, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
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

export function AlumniPage() {
    const { alumni, addAlumni, deleteAlumni } = useAlumni();
    const { isAdmin } = useAuth();
    const [showAdd, setShowAdd] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = (data) => {
        addAlumni(data);
        setShowAdd(false);
    };

    // Filter Logic
    const filteredAlumni = alumni ? alumni.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.name?.toLowerCase().includes(searchLower) ||
            item.nickname?.toLowerCase().includes(searchLower) ||
            item.batch?.toLowerCase().includes(searchLower) ||
            item.company?.toLowerCase().includes(searchLower) ||
            item.position?.toLowerCase().includes(searchLower)
        );
    }) : [];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* Header */}
            <div className="bg-slate-900 py-16 md:py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10" />
                {/* Optional background image here */}
                <div className="container mx-auto px-4 relative z-20">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                        Our <span className="text-amber-500">Alumni</span>
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Meet the successful graduates of our program who are making an impact in the industry.
                    </p>
                </div>
            </div>

            {/* Alumni Registration Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 mb-4">
                                ลงทะเบียนฐานข้อมูลศิษย์เก่า
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                ขอเชิญชวนพี่น้องศิษย์เก่าวิศวกรรมอุตสาหการ มหาวิทยาลัยกาฬสินธุ์ ทุกรุ่น
                                ร่วมกรอกข้อมูลเพื่อสร้างเครือข่ายที่เข้มแข็ง รับข่าวสารกิจกรรม และโอกาสดีๆ จากทางสาขาวิชาฯ
                            </p>
                            <a
                                href="https://forms.gle/kQLtdwzfqQpapyKU8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                ลงทะเบียนศิษย์เก่า (Register)
                            </a>
                        </div>
                        <div className="flex-shrink-0 bg-white p-4 rounded-xl shadow-md border border-slate-100">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://forms.gle/kQLtdwzfqQpapyKU8"
                                alt="Alumni Registration QR Code"
                                className="w-48 h-48 object-contain"
                            />
                            <p className="text-center text-slate-400 text-sm mt-2">Scan to Register</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white shadow-sm border-b sticky top-16 z-30">
                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by Name, Nickname, Company, or Position..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                            />
                        </div>
                        <div className="mt-2 text-sm text-slate-500 text-right">
                            Showing <span className="font-semibold text-slate-900">{filteredAlumni.length}</span> alumni
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Admin Toolbar */}
                <div className="flex justify-end mb-8">
                    {isAdmin ? (
                        <div className="flex gap-4">
                            <Button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-700 shadow-md">
                                <Plus className="w-4 h-4 mr-2" /> Add Alumni
                            </Button>
                            <Link to="/admin">
                                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button
                                className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Admin Login</span>
                            </button>
                        </Link>
                    )}
                </div>

                {/* Alumni Grid */}
                {filteredAlumni.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAlumni.map(item => (
                            <AlumniCard
                                key={item.id}
                                {...item}
                                isAdmin={isAdmin}
                                onDelete={deleteAlumni}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700">No alumni found</h3>
                        <p className="text-slate-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {showAdd && (
                <Modal title="Add Alumni Profile" onClose={() => setShowAdd(false)}>
                    <AlumniForm
                        onSubmit={handleCreate}
                        onCancel={() => setShowAdd(false)}
                    />
                </Modal>
            )}
        </div>
    );
}
