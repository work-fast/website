import React, { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings as SettingsIcon,
    Mail,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Menu,
    History
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../lib/auth';

const DashboardSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = auth.getUser();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Resume Gen', icon: <FileText size={20} />, path: '/generator' },
        { name: 'Interview Prep', icon: <MessageSquare size={20} />, path: '/interview-prep' },
        { name: 'History', icon: <History size={20} />, path: '/history' },
        { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/settings' },
        { name: 'Contact', icon: <Mail size={20} />, path: '/contact-support' },
    ];

    const handleLogout = async () => {
        await auth.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <aside className={`h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 z-40 ${isCollapsed ? 'w-24 p-4 items-center' : 'w-80 p-8'}`}>
            <div className={`mb-12 relative flex items-center justify-center w-full`}>
                {!isCollapsed && (
                    <img src="/logo.png" alt="work-fast" className="h-[65px] w-[65px] object-contain cursor-pointer" onClick={() => navigate('/')} />
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors ${!isCollapsed ? 'absolute right-0' : ''}`}
                >
                    {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
                </button>
            </div>

            <nav className="flex-1 space-y-2 w-full">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            title={isCollapsed ? item.name : undefined}
                            className={`w-full flex items-center p-4 rounded-2xl transition-all group ${isCollapsed ? 'justify-center' : 'justify-between'
                                } ${isActive
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`${isActive ? 'text-white' : 'text-slate-300 group-hover:text-[#1d84b5]'} transition-colors`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="text-sm font-black uppercase tracking-widest">{item.name}</span>
                                )}
                            </div>
                            {!isCollapsed && isActive && <ChevronRight size={16} />}
                        </button>
                    );
                })}
            </nav>

            <div className={`mt-auto pt-8 border-t border-slate-50 w-full ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                <div className={`flex items-center ${isCollapsed ? 'justify-center mb-6' : 'gap-4 mb-8 px-2'}`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#53a2be] to-[#1d84b5] flex items-center justify-center text-white font-black shrink-0">
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">{user?.name || 'User'}</p>
                            <p className="text-[10px] font-bold text-slate-400 truncate">{user?.email}</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? 'Sign Out' : undefined}
                    className={`w-full flex items-center justify-center p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black uppercase tracking-widest text-xs ${isCollapsed ? '' : 'gap-4'}`}
                >
                    <LogOut size={isCollapsed ? 24 : 20} className="shrink-0" />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
