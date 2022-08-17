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
            <ProfileContainer>
                <div className="ProfileSession">
                    <div className="profilesession_profile">
                        <Profile username={username} Tab={Tab}
                                showFollowers={showFollowers} setShowFollowers={setShowFollowers}
                                userData={userData} setUserData={setUserData}/>
                    </div>
                </div>
            </ProfileContainer>
            :
            <SliceContainer>
                <div className="ProfileSession">
                    <div className="profilesession_profile">
                        <Profile username={username} Tab={Tab}
                                showFollowers={showFollowers} setShowFollowers={setShowFollowers}
                                userData={userData} setUserData={setUserData}/>
                    </div>
                </div>
            </SliceContainer>
            }
        </>
    );
  }

  export default ProfileSession;