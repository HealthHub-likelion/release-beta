import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import '../styles/pages/FeedsPage.css'
import Header from "../components/Header";
import ProfileSession from "../sessions/ProfileSession";
import FeedsSession from "../sessions/FeedsSession";
import InitialData from "../components/InitialData";

function FeedsPage() {
    const {username} = useParams();
    const [userData, setUserData] = useState({});

    return (
      <div className="FeedsPage">
        <div className="feedspage_header">
          <Header Tab={'Feeds'} username={username} userData={userData}/>
        </div>
        <div className="feedspage_content">
          <div className="feedspage_profile">
            <ProfileSession username={username} userData={userData}/>
          </div>
          <div className="feedspage_FeedsSession">
            <FeedsSession userData={userData} setUserData={setUserData}/>
          </div>
        </div>

        <InitialData 
          username={username}
          setUserData={setUserData}
        />
      </div>
    );
  }

  export default FeedsPage;