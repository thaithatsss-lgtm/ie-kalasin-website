import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialActivities } from '../data/initialActivities';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

export function ActivityDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        // Try to find in localStorage first, then initialData
        const storedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
        const allActivities = storedActivities.length > 0 ? storedActivities : initialActivities;

        const found = allActivities.find(a => a.id.toString() === id);
        setActivity(found);
    }, [id]);

    if (!activity) return <div className="pt-24 text-center text-white">Loading...</div>;

    return (
        <div className="pt-24 pb-12 bg-slate-900 min-h-screen">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate('/activities')}
                    className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Activities
                </button>

                <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-white/5">
                    <div className="h-64 md:h-96 w-full relative">
                        <img
                            src={activity.img}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                                ACTIVITY
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{activity.title}</h1>
                            <div className="flex items-center gap-6 text-slate-300">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    {activity.date}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div
                            className="prose prose-invert max-w-none [&_img]:rounded-xl [&_img]:w-full [&_img]:my-6 [&_a]:text-blue-400 [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: activity.description || "<p>No details provided.</p>" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
