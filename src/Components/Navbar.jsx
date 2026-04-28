import { Link, NavLink } from 'react-router-dom';
import '../Components-css/Navbar.css';

function Navbar({ role, currentUser, onOpenAuth, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo" aria-hidden="true">
            E
          </div>
          <span className="brand-text">
            Estate<span>Mind</span>
          </span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/predict">Predict</NavLink>
          <NavLink to="/seller">Seller</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="navbar-actions">
          {currentUser ? <span className="navbar-role">Signed in as {currentUser.name} ({role})</span> : null}
          {currentUser ? (
            <button type="button" className="navbar-logout" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <button type="button" className="navbar-login" onClick={onOpenAuth}>
              Login / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
