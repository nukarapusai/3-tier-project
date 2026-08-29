import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthNavbar from '../components/AuthNavbar';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email: formData.email, password: formData.password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fitzone-page-wrapper">
      <AuthNavbar />

      <main className="fitzone-hero-section">
        <div className="fitzone-hero-container">
          
          {/* LEFT HERO SPACE (HERO BACKGROUND PHOTO & QUOTE IS IN BACKGROUND) */}
          <div className="left-hero-space"></div>

          {/* RIGHT PANEL: NEON GOLD AUTH CARD */}
          <div className="right-auth-panel">
            <div className="gold-glow-card">
              
              {/* TABS */}
              <div className="auth-tab-header">
                <Link to="/login" className="tab-item active">LOGIN</Link>
                <Link to="/signup" className="tab-item">SIGN UP</Link>
              </div>

              <div className="tab-content-body">
                <h3>Welcome back!</h3>
                <p className="tab-subtitle">Login to continue your fitness journey</p>

                <form onSubmit={handleSubmit}>
                  <div className="gold-input-group">
                    <span className="input-icon">✉️</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="gold-input-group">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="eye-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  <div className="form-extra-row">
                    <label className="remember-checkbox">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <span>Remember Me</span>
                    </label>
                    <Link to="/forgot-password" className="gold-forgot-link">Forgot Password?</Link>
                  </div>

                  {error && <p className="error">{error}</p>}

                  <button type="submit" className="btn-gold-submit" disabled={loading}>
                    {loading ? 'LOGGING IN...' : 'LOGIN'}
                  </button>
                </form>

                <div className="social-divider">
                  <span>OR</span>
                </div>

                <div className="social-buttons">
                  <button className="btn-social" type="button" title="Sign in with Google">
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.8 0 10.8 0 12.5s.7 2.7 1.9 5.2l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/></svg>
                  </button>
                  <button className="btn-social" type="button" title="Sign in with Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button className="btn-social" type="button" title="Sign in with Apple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.84 1.46-.62.72-1.16 1.88-.01 3.01 1.08.08 2.19-.55 2.86-1.37z"/></svg>
                  </button>
                </div>

                <p className="bottom-toggle-text">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>

              </div>

              {/* STATS FOOTER */}
              <div className="card-stats-footer">
                <div className="footer-stat-item">
                  <span className="stat-icon">👥</span>
                  <div className="stat-info">
                    <strong>10K+</strong>
                    <span>Happy Members</span>
                  </div>
                </div>

                <div className="footer-stat-item">
                  <span className="stat-icon">⭐</span>
                  <div className="stat-info">
                    <strong>4.9/5</strong>
                    <span>Member Rating</span>
                  </div>
                </div>

                <div className="footer-stat-item">
                  <span className="stat-icon">🛡️</span>
                  <div className="stat-info">
                    <strong>100%</strong>
                    <span>Results Driven</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default LoginPage;
