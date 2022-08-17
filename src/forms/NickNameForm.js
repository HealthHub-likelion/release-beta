import axios from 'axios';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import '../styles/forms/NickNameForm.css';

function NickNameForm({ username }) {
    const textareaRef = useRef();

    const [nicknameContent, setNickNameContent] = useState('');

    const token = localStorage.getItem('HH_token');
    const memberID = localStorage.getItem('HH_member_id');

    const navigate = useNavigate();

    const nicknameUpdate = () => {
        const nickname = nicknameContent

        axios.post(`${process.env.REACT_APP_PROXY}/accounts/member/${memberID}/`, {
            // 바디 부분
            nickname: nickname
        }, {
            // 헤더 부분
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                // 잘 불러와졌을때
                // console.log('post', res.data);
                alert('닉네임이 변경되었습니다!');
                navigate(`/${nickname}`);
            })
            .catch((err) => {
                // 오류 나왓을 때
                // console.log(err);
                alert('서비스 에러!!!');
            })
    }

    const saveUpdate = () => {
        if (nicknameContent === '') {
            textareaRef.current.focus();
            return;
        }
        else {
            if (window.confirm('변경하시겠습니까?')) {
                nicknameUpdate();
            }
        }
    }

    const onNickNameChange = (event) => {
        setNickNameContent(event.currentTarget.value);
    };

    return (
        <div className="NickNameForm">
            <div className="nicknameform_title">
                <div>NickName</div>
            </div>
            <div className='nicknameform_nickname'>
                <input
                    ref={textareaRef}
                    onChange={onNickNameChange}
                    value={nicknameContent}
                    placeholder={username}>
                </input>
                <button onClick={() => saveUpdate()}>확인</button>
            </div>
        </div>
    )
}

export default NickNameForm;