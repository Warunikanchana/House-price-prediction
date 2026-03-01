import '../Components-css/Home.css';
import heroImage from '../assets/pexels-photo-106399.jpeg';
import analyzImage from '../assets/analyz.png';
import graphImage from '../assets/graph.png';
import HomethreeButton from './HomethreeButton';

function Home() {
    return (
        <div id="home" className="hero-container home-section">
            <div className="heroLeft">
                <h1 className="heroText-topic">
                    Predict Your<br />
                    Home's Value with<br />
                    <span className="highlight">ML Precision</span>
                </h1>
                <p className="heroText-desc">
                    Leverage advanced machine learning models trained on<br />
                    millions of real-world listings to get the most accurate<br />
                    property valuations in seconds.
                </p>
                <div className="hero-buttons">
                    <button className="hero-btn primary">Start Predicting Now</button>
                    <button className="hero-btn secondary">Learn More</button>
                </div>
                <div className='Home-threeButton-container'>
                    <HomethreeButton title="4K+" description="Listings Analyzed" />
                    <HomethreeButton title="96%" description="Accuracy Rate" />    
                    <HomethreeButton title="2.5s" description="Avg. Response Time" />
                </div>



            </div>
            <div className="heroRight">
                <div className="hero-image-wrapper">
                    <img src={heroImage} alt="House" className="hero-img" />
                    <div className="badge badge1">
                        <img src={analyzImage} alt="" />
                        <span>Verified Data<br/>Market Regulated</span>
                    </div>

                    <div className="badge badge2">
                    <img src={graphImage} alt="" />
                    <span>Live Analysis<br/>Real-time</span>
                   </div>


                </div>
            </div>
            
        </div>
    );
}

export default Home;
