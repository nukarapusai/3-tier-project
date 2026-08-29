import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

function LandingPage({ defaultModal = null }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Modal mode: null, 'login', 'signup', 'forgot'
  const [modalMode, setModalMode] = useState(defaultModal);

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '', agreeTerms: false });
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === '/login') {
      setModalMode('login');
    } else if (location.pathname === '/signup') {
      setModalMode('signup');
    } else if (location.pathname === '/forgot-password') {
      setModalMode('forgot');
    } else {
      setModalMode(null);
    }
    setError('');
    setSuccessMsg('');
  }, [location.pathname]);

  const closeModal = () => {
    setModalMode(null);
    setError('');
    setSuccessMsg('');
    navigate('/');
  };

  const openLogin = () => {
    setError('');
    setSuccessMsg('');
    setModalMode('login');
    navigate('/login');
  };

  const openSignup = () => {
    setError('');
    setSuccessMsg('');
    setModalMode('signup');
    navigate('/signup');
  };

  const openForgot = () => {
    setError('');
    setSuccessMsg('');
    setModalMode('forgot');
    navigate('/forgot-password');
  };

  // Handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email: loginData.email, password: loginData.password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!signupData.agreeTerms) {
      setError('You must agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/auth/signup', { name: signupData.name, email: signupData.email, password: signupData.password });
      setSuccessMsg('Account created successfully! Switching to login...');
      setTimeout(() => openLogin(), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (forgotNewPassword !== forgotConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await api.post('/auth/reset-password', { email: forgotEmail, new_password: forgotNewPassword });
      setSuccessMsg('Password reset successful! Redirecting to login...');
      setTimeout(() => openLogin(), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fitzone-page-wrapper">
      {/* NAVBAR */}
      <header className="fitzone-navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeModal}>
            <span className="logo-dumbbell">🏋️‍♂️</span>
            <div className="logo-brand">
              <span className="brand-title">FitTechCoach</span>
              <span className="brand-subtitle">STRONGER EVERYDAY</span>
            </div>
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-item active" onClick={closeModal}>HOME</Link>
            <a href="#about" onClick={(e) => { e.preventDefault(); closeModal(); }} className="nav-item">ABOUT</a>
            <a href="#training" onClick={(e) => { e.preventDefault(); closeModal(); }} className="nav-item">TRAINING</a>
            <a href="#nutrition" onClick={(e) => { e.preventDefault(); closeModal(); }} className="nav-item">NUTRITION</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); closeModal(); }} className="nav-item">CONTACT</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className={`nav-btn btn-login-outline ${modalMode === 'login' ? 'active-tab' : ''}`}
              onClick={openLogin}
            >
              👤 LOGIN
            </button>
            <button
              type="button"
              className={`nav-btn btn-signup-gold ${modalMode === 'signup' ? 'active-tab' : ''}`}
              onClick={openSignup}
            >
              👤+ SIGN UP
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN HERO POSTER */}
      <main className="fitzone-hero-section">
        <img
          src="/images/fitzone-hero-bg.jpg"
          alt="FitTechCoach Hero Poster"
          className="hero-bg-full-img"
        />

        {/* MODAL OVERLAY (OPENS ONLY WHEN CLICKED) */}
        {modalMode && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className={`modal-card-container ${modalMode !== 'forgot' ? 'wide-dual' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="gold-glow-card">
                <button className="modal-close-btn" onClick={closeModal} title="Close">
                  ✕
                </button>

                {/* DUAL LOGIN & SIGNUP SIDE-BY-SIDE */}
                {modalMode !== 'forgot' ? (
                  <div className="dual-auth-container">
                    {/* LEFT COLUMN: LOGIN */}
                    <div className="auth-col login-col">
                      <div className="col-header active-gold">
                        <span>LOGIN</span>
                        <div className="gold-underline"></div>
                      </div>

                      <div className="tab-content-body">
                        <h3>Welcome back!</h3>
                        <p className="tab-subtitle">Login to continue your fitness journey</p>

                        <form onSubmit={handleLoginSubmit}>
                          <div className="gold-input-group">
                            <span className="input-icon">✉️</span>
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={loginData.email}
                              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                              required
                            />
                          </div>

                          <div className="gold-input-group">
                            <span className="input-icon">🔒</span>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                                checked={loginData.rememberMe}
                                onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                              />
                              <span>Remember Me</span>
                            </label>
                            <button type="button" className="gold-forgot-link btn-link" onClick={openForgot}>
                              Forgot Password?
                            </button>
                          </div>

                          {error && modalMode === 'login' && <p className="error">{error}</p>}
                          {successMsg && modalMode === 'login' && <p className="success-msg">{successMsg}</p>}

                          <button type="submit" className="btn-gold-submit" disabled={loading}>
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                          </button>
                        </form>

                        <div className="social-divider"><span>OR</span></div>

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
                      </div>
                    </div>

                    {/* RIGHT COLUMN: SIGN UP */}
                    <div className="auth-col signup-col">
                      <div className="col-header">
                        <span>SIGN UP</span>
                        <div className="subtle-underline"></div>
                      </div>

                      <div className="tab-content-body">
                        <h3>Create your account</h3>
                        <p className="tab-subtitle">Start your transformation today</p>

                        <form onSubmit={handleSignupSubmit}>
                          <div className="gold-input-group">
                            <span className="input-icon">👤</span>
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={signupData.name}
                              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                              required
                            />
                          </div>

                          <div className="gold-input-group">
                            <span className="input-icon">✉️</span>
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={signupData.email}
                              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                              required
                            />
                          </div>

                          <div className="gold-input-group">
                            <span className="input-icon">🔒</span>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              value={signupData.password}
                              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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

                          <div className="gold-input-group">
                            <span className="input-icon">🔒</span>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Confirm Password"
                              value={signupData.confirmPassword}
                              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-extra-row">
                            <label className="remember-checkbox">
                              <input
                                type="checkbox"
                                checked={signupData.agreeTerms}
                                onChange={(e) => setSignupData({ ...signupData, agreeTerms: e.target.checked })}
                              />
                              <span>I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="gold-forgot-link">Terms & Conditions</a></span>
                            </label>
                          </div>

                          {error && modalMode === 'signup' && <p className="error">{error}</p>}
                          {successMsg && modalMode === 'signup' && <p className="success-msg">{successMsg}</p>}

                          <button type="submit" className="btn-gold-submit" disabled={loading}>
                            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* FORGOT PASSWORD FORM */
                  <div className="tab-content-body">
                    <h3>Reset Password</h3>
                    <p className="tab-subtitle">Enter your registered email and choose a new password</p>

                    <form onSubmit={handleForgotSubmit}>
                      <div className="gold-input-group">
                        <span className="input-icon">✉️</span>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="gold-input-group">
                        <span className="input-icon">🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="New Password"
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
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

                      <div className="gold-input-group">
                        <span className="input-icon">🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm New Password"
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      {error && <p className="error">{error}</p>}
                      {successMsg && <p className="success-msg">{successMsg}</p>}

                      <button type="submit" className="btn-gold-submit" disabled={loading}>
                        {loading ? 'RESETTING...' : 'RESET PASSWORD'}
                      </button>
                    </form>

                    <p className="bottom-toggle-text">
                      Remember your password? <button type="button" className="btn-link gold-link" onClick={openLogin}>Login</button>
                    </p>
                  </div>
                )}

                {/* FORGOT PASSWORD FORM */}
                {modalMode === 'forgot' && (
                  <div className="tab-content-body">
                    <h3>Reset Password</h3>
                    <p className="tab-subtitle">Enter your registered email and choose a new password</p>

                    <form onSubmit={handleForgotSubmit}>
                      <div className="gold-input-group">
                        <span className="input-icon">✉️</span>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="gold-input-group">
                        <span className="input-icon">🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="New Password"
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
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

                      <div className="gold-input-group">
                        <span className="input-icon">🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm New Password"
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      {error && <p className="error">{error}</p>}
                      {successMsg && <p className="success-msg">{successMsg}</p>}

                      <button type="submit" className="btn-gold-submit" disabled={loading}>
                        {loading ? 'RESETTING...' : 'RESET PASSWORD'}
                      </button>
                    </form>

                    <p className="bottom-toggle-text">
                      Remember your password? <button type="button" className="btn-link gold-link" onClick={openLogin}>Login</button>
                    </p>
                  </div>
                )}

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
        )}
      </main>
    </div>
  );
}

export default LandingPage;
