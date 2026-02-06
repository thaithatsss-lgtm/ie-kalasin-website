import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Upload, X, User, Briefcase, MessageSquare } from 'lucide-react';

export function AlumniForm({ initialData = null, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        batch: '',
        email: '',
        image: '',
        position: '',
        company: '',
        companyLogo: '',
        skills: '',
        testimonial: '',
        message: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="text-amber-400" /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Somsak Engineer"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Nickname</label>
                        <input
                            type="text"
                            value={formData.nickname}
                            onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Sak"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Batch / Year</label>
                        <input
                            required
                            type="text"
                            value={formData.batch}
                            onChange={e => setFormData({ ...formData, batch: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. IE KU 1"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-slate-400 text-sm mb-2">Profile Photo (Professional)</label>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'image')}
                                className="hidden"
                                id="profile-upload"
                            />
                            <label
                                htmlFor="profile-upload"
                                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors"
                            >
                                <Upload className="w-4 h-4" /> Upload Photo
                            </label>
                        </div>
                        {formData.image && (
                            <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-slate-600" />
                        )}
                    </div>
                </div>
            </div>

            {/* Work Information */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="text-blue-400" /> Work Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Job Title / Position</label>
                        <input
                            required
                            type="text"
                            value={formData.position}
                            onChange={e => setFormData({ ...formData, position: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Company Name</label>
                        <input
                            required
                            type="text"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-slate-400 text-sm mb-2">Skills Used (comma separated)</label>
                        <input
                            type="text"
                            value={formData.skills}
                            onChange={e => setFormData({ ...formData, skills: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. SAP, Lean, Python"
                        />
                    </div>
                </div>
            </div>

            {/* Feedback & Testimonial */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="text-green-400" /> Feedback & Testimonial
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Impression / Testimonial</label>
                        <textarea
                            rows={3}
                            value={formData.testimonial}
                            onChange={e => setFormData({ ...formData, testimonial: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="What did you like about studying here?"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Message to Juniors / Preparedness</label>
                        <textarea
                            rows={3}
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Advice for current students..."
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-700">
                <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                    {initialData ? 'Update Profile' : 'Save Profile'}
                </Button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
