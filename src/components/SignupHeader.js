import '../styles/components/SignupHeader.css'
import { useNavigate } from 'react-router-dom';

function SignupHeader() {
    const navigate = useNavigate();

    const clickLogo = () =>{
        if(localStorage.getItem('HH_name')){
            navigate(`/${localStorage.getItem('HH_name')}`);
            return
        }
        navigate(`/`);
    }

    return (
        <div className="SignupHeader">
            <div className="signup_top">
                <div className='signup_box'>
                    <div className='signup_logo_left' onClick={()=>{clickLogo()}}>Health</div>
                    <div className='signup_logo_right' onClick={()=>{clickLogo()}}>Hub</div>
                </div>
            </div>
        </div>
    );
}

    export default SignupHeader;