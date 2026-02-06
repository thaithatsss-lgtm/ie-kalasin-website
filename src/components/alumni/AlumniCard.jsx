import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap } from 'lucide-react';

export const AlumniCard = ({ id, name, nickname, batch, image, position, company, isAdmin, onDelete }) => (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full relative">
        <Link to={`/alumni/${id}`} className="flex-1 flex flex-col">
            <div className="h-64 overflow-hidden relative bg-gray-100">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl text-gray-300">User</span>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {name} {nickname && <span className="text-sm font-normal text-gray-300">({nickname})</span>}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-300 text-sm mt-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{batch}</span>
                    </div>
                </div>
            </div>
            <div className="p-5 flex-1 bg-white">
                <div className="flex items-start gap-3 text-gray-600 mb-2">
                    <Briefcase className="w-5 h-5 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                        <div className="font-semibold text-gray-800">{position}</div>
                        <div className="text-sm text-gray-500">{company}</div>
                    </div>
                </div>
            </div>
        </Link>

        {isAdmin && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete?')) onDelete(id);
                }}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 hover:bg-red-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
        )}
    </div>
);
