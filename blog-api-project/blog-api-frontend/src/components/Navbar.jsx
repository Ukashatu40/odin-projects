import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        NeonBlog
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                        {user ? (
                            <>
                                <Link to="/create" className="text-gray-300 hover:text-white transition-colors">Write</Link>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                                <div className="flex items-center space-x-4 ml-4">
                                    <span className="text-indigo-400 text-sm">Hi, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all border border-white/10"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                                <Link to="/register" className="btn-primary text-sm">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
                            {user ? (
                                <>
                                    <Link to="/create" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Write</Link>
                                    <Link to="/dashboard" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                                        <span className="text-indigo-400 text-sm">Signed in as {user.name}</span>
                                        <button
                                            onClick={() => { handleLogout(); setIsOpen(false); }}
                                            className="text-left text-gray-300 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="text-indigo-400 hover:text-indigo-300" onClick={() => setIsOpen(false)}>Get Started</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}