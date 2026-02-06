import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Trash2 } from 'lucide-react';

export const NewsCard = ({ id, title, date, img, summary, isAdmin, onDelete }) => (
    <div className="group block bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-colors h-full flex flex-col relative w-full">
        <Link to={`/news/${id}`} className="block h-full flex flex-col">
            <div className="h-48 overflow-hidden relative w-full">
                {img ? (
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">
                        No Image
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span className="text-xs font-mono text-white">{date}</span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col w-full">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{summary}</p>
                <div className="flex items-center text-blue-400 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </Link>
        {isAdmin && onDelete && (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm('Are you sure you want to delete this news item?')) onDelete(id);
                }}
                className="absolute top-2 left-2 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        )}
    </div>
);
