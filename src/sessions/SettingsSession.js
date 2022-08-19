import axios from "axios";
import { useEffect, useState } from "react";
import NickNameForm from "../forms/NickNameForm";
import ProfileImageForm from "../forms/ProfileImageForm";
import SecurityForm from "../forms/SecurityForm";
import StatusForm from "../forms/StatusForm";
import '../styles/sessions/SettingsSession.css';

function SettingsSession({ username, userData }) {
    const [isOpen, setIsOpen] = useState();
    const token = localStorage.getItem('HH_token');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/accounts/getsettingoption`, {
            // 헤더 부분
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                // 잘 불러와졌을때
                setIsOpen(res.data.status.isOpen[0]);
            })
            .catch((err) => {
                // 오류 나왓을 때
                // console.log(err);
            })
    }, [])

    return (
        <div className="SettingsSession">
            <div className="settingssession_nickname">
                <NickNameForm username={username} userData={userData} />
            </div>
            <div className="settingssession_profileimage">
                <ProfileImageForm userData={userData} />
            </div>
            <div className="settingssession_security">
                <SecurityForm isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="settingssession_status">
                <StatusForm />
            </div>
        </div>
    )
}

export default SettingsSession;