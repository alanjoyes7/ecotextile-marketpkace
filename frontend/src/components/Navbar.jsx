import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/logo.png";
import { 
  Recycle, 
  Home, 
  ShoppingBag, 
  Users, 
  LayoutDashboard,
  Upload,
  FileText,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { path: '/buyers', label: 'Buyers', icon: Users },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/my-listings', label: 'My Listings', icon: FileText },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--gradient-primary)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Recycle size={24} color="white" />
          </div>
          <span>EcoTextile</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav" style={{ display: mobileMenuOpen ? 'none' : 'flex' }}>
          {user && navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              {/* User Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                background: 'var(--bg-secondary)',
                borderRadius: '2rem',
                display: mobileMenuOpen ? 'none' : 'flex'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--gradient-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  {user.displayName || user.email}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-ghost"
                style={{
                  padding: '0.5rem 1rem',
                  display: mobileMenuOpen ? 'none' : 'inline-flex'
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" style={{ display: mobileMenuOpen ? 'none' : 'inline-flex' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ display: mobileMenuOpen ? 'none' : 'inline-flex' }}>
                <Sparkles size={18} />
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost"
            style={{
              display: 'none',
              padding: '0.5rem',
              '@media (max-width: 768px)': {
                display: 'inline-flex'
              }
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1rem'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {user && navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.path} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: isActive(link.path) ? 'var(--bg-secondary)' : 'transparent'
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {user && (
            <div style={{ 
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border)'
            }}>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-ghost"
                style={{ width: '100%' }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;