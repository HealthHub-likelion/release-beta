import '../../styles/components/elements/RoutinesElement.css'
import RoutineBox from '../RoutineBox';

function RoutinesElement({userData, setUserData}) {

    return (
        <div className="RoutinesElement">
            <div className='routines_header'>
                Routines
            </div>
            <div className='routines_body'>
                <RoutineBox userData={userData} setUserData={setUserData}/>
            </div>
        </div>
    );
}

export default RoutinesElement;