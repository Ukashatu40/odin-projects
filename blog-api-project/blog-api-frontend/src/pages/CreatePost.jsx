import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, published })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Post created successfully!');
                navigate(published ? '/' : '/dashboard');
            } else {
                if (data.errors) {
                    data.errors.forEach(err => toast.error(err.msg));
                } else {
                    toast.error(data.message || 'Failed to create post');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Create New Post</h1>

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
                        placeholder="Enter a captivating title..."
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
                        placeholder="Write your story..."
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
                        Publish immediately
                    </label>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn-primary w-full md:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
