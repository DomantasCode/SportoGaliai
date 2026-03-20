import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Eye, EyeOff } from 'lucide-react';

interface Trainer {
    id?: string;
    name: string;
    specialization: string;
    description: string;
    image_url: string;
    image_visible: boolean;
}

const TrainerForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id && id !== 'new');

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Trainer>({
        name: '',
        specialization: '', // role
        description: '',    // bio
        education: '',
        location: '',
        phone: '',
        email: '',
        motto: '',
        achievements: '',
        image_url: '',
        image_visible: true
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        if (!localStorage.getItem('admin_logged_in')) {
            navigate('/admin');
            return;
        }
        if (isEditing && id) {
            fetchTrainer();
        }
    }, [id]);

    const fetchTrainer = async () => {
        try {
            const trainers = await api.trainers.list();
            const found = trainers.find((t: any) => t.id == id);
            if (found) {
                setFormData({
                    id: found.id,
                    name: found.name,
                    specialization: found.specialization || '',
                    description: found.description || '',
                    education: found.education || '',
                    location: found.location || '',
                    phone: found.phone || '',
                    email: found.email || '',
                    motto: found.motto || '',
                    achievements: found.achievements || '',
                    image_url: found.image_url || '',
                    image_visible: Boolean(parseInt(String(found.image_visible)))
                });
                if (found.image_url) setPreviewUrl(found.image_url);
            }
        } catch (error) {
            console.error('Error fetching trainer:', error);
            navigate('/admin/dashboard');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            if (isEditing && id) data.append('id', id);
            data.append('name', formData.name);
            data.append('specialization', formData.specialization);
            data.append('description', formData.description || '');
            data.append('education', formData.education || '');
            data.append('location', formData.location || '');
            data.append('phone', formData.phone || '');
            data.append('email', formData.email || '');
            data.append('motto', formData.motto || '');
            data.append('achievements', formData.achievements || '');
            data.append('image_visible', String(formData.image_visible));
            data.append('existing_image', formData.image_url || '');

            if (imageFile) {
                data.append('image', imageFile);
            }

            await api.trainers.save(data);
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Error saving trainer:', error);
            alert('Klaida išsaugant duomenis: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-primary"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Redaguoti Trenerį' : 'Pridėti Naują Trenerį'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column - Image & Basic Info */}
                        <div className="space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Nuotrauka</label>
                                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden group hover:border-primary transition-colors cursor-pointer">
                                    {previewUrl ? (
                                        <>
                                            <img src={previewUrl} alt="Preview" className={`w-full h-full object-cover ${!formData.image_visible ? 'opacity-50 grayscale' : ''}`} />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white font-medium flex items-center gap-2">
                                                    <Upload size={20} /> Keisti nuotrauką
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-gray-400 text-center p-4">
                                            <Upload size={40} className="mx-auto mb-2" />
                                            <span className="text-sm">Įkelti nuotrauką</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, image_visible: !p.image_visible }))}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${formData.image_visible ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {formData.image_visible ? (
                                            <><Eye size={16} /> Nuotrauka matoma</>
                                        ) : (
                                            <><EyeOff size={16} /> Nuotrauka paslėpta</>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Motto</label>
                                <textarea
                                    value={formData.motto || ''}
                                    onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Citata..."
                                />
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vardas Pavardė *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Vardenis Pavardenis"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pareigos / Specializacija</label>
                                <input
                                    type="text"
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Vyr. Treneris"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefonas</label>
                                    <input
                                        type="text"
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="+370..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">El. paštas</label>
                                    <input
                                        type="text"
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="email@..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Išsilavinimas</label>
                                <input
                                    type="text"
                                    value={formData.education || ''}
                                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Universitetas..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mokykla / Lokacija</label>
                                <input
                                    type="text"
                                    value={formData.location || ''}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Mokyklos pavadinimas..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pasiekimai</label>
                                <textarea
                                    value={formData.achievements || ''}
                                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Laimėjimai..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Aprašymas / Bio</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Išsamus aprašymas..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard')}
                            className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Atšaukti
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save size={20} />
                            {loading ? 'Saugoma...' : 'Išsaugoti'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrainerForm;
