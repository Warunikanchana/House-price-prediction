import '../Components-css/Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-logo" aria-hidden="true">E</div>
          <span className="brand-text">
            Estate<span>Mind</span>
          </span>
        </div>

        <nav className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#predict">Predict</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="navbar-cta" href="#predict">Get Started</a>
      </div>
    </header>
  );
}

export default Navbar;
