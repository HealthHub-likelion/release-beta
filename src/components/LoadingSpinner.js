import Spinner from 'react-bootstrap/Spinner';
import '../styles/components/LoadingSpinner.css';

function LoadingSpinner({load}) {
  return (
    <>
    {load&&
      <div className='spinner_back'>
        <Spinner animation="border" role="status" className='spinner'>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    }
    </>
  );
}

export default LoadingSpinner;