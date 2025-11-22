import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/posts/${id}`);
                if (!res.ok) throw new Error('Failed to fetch post');
                const data = await res.json();
                setTitle(data.title);
                setContent(data.content);
                setPublished(data.published);
            } catch (err) {
                console.error(err);
                toast.error('Could not load post data');
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, published })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Post updated successfully!');
                navigate('/dashboard');
            } else {
                if (data.errors) {
                    data.errors.forEach(err => toast.error(err.msg));
                } else {
                    toast.error(data.message || 'Failed to update post');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Network error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-indigo-400">Loading editor...</div>;

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Edit Post</h1>

            <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        required
                        minLength={5}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="input-field min-h-[300px]"
                        required
                        minLength={20}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                    />
                    <label htmlFor="published" className="text-gray-300 select-none cursor-pointer">
                        Published
                    </label>
                </div>

                <div className="flex justify-end pt-4 space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className={`btn-primary w-full md:w-auto ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
