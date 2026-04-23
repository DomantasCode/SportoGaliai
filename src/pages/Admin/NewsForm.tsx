import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Image } from 'lucide-react';

const NewsForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id && id !== 'new');

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(true);
    const [heroImage, setHeroImage] = useState('');
    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [heroPreview, setHeroPreview] = useState('');
    const [gallery, setGallery] = useState<string[]>([]);
    const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (!localStorage.getItem('admin_logged_in')) {
            navigate('/admin');
            return;
        }
        if (isEditing && id) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        try {
            const article = await api.news.get(id!);
            if (article && !article.error) {
                setTitle(article.title || '');
                setDate(article.date || '');
                setSummary(article.summary || '');
                setContent(article.content || '');
                setPublished(Boolean(article.published));
                setHeroImage(article.hero_image || '');
                if (article.hero_image) setHeroPreview(article.hero_image);
                setGallery(article.gallery || []);
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            navigate('/admin/dashboard');
        }
    };

    const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setHeroFile(file);
            setHeroPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files) as File[];
            setNewGalleryFiles(prev => [...prev, ...files]);
            const previews = files.map((f: File) => URL.createObjectURL(f));
            setGalleryPreviews(prev => [...prev, ...previews]);
        }
    };

    const removeGalleryImage = (index: number) => {
        setGallery(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewGalleryImage = (index: number) => {
        setNewGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (isEditing && id) formData.append('id', id);
            formData.append('title', title);
            formData.append('date', date);
            formData.append('summary', summary);
            formData.append('content', content);
            formData.append('published', String(published));
            formData.append('existing_hero_image', heroImage);
            formData.append('existing_gallery', JSON.stringify(gallery));

            if (heroFile) {
                formData.append('hero_image', heroFile);
            }

            newGalleryFiles.forEach((file) => {
                formData.append('gallery_images[]', file);
            });

            await api.news.save(formData);
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Error saving article:', error);
            alert('Klaida išsaugant: ' + error.message);
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
                        {isEditing ? 'Redaguoti Naujieną' : 'Nauja Naujiena'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
                    {/* Hero Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pagrindinė nuotrauka</label>
                        <div className="relative h-64 md:h-80 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group hover:border-primary transition-colors cursor-pointer">
                            {heroPreview ? (
                                <>
                                    <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <Upload size={20} /> Keisti nuotrauką
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <Image size={48} className="mx-auto mb-2" />
                                    <span>Įkelti pagrindinę nuotrauką</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleHeroChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>

                    {/* Title & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pavadinimas *</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
                                placeholder="Naujienos pavadinimas..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trumpas aprašymas</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="Trumpas aprašymas kortelei..."
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Turinys
                            <span className="text-gray-400 font-normal ml-2">( ## antraštė, &gt; citata, - sąrašo elementas )</span>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={16}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                            placeholder="Rašykite turinį...&#10;&#10;## Antraštė&#10;&#10;Pastraipa...&#10;&#10;> Citata&#10;&#10;- Sąrašo elementas"
                        />
                    </div>

                    {/* Gallery */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nuotraukų galerija</label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                            {/* Existing gallery images */}
                            {gallery.map((img, i) => (
                                <div key={`existing-${i}`} className="relative aspect-square rounded-lg overflow-hidden group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(i)}
                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {/* New gallery previews */}
                            {galleryPreviews.map((img, i) => (
                                <div key={`new-${i}`} className="relative aspect-square rounded-lg overflow-hidden group border-2 border-primary/30">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeNewGalleryImage(i)}
                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-white text-[10px] text-center py-0.5">Nauja</div>
                                </div>
                            ))}
                            {/* Add button */}
                            <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors text-gray-400 hover:text-primary">
                                <Upload size={24} />
                                <span className="text-xs mt-1">Pridėti</span>
                                <input type="file" accept="image/*" multiple onChange={handleGalleryAdd} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Published toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setPublished(!published)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${published ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${published ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                            {published ? 'Paskelbta (matoma svetainėje)' : 'Juodraštis (nematoma)'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
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

export default NewsForm;