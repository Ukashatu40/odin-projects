import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const [postRes, commentsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/posts/${id}`),
                    fetch(`${API_BASE_URL}/api/posts/${id}/comments`)
                ]);

                if (!postRes.ok) throw new Error('Post not found');

                const postData = await postRes.json();
                const commentsData = await commentsRes.json();

                setPost(postData);
                setComments(commentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newComment })
            });

            if (res.ok) {
                const comment = await res.json();
                // Optimistically add author info since backend might not return it populated immediately
                // or re-fetch. For now, let's append with current user info
                const commentWithAuthor = { ...comment, author: { name: user.name } };
                setComments([...comments, commentWithAuthor]);
                setNewComment('');
                toast.success('Comment added!');
            } else {
                toast.error('Failed to add comment');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error posting comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${id}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setComments(comments.filter(c => c.id !== commentId));
                toast.success('Comment deleted');
            } else {
                toast.error('Failed to delete comment');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error deleting comment');
        }
    };

    if (loading) return <div className="text-center py-20 text-indigo-400">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-400">{error}</div>;
    if (!post) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Post Content */}
            <article className="glass-panel p-8 md:p-12">
                <header className="mb-8 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-400">
                        <span className="bg-white/5 px-3 py-1 rounded-full text-sm">
                            By {post.author?.name || 'Unknown'}
                        </span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </header>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    {post.content.split('\n').map((para, i) => (
                        <p key={i} className="mb-4">{para}</p>
                    ))}
                </div>
            </article>

            {/* Comments Section */}
            <section className="glass-panel p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Comments ({comments.length})</h3>

                {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="input-field min-h-[100px] mb-4"
                            required
                        />
                        <button type="submit" className="btn-primary">
                            Post Comment
                        </button>
                    </form>
                ) : (
                    <div className="bg-white/5 p-4 rounded-lg mb-8 text-center text-gray-400">
                        Please <button onClick={() => navigate('/login')} className="text-indigo-400 hover:underline">login</button> to comment.
                    </div>
                )}

                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-black/20 p-4 rounded-lg border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-500/50 flex items-center justify-center text-xs">
                                        {comment.author?.name?.charAt(0) || '?'}
                                    </div>
                                    <span className="font-semibold text-gray-200">{comment.author?.name || 'Anonymous'}</span>
                                    <span className="text-xs text-gray-500">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                {user && user.id === comment.authorId && (
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="text-red-400 hover:text-red-300 text-xs"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-300">{comment.content}</p>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <p className="text-gray-500 text-center italic">No comments yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
