import React from 'react';
import { Briefcase, Quote, Award, Building } from 'lucide-react';

export const AlumniDetail = ({ alumni }) => {
    if (!alumni) return null;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
            {/* Header Section */}
            <div className="relative h-64 md:h-80 bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Background Pattern or Image could go here */}
                </div>

                <div className="absolute -bottom-16 left-8 md:left-12 flex items-end">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                        {alumni.image ? (
                            <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                <span className="text-4xl">User</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-20 px-8 md:px-12 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            {alumni.name}
                        </h1>
                        <p className="text-xl text-slate-500 font-medium mt-1">
                            {alumni.nickname && `"${alumni.nickname}"`} • {alumni.batch}
                        </p>
                    </div>
                    <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Proud Alumni
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Work Info */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                            <Briefcase className="text-blue-600" /> Career Profile
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Current Position</p>
                                <p className="text-lg font-semibold text-slate-800">{alumni.position}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Company</p>
                                <div className="flex items-center gap-3">
                                    <Building className="w-5 h-5 text-slate-400" />
                                    <p className="text-lg font-semibold text-slate-800">{alumni.company}</p>
                                </div>
                            </div>
                            {alumni.skills && (
                                <div>
                                    <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-2">Key Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {alumni.skills.split(',').map((skill, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-8">
                        {alumni.testimonial && (
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                                    <Quote className="text-amber-500" /> Alumni Voice
                                </h3>
                                <div className="relative bg-amber-50 p-6 rounded-xl text-slate-700 italic leading-relaxed">
                                    "{alumni.testimonial}"
                                </div>
                            </div>
                        )}

                        {alumni.message && (
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">Message to Juniors</h3>
                                <p className="text-slate-600">
                                    {alumni.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
