import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthNavbar from '../components/AuthNavbar';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await api.post('/auth/reset-password', { email, new_password: newPassword });
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reset password');
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
                <Link to="/login" className="tab-item">LOGIN</Link>
                <Link to="/signup" className="tab-item">SIGN UP</Link>
              </div>

              <div className="tab-content-body">
                <h3>Reset Password</h3>
                <p className="tab-subtitle">Enter your registered email and choose a new password</p>

                <form onSubmit={handleSubmit}>
                  <div className="gold-input-group">
                    <span className="input-icon">✉️</span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="gold-input-group">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && <p className="error">{error}</p>}
                  {message && <p className="success-msg">{message}</p>}

                  <button type="submit" className="btn-gold-submit" disabled={loading}>
                    {loading ? 'RESETTING...' : 'RESET PASSWORD'}
                  </button>
                </form>

                <p className="bottom-toggle-text">
                  Remember your password? <Link to="/login">Login</Link>
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

export default ForgotPasswordPage;
