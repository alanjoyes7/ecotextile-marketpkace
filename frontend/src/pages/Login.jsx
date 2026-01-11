import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Recycle, Mail, Lock, Loader2, AlertCircle, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const result = await login(email, password);
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Failed to sign in");
      }
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      const result = await loginWithGoogle();
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Failed to sign in with Google");
      }
    } catch (err) {
      setError("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ 
      background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
      padding: '2rem'
    }}>
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--gradient-primary)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <Recycle size={36} color="white" />
            </div>
          </div>
          <h1 style={{ 
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Sign in to EcoTextile Marketplace
          </p>
        </div>

        {/* Main Card */}
        <div className="card" style={{ padding: '2.5rem' }}>
          {error && (
            <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Password
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Forgot Password */}
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <Link 
                to="/forgot-password" 
                style={{ 
                  color: 'var(--primary)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Sign In
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              margin: '1.5rem 0',
              gap: '1rem'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                Or continue with
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-secondary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          color: 'var(--text-secondary)'
        }}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: 'var(--primary)',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Sign up now
          </Link>
        </div>

        {/* Footer */}
        <p style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-light)'
        }}>
          By signing in, you agree to our{' '}
          <Link to="/terms" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link to="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'fixed',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'var(--gradient-primary)',
        borderRadius: '50%',
        opacity: '0.1',
        filter: 'blur(80px)',
        zIndex: -1
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'var(--gradient-accent)',
        borderRadius: '50%',
        opacity: '0.1',
        filter: 'blur(80px)',
        zIndex: -1
      }}></div>
    </div>
  );
};

export default Login;