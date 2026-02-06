import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAlumni } from '../context/AlumniContext';
import { AlumniDetail } from '../components/alumni/AlumniDetail';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AlumniDetailPage() {
    const { id } = useParams();
    const { getAlumniById } = useAlumni();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const alumni = getAlumniById(id);

    if (!alumni) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Alumni Profile Not Found</h2>
                <Link to="/alumni">
                    <Button variant="outline">Back to Alumni List</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-6 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Alumni
                    </button>

                    {isAdmin && (
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                            <Edit className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                        // Note: Edit logic would go here, maybe redirect to an edit page or open modal
                    )}
                </div>

                <AlumniDetail alumni={alumni} />
            </div>
        </div>
    );
}
