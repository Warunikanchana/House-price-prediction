import { Link } from 'react-router-dom';
import '../Components-css/Home.css';
import heroImage from '../assets/pexels-photo-106399.jpeg';
import analyzImage from '../assets/analyz.png';
import graphImage from '../assets/graph.png';
import HomethreeButton from './HomethreeButton';

function Home({ currentRole }) {
  return (
    <section id="home" className="home-shell">
      <div className="hero-container home-section">
        <div className="hero-background-card">
          <div className="hero-background-image">
            <img src={heroImage} alt="Luxury house background" className="hero-bg-img" />
          </div>
          <div className="hero-background-overlay"></div>

          <div className="hero-content">
            <div className="heroLeft">
              
              <h1 className="heroText-topic">
                Browse, post,
                <br />
                and price
                <br />
                houses with
                <span className="highlight"> smarter market insight</span>
              </h1>
              <p className="heroText-desc">
                EstateMind helps buyers search advertisements by location and property details, gives sellers
                a workspace to manage listings, and keeps access separated for buyers and sellers.
              </p>
              <div className="hero-buttons">
                <Link className="hero-btn primary" to="/property">
                  Explore Ads
                </Link>
              </div>

              

              <div className="Home-threeButton-container">
                <HomethreeButton title="Buyer Search" description="Filter ads by district, city, and house details." />
                <HomethreeButton title="Seller Tools" description="Post listings and update pricing using vote feedback." />
                <HomethreeButton title="ML Support" description="Estimate property value for ads or future purchases." />
              </div>
            </div>

            <div className="heroRight">
              <div className="hero-badge-stack">
                <div className="badge badge1">
                  <img src={analyzImage} alt="" />
                  <span>
                    Verified listings
                    <br />
                    Role-based access
                  </span>
                </div>

                <div className="badge badge2">
                  <img src={graphImage} alt="" />
                  <span>
                    Buyer voting
                    <br />
                    Price prediction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
