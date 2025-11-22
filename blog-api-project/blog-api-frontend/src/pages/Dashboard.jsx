import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/users/${user.id}/posts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                } else {
                    toast.error('Failed to fetch your posts');
                }
            } catch (err) {
                console.error(err);
                toast.error('Network error');
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchUserPosts();
    }, [user, token]);

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setPosts(posts.filter(p => p.id !== postId));
                toast.success('Post deleted');
            } else {
                toast.error('Failed to delete post');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error deleting post');
        }
    };

    if (loading) return <div className="text-center py-20 text-indigo-400">Loading dashboard...</div>;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
                <Link to="/create" className="btn-primary">
                    + New Post
                </Link>
            </div>

            <div className="glass-panel overflow-hidden">
                {posts.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        You haven't written any posts yet. <Link to="/create" className="text-indigo-400 hover:underline">Start writing!</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-300 border-b border-white/10">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <Link to={`/posts/${post.id}`} className="text-white font-medium hover:text-indigo-400">
                                                {post.title}
                                            </Link>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs border ${post.published
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right space-x-3">
                                            <Link
                                                to={`/edit/${post.id}`}
                                                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
