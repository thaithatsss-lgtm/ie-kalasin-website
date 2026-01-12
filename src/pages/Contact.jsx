import React from 'react';

export function Contact() {
    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-sky-400">Contact Us</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                        <h2 className="text-2xl font-semibold mb-4">Department of Industrial Engineering</h2>
                        <p className="text-slate-300 mb-2">Faculty of Engineering and Industrial Technology</p>
                        <p className="text-slate-300 mb-2">Kalasin University (Namoy Campus)</p>
                        <p className="text-slate-300 mb-6">Mueang District, Kalasin Province 46000</p>

                        <div className="space-y-3">
                            <p className="flex items-center gap-3 text-slate-300">
                                <span className="text-sky-400">📞</span> 043-123-456 (Office)
                            </p>
                            <p className="flex items-center gap-3 text-slate-300">
                                <span className="text-sky-400">📧</span> ie.kalasin@ksu.ac.th
                            </p>
                            <a href="https://facebook.com/ie.ksu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-sky-400 transition-colors">
                                <span className="text-sky-400">📘</span> facebook.com/ie.ksu
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                        <h2 className="text-2xl font-semibold mb-4">Location</h2>
                        <div className="aspect-video w-full bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center text-slate-500">
                            <iframe
                                src="https://maps.google.com/maps?q=16.448473332918315,103.53191995157248&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Department Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
