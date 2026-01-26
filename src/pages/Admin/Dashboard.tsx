import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, UserPlus } from 'lucide-react';
import { TRAINERS } from '../../../constants';

interface Trainer {
    id: string;
    name: string;
    specialization: string;
    image_url: string;
    image_visible: number; // 0 or 1 from PHP
}

const Dashboard: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const navigate = useNavigate();

    // Admin Form State
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('admin_logged_in')) {
            navigate('/admin');
            return;
        }
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const data = await api.trainers.list();
            // Adapt PHP response keys if necessary, assuming PHP returns matches or we map
            setTrainers(data || []);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_logged_in');
        navigate('/admin');
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.auth.register({ email: newAdminEmail, password: newAdminPassword });
            alert('Naujas administratorius sėkmingai sukurtas!');
            setShowAdminModal(false);
            setNewAdminEmail('');
            setNewAdminPassword('');
        } catch (error: any) {
            alert('Klaida kuriant administratorių: ' + error.message);
        }
    };

    // Note: Seed database functionality is harder to replicate purely client-side without logic
    // We will simplify to just manual creation for this refactor to ensure stability.

    const handleDelete = async (id: string) => {
        if (!window.confirm('Ar tikrai norite ištrinti šį trenerį?')) return;

        try {
            await api.trainers.delete(parseInt(id));
            setTrainers(trainers.filter(t => t.id !== id));
        } catch (error: any) {
            console.error('Error deleting trainer:', error);
            alert('Klaida trinant trenerį: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold font-display text-gray-900">Trenerių Valdymas</h1>
                    <button
                        onClick={() => setShowAdminModal(true)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                    >
                        <UserPlus size={14} />
                        Naujas Admin
                    </button>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    Atsijungti
                </button>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Trenerių Sąrašas ({trainers.length})</h2>
                    <button
                        onClick={() => navigate('/admin/trainers/new')}
                        className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} />
                        Pridėti Naują
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainers.map((trainer) => (
                            <div key={trainer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow relative">
                                <div className="aspect-[4/3] bg-gray-100 relative">
                                    {trainer.image_url ? (
                                        <img src={trainer.image_url} alt={trainer.name} className={`w-full h-full object-cover ${!trainer.image_visible ? 'opacity-50 grayscale' : ''}`} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">NO IMAGE</div>
                                    )}

                                    {!trainer.image_visible && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="bg-black/70 text-white px-2 py-1 text-xs rounded">Nuotrauka paslėpta</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                try {
                                                    const newStatus = trainer.image_visible == 1 ? 0 : 1;
                                                    await api.trainers.toggleVisibility(trainer.id, newStatus);
                                                    setTrainers(trainers.map(t =>
                                                        t.id === trainer.id ? { ...t, image_visible: newStatus } : t
                                                    ));
                                                } catch (error) {
                                                    alert('Nepavyko pakeisti matomumo');
                                                }
                                            }}
                                            className={`p-2 rounded-full transition-colors ${trainer.image_visible ? 'bg-white text-gray-900 hover:text-primary' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                            title={trainer.image_visible ? "Paslėpti nuotrauką" : "Rodyti nuotrauką"}
                                        >
                                            {trainer.image_visible ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/trainers/${trainer.id}`)}
                                            className="p-2 bg-white rounded-full text-gray-900 hover:text-primary transition-colors"
                                            title="Redaguoti"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(trainer.id)}
                                            className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                                            title="Ištrinti"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900">{trainer.name}</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">{trainer.specialization || 'Nėra rolės'}</p>
                                </div>
                            </div>
                        ))}

                        {trainers.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-300 flex flex-col items-center">
                                <p className="mb-4">Nėra jokių trenerių.</p>
                                <button
                                    onClick={() => navigate('/admin/trainers/new')}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Pridėti pirmąjį
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Admin Creation Modal */}
            {showAdminModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Sukurti naują administratorių</h3>
                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">El. paštas</label>
                                <input
                                    type="email"
                                    required
                                    value={newAdminEmail}
                                    onChange={e => setNewAdminEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Slaptažodis (min 6)</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={newAdminPassword}
                                    onChange={e => setNewAdminPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAdminModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Atšaukti
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                    Sukurti
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
