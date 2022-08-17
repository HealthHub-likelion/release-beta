import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import '../styles/pages/UserPage.css'
import Header from "../components/Header";
import UserSession from '../sessions/UserSession';
import ProfileSession from "../sessions/ProfileSession";
import InitialData from "../components/InitialData";

function UserPage() {
    const {username} = useParams();
    const [userData, setUserData] = useState({});
    
    return (
      <div className="UserPage">
        <div className="userpage_header">
          <Header Tab={'My'} username={username} userData={userData}/>
        </div>
        <div className="userpage_content">
          <div className="userpage_profile">
            <ProfileSession username={username} userData={userData} setUserData={setUserData}/>
          </div>
          <div className="userpage_UserSession">
            <UserSession userData={userData} setUserData={setUserData}/>
          </div>
        </div>

        <InitialData 
          username={username}
          setUserData={setUserData}
        />
      </div>
    );
  }

  export default UserPage;