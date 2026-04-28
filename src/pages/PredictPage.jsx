import { useEffect } from 'react';
import Predict from '../Components/Predict';

function PredictPage(props) {
  useEffect(() => {
    props.onClearPrediction();
  }, [props.onClearPrediction]);

  return <Predict {...props} />;
}

export default PredictPage;
