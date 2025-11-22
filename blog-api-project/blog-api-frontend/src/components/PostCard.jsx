import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div className="glass-panel p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>
            <p className="text-gray-300 mb-6 line-clamp-3">
                {post.content}
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                        {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-400">{post.author.name}</span>
                </div>
                <Link
                    to={`/posts/${post.id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center group"
                >
                    Read More
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
}
