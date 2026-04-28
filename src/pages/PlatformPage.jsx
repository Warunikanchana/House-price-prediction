import About from '../Components/About';
import SellerHub from '../Components/SellerHub';
import Predict from '../Components/Predict';

function PlatformPage({
  role,
  sellerForm,
  sellerListings,
  adminMetrics,
  onSellerChange,
  onSubmit,
  onPriceUpdate,
  predictionForm,
  predictedPrice,
  onPredictionChange,
  onPredict,
  formatCurrency,
}) {
  return (
    <>
      
      <SellerHub
        role={role}
        sellerForm={sellerForm}
        sellerListings={sellerListings}
        adminMetrics={adminMetrics}
        onSellerChange={onSellerChange}
        onSubmit={onSubmit}
        onPriceUpdate={onPriceUpdate}
        formatCurrency={formatCurrency}
      />
      <Predict
        role={role}
        predictionForm={predictionForm}
        predictedPrice={predictedPrice}
        onPredictionChange={onPredictionChange}
        onPredict={onPredict}
        formatCurrency={formatCurrency}
      /> 
    </>
  );
}

export default PlatformPage;
