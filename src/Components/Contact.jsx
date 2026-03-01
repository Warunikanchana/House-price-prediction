import '../Components-css/Contact.css';

function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-wrapper">
        <div className="contact-brand">
          <div className="brand-badge">E</div>
          <h3 className="brand-name">
            Estate<span>Mind</span>
          </h3>
          <p className="brand-desc">
            Empowering home buyers and sellers with data-driven insights. Our AI models provide the most
            accurate property valuations in the market.
          </p>
          <div className="social-row">
            <button type="button" className="social-chip" aria-label="Twitter">T</button>
            <button type="button" className="social-chip" aria-label="GitHub">G</button>
            <button type="button" className="social-chip" aria-label="LinkedIn">in</button>
            <button type="button" className="social-chip" aria-label="Instagram">I</button>
          </div>
        </div>

        <div className="contact-links">
          <div className="link-col">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#predict">Prediction Tool</a>
            <a href="#market">Market Trends</a>
          </div>
          <div className="link-col">
            <h4>Support</h4>
            <a href="#help">Help Center</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </div>

      <div className="contact-divider"></div>
      <p className="contact-copy">© 2026 EstateMind. All rights reserved.</p>
    </footer>
  );
}

export default Contact;
