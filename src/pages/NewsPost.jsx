import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NewsPost() {
    const { id } = useParams();
    const { getNewsById } = useNews();
    const navigate = useNavigate();

    const post = getNewsById(id);

    if (!post) {
        return (
            <div className="min-h-screen pt-24 text-center">
                <h1 className="text-2xl text-white mb-4">News post not found</h1>
                <Link to="/">
                    <Button variant="outline">Return Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-20 pb-24">
            <article className="container mx-auto px-4 max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>

                <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-96 w-full relative">
                    {post.img ? (
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                            No Image
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-slate-400 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span>Admin</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                    {post.title}
                </h1>

                <div
                    className="prose prose-lg prose-invert max-w-none text-slate-300"
                    dangerouslySetInnerHTML={{ __html: post.content || post.summary }}
                />
            </article>
        </div>
    );
}
