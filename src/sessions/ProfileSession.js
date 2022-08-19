import '../styles/sessions/ProfileSession.css';
import ProfileContainer from '../components/background/ProfileBG';
import Profile from '../components/Profile';
import { useMediaQuery } from 'react-responsive';
import SliceContainer from '../components/background/SliceBG';

function ProfileSession({username, Tab, showFollowers, setShowFollowers, userData, setUserData}) {
    const largeScreen = useMediaQuery({
        query : "(min-width:900px)"
    });

    return (
        <>
            {largeScreen?
            <div className="ProfileSession">
                <ProfileContainer>
                    <div className="profilesession_profile">
                        <Profile username={username} Tab={Tab}
                                showFollowers={showFollowers} setShowFollowers={setShowFollowers}
                                userData={userData} setUserData={setUserData}/>
                    </div>
                </ProfileContainer>
            </div>
            :
            <div className="ProfileSession">
                <SliceContainer>
                    <div className="profilesession_profile">
                        <Profile username={username} Tab={Tab}
                                showFollowers={showFollowers} setShowFollowers={setShowFollowers}
                                userData={userData} setUserData={setUserData}/>
                    </div>
                </SliceContainer>
            </div>
            }
        </>
    );
  }

  export default ProfileSession;