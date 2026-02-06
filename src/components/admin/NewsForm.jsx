import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { RichTextEditor } from '../ui/RichTextEditor';
import { Upload, X } from 'lucide-react';

export function NewsForm({ initialData = null, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        summary: '',
        content: '',
        img: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, img: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-slate-400 text-sm mb-2">News Title</label>
                    <input
                        required
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-slate-400 text-sm mb-2">Date</label>
                    <input
                        required
                        type="text"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. JAN 15, 2026"
                    />
                </div>
            </div>

            <div>
                <label className="block text-slate-400 text-sm mb-2">Cover Image</label>
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="news-image-upload"
                    />
                    <label
                        htmlFor="news-image-upload"
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 border-dashed rounded-lg p-8 text-slate-400 hover:text-white hover:border-slate-500 cursor-pointer transition-colors"
                    >
                        <Upload className="w-6 h-6" />
                        {formData.img ? "Change Image" : "Upload Cover Image"}
                    </label>
                </div>

                {formData.img && (
                    <div className="mt-4 h-64 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                        <img src={formData.img} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            <div>
                <label className="block text-slate-400 text-sm mb-2">Short Summary (Visible on Home Page)</label>
                <textarea
                    required
                    rows={3}
                    value={formData.summary}
                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
            </div>

            <div>
                <label className="block text-slate-400 text-sm mb-2">Full Content</label>
                <RichTextEditor
                    value={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                />
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-800">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    {initialData ? 'Update News' : 'Publish News'}
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
