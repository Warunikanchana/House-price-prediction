import Predict from '../Components/Predict';

function BuyerPage(props) {
  return(
    <>
    
    <span className="section-kicker">Buyer prediction</span>
   <Predict {...props} />
   </>
  );
}

export default BuyerPage;
