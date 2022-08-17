import { useNavigate } from 'react-router-dom';
import ProfileContainer from '../components/background/ProfileBG';
import SignupHeader from '../components/SignupHeader';
import LoginForm from '../forms/LoginForm';
import '../styles/pages/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  const moveSignupPage = () => {
    navigate(`/signup`);
  }

  return (
    <ProfileContainer>
      <div className="LoginPage">
        <SignupHeader />
        <div className="login_form">
          <LoginForm />
        </div>
        <div className="login_bottom">
          <button
            className="login_bottom_button"
            onClick={() => { moveSignupPage() }}
          >
            Signup
          </button>
        </div>
      </div>
    </ProfileContainer>
  );
}

export default LoginPage;