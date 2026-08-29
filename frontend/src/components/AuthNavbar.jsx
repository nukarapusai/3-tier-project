import { Link, useLocation } from 'react-router-dom';

function AuthNavbar() {
  const location = useLocation();

  return (
    <header className="fitzone-navbar">
      <div className="nav-container">
        <Link to="/login" className="nav-logo">
          <span className="logo-dumbbell">🏋️‍♂️</span>
          <div className="logo-brand">
            <span className="brand-title">FitTechCoach</span>
            <span className="brand-subtitle">STRONGER EVERYDAY</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link to="/login" className="nav-item active">HOME</Link>
          <a href="#about" onClick={(e) => e.preventDefault()} className="nav-item">ABOUT</a>
          <a href="#training" onClick={(e) => e.preventDefault()} className="nav-item">TRAINING</a>
          <a href="#nutrition" onClick={(e) => e.preventDefault()} className="nav-item">NUTRITION</a>
          <a href="#contact" onClick={(e) => e.preventDefault()} className="nav-item">CONTACT</a>
        </nav>

        <div className="nav-actions">
          <Link
            to="/login"
            className={`nav-btn btn-login-outline ${location.pathname === '/login' ? 'active-tab' : ''}`}
          >
            👤 LOGIN
          </Link>
          <Link
            to="/signup"
            className={`nav-btn btn-signup-gold ${location.pathname === '/signup' ? 'active-tab' : ''}`}
          >
            👤+ SIGN UP
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AuthNavbar;
