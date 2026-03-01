import '../Components-css/About.css'

import icon1 from '../assets/notes2.png';
import icon2 from '../assets/cogwheel.png';
import icon3 from '../assets/operation.png';
import Aboutthrees from "./Aboutthrees.jsx";

function About() {
    return (
        <section id='about' className="about-section">
            <div className="about-wrapper">
                <div className="about-header">
                  <h2 className="about-title">How it works</h2>
                  <p className="about-subtitle">Our platform simplifies complex real estate data into actionable insights using three<br/>
                     simple steps.</p>
                </div>

                <div className='threeBlock-container'>
                    
                    <Aboutthrees icon={icon1}
                     title="Enter Property Details"
                     description="Provide basic information like location, area, and amenities of the property."
                      />
                    <Aboutthrees icon={icon2}
                     title="Model Analysis" 
                     description="Our advanced machine learning model analyzes current market trends and historical data."
                      />
                    <Aboutthrees icon={icon3}
                     title="Get Instant Prediction" 
                     description="Receive a detailed valuation report with confidence scores and market comparisons." 
                     />
                   
                </div>


                
            
            </div>

        
        
        </section>

    );
}

export default About;