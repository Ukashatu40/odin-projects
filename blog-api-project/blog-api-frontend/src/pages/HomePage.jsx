import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import PostCard from '../components/PostCard';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/posts?limit=100`); // Fetching more for demo
                if (!res.ok) throw new Error('Failed to fetch posts');
                const data = await res.json();
                // Handle pagination structure if backend returns { data: [], meta: {} }
                setPosts(data.data || data);
            } catch (err) {
                console.error(err);
                setError('Could not load posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 blur-3xl -z-10"></div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent animate-fade-in-up">
                    Future of Blogging
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
                    Discover stories, thinking, and expertise from writers on any topic.
                </p>
            </section>

            {/* Posts Grid */}
            <section>
                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Latest Posts</h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="glass-panel h-64 animate-pulse"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 py-12 glass-panel">
                        {error}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-400 py-12 glass-panel">
                        No posts found. Be the first to write one!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}