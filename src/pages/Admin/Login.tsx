import React, { useState } from 'react';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            console.log('Attempting login with:', email);
            const response = await api.auth.login({ email, password });
            console.log('Login success:', response);
            localStorage.setItem('admin_logged_in', 'true');
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            const msg = error.message || 'Prisijungti nepavyko';
            setMessage(msg);
            alert('KLAIDA: ' + msg); // Temporary debug alert
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center">
                    Admin Prisijungimas
                </h2>

                {message && (
                    <div className={`p-4 rounded-lg mb-6 text-sm ${message.includes('sėkminga') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">El. paštas</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="admin@sportogalia.lt"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Slaptažodis</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Vykdoma...' : 'Prisijungti'}
                    </button>

                    <div className="text-center text-xs text-gray-400 mt-4">
                        Prisijungimas tik administratoriams
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
