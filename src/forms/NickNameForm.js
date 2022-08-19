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
                alert('이미 사용 중인 닉네임입니다!!');
                textareaRef.current.focus();
            })
    }

    const saveUpdate = () => {
        const number = /[0-9]/;
        const hangeul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if (nicknameContent === '') {
            textareaRef.current.focus();
            return;
        }
        else if (nicknameContent === username) {
            alert('현재 닉네임과 동일합니다.');
            textareaRef.current.focus();
        }
        else if (number.test(nicknameContent[0]) || hangeul.test(nicknameContent)) {
            alert('닉네임은 영문자로 시작하는 영문자 또는 숫자 3자 이상입니다.');
            textareaRef.current.focus();
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