export const API_URL = '/api';

export const api = {
    auth: {
        login: async (data: any) => {
            const res = await fetch(`${API_URL}/auth.php?action=login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Login failed');
            }
            return res.json();
        },
        register: async (data: any) => {
            const res = await fetch(`${API_URL}/auth.php?action=register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Registration failed');
            return res.json();
        }
    },
    trainers: {
        list: async () => {
            const res = await fetch(`${API_URL}/trainers.php`);
            return res.json();
        },
        delete: async (id: number) => {
            await fetch(`${API_URL}/trainers.php?id=${id}`, {
                method: 'DELETE',
            });
        },
        save: async (formData: FormData) => {
            const res = await fetch(`${API_URL}/trainers.php`, {
                method: 'POST', // Form data handles content-type automatically
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to save trainer');
            return res.json();
        },
        toggleVisibility: async (id: string, visible: number) => {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('image_visible', visible.toString());

            const res = await fetch(`${API_URL}/trainers.php?action=toggle_visibility`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to update visibility');
            return res.json();
        }
    }
};
