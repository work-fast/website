import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { InterviewPrep, Contact } from './pages/DashboardPlaceholders';
import Settings from './pages/Settings';
import DashboardLayout from './components/DashboardLayout';
import { Platform, Solutions, Pricing } from './pages/Placeholders';
import { Privacy, Terms } from './pages/Legal';
import { auth } from './lib/auth';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.getUser();
  const isAuthenticated = auth.isAuthenticated();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    auth.logout();
    navigate('/');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Platform', path: '/platform' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Pricing', path: '/pricing' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo and Brand - Logo only (Max Prominence) */}
        <Link to="/" className="flex items-center transition-transform hover:scale-105">
          <img src="/logo.png" alt="work-fast" className="h-24 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-black uppercase tracking-widest transition-all hover:text-[#1d84b5] ${location.pathname === link.path ? 'text-[#1d84b5]' : 'text-slate-400'}`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                {user?.email}
              </span>
              <button
                onClick={() => navigate('/generator')}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-black text-white transition-all hover:bg-slate-700 shadow-lg hover:shadow-xl active:scale-95 uppercase tracking-widest"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 leading-none pb-1 hover:text-[#1d84b5] hover:border-[#1d84b5] transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-black text-white transition-all hover:bg-slate-700 shadow-lg hover:shadow-xl active:scale-95 uppercase tracking-widest"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden p-2 text-slate-800">
          {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-24 left-0 w-full bg-white border-b shadow-2xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-black uppercase tracking-widest text-slate-800"
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { navigate('/generator'); setIsMenuOpen(false); }}
                className="w-full rounded-2xl bg-slate-900 py-5 text-white font-black uppercase tracking-widest"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full rounded-2xl border-2 border-slate-900 py-5 text-slate-900 font-black uppercase tracking-widest"
              >
                Sign Out ({user?.name})
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
              className="w-full rounded-2xl bg-slate-900 py-5 text-white font-black uppercase tracking-widest"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white py-20 border-t border-slate-100">
    <div className="mx-auto max-w-7xl px-6 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2 space-y-6">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <img src="/logo.png" alt="work-fast" className="h-20 w-auto object-contain" />
          </Link>
          <p className="text-slate-400 font-medium max-w-sm">
            The world's most advanced AI-powered career growth platform. Tailored resumes, interview coaching, and career strategy at scale.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Product</h4>
          <ul className="space-y-4">
            <li><Link to="/platform" className="text-sm font-bold text-slate-400 hover:text-[#1d84b5] transition-colors">Platform</Link></li>
            <li><Link to="/solutions" className="text-sm font-bold text-slate-400 hover:text-[#1d84b5] transition-colors">Solutions</Link></li>
            <li><Link to="/pricing" className="text-sm font-bold text-slate-400 hover:text-[#1d84b5] transition-colors">Pricing</Link></li>
            <li><Link to="/generator" className="text-sm font-bold text-slate-400 hover:text-[#1d84b5] transition-colors">Resume Generator</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Company</h4>
          <ul className="space-y-4">
            <li><Link to="/privacy" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Terms of Service</Link></li>
            <li><a href="mailto:admin@work-fast.com" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Support</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-bold text-slate-300">© 2026 work-fast Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Built with Career Intelligence</span>
        </div>
      </div>
    </div>
  </footer>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute = [
    '/dashboard',
    '/generator',
    '/interview-prep',
    '/settings',
    '/contact-support'
  ].includes(location.pathname);

  if (isDashboardRoute) {
    return (
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact-support" element={<Contact />} />
        </Routes>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
