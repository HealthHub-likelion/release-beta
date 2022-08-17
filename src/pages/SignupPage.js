import React from "react";
import ProfileContainer from "../components/background/ProfileBG";
import SignupForm from "../forms/SignupForm";
import SignupHeader from "../components/SignupHeader";
import '../styles/pages/SignupPage.css'
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const moveLoginPage = () =>{
      navigate(`/login`);
  }

    return (
      <ProfileContainer>
        <div className="SignupPage">
          <SignupHeader/>
          <div className="signup_form">
            <SignupForm/>
          </div>
          <div className="signup_bottom">
            <div onClick={()=>{moveLoginPage()}}>Login</div>
          </div>
        </div>
      </ProfileContainer>
    );
  }

  export default SignupPage;