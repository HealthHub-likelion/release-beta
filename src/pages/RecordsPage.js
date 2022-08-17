import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import '../styles/pages/RecordsPage.css'
import Header from "../components/Header";
import ProfileSession from "../sessions/ProfileSession";
import RecordSession from "../sessions/RecordsSession";
import InitialData from "../components/InitialData";

function RecordsPage() {
    const {username} = useParams();
    const [userData, setUserData] = useState({});

    return (
      <div className="RecordsPage">
        <div className="recordspage_header">
          <Header Tab={'Records'} username={username} userData={userData}/>
        </div>
        <div className="recordspage_content">
          <div className="recordspage_profile">
            <ProfileSession username={username} userData={userData}/>
          </div>
          <div className="recordspage_RecordsSession">
            <RecordSession/>
          </div>
        </div>

        <InitialData 
          username={username}
          setUserData={setUserData}
        />
      </div>
    );
  }

  export default RecordsPage;