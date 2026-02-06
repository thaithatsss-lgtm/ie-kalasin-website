import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNews } from '../../context/NewsContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Plus, Edit, Trash2, LogOut, FileText, LayoutDashboard } from 'lucide-react';
import { NewsForm } from '../../components/admin/NewsForm';

export function AdminDashboard() {
    const { isAdmin, logout } = useAuth();
    const { news, addNews, updateNews, deleteNews } = useNews();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);

    React.useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null;

    const handleCreate = (data) => {
        addNews(data);
        setIsEditing(false);
    };

    const handleUpdate = (data) => {
        updateNews(currentEditId, data);
        setIsEditing(false);
        setCurrentEditId(null);
    };

    const startEdit = (id) => {
        setCurrentEditId(id);
        setIsEditing(true);
    };

    const startCreate = () => {
        setCurrentEditId(null);
        setIsEditing(true);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-900 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-800">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <LayoutDashboard className="w-8 h-8 text-blue-500" />
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-400">Manage website content and news</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/">
                            <Button variant="outline">View Site</Button>
                        </Link>
                        <Button variant="outline" onClick={() => { logout(); navigate('/'); }} className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {isEditing ? (
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                        <h2 className="text-xl font-bold text-white mb-6">
                            {currentEditId ? 'Edit News Post' : 'Create New Post'}
                        </h2>
                        <NewsForm
                            initialData={currentEditId ? news.find(n => n.id === currentEditId) : null}
                            onSubmit={currentEditId ? handleUpdate : handleCreate}
                            onCancel={() => { setIsEditing(false); setCurrentEditId(null); }}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-amber-500" />
                                News & PR Management
                            </h2>
                            <Button onClick={startCreate} className="bg-green-600 hover:bg-green-700">
                                <Plus className="w-4 h-4 mr-2" /> Add News
                            </Button>
                        </div>

                        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900/50 border-b border-slate-700 text-slate-400 text-sm uppercase">
                                        <th className="p-4">Title</th>
                                        <th className="p-4 w-32">Date</th>
                                        <th className="p-4 w-32 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {news.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium text-white">{item.title}</div>
                                                <div className="text-sm text-slate-400 truncate max-w-md">{item.summary}</div>
                                            </td>
                                            <td className="p-4 text-slate-300 text-sm whitespace-nowrap">{item.date}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => startEdit(item.id)}
                                                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => { if (window.confirm('Delete this news?')) deleteNews(item.id); }}
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {news.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-slate-500">
                                                No news posts yet. Click "Add News" to create one.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
