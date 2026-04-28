import '../Components-css/About.css';
import icon1 from '../assets/notes2.png';
import icon2 from '../assets/cogwheel.png';
import icon3 from '../assets/operation.png';
import Aboutthrees from './Aboutthrees.jsx';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-wrapper">
        <div className="about-header">
          <span className="section-kicker"></span>
          <h2 className="about-title">How buyers and sellers use EstateMind</h2>
          <p className="about-subtitle">
            The platform combines house advertisements, role-based access, community voting, and machine
            learning price guidance in one workflow.
          </p>
        </div>

        <div className="threeBlock-container">
          <Aboutthrees
            icon={icon1}
            title="Search & Compare"
            description="Buyers browse house advertisements by district, city, bedrooms, bathrooms, and property size."
          />
          <Aboutthrees
            icon={icon2}
            title="Post & Manage"
            description="Sellers create advertisements, monitor Low or Worth or High voting, and revise asking prices."
          />
          <Aboutthrees
            icon={icon3}
            title="Predict & Review"
            description="Buyers estimate property value from their preferred features "
          />
        </div>
      </div>
    </section>
  );
}

export default About;
