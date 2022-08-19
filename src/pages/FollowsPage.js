import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import '../styles/pages/FollowsPage.css'
import Header from "../components/Header";
import ProfileSession from "../sessions/ProfileSession";
import FollowsSession from "../sessions/FollowsSession";
import InitialData from "../components/InitialData";

function FollowsPage() {
    const {username} = useParams();
    const [userData, setUserData] = useState({});
    const [showFollowers, setShowFollowers] = useState(true);

    return (
      <div className="FollowsPage">
        <div className="followspage_header">
          <Header Tab={'Follows'} username={username} userData={userData}/>
        </div>
        <div className="followspage_content">
          <div className="followspage_profile">
            <ProfileSession username={username} Tab={'Follows'} 
                            showFollowers={showFollowers} setShowFollowers={setShowFollowers}
                            userData={userData}/>
          </div>
          <div className="followspage_FollowsSession">
            <FollowsSession showFollowers={showFollowers}
                            userData={userData}
                            setUserData={setUserData}
                            />
          </div>
        </div>

        <InitialData 
          username={username}
          setUserData={setUserData}
        />
      </div>
    );
  }

  export default FollowsPage;