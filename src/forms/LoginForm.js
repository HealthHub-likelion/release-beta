import '../styles/forms/LoginForm.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    })

    const saveEamil = (e) => {
        setLoginState({ ...loginState, email: e.target.value });
    }
    const savePwd = (e) => {
        setLoginState({ ...loginState, password: e.target.value });
    }

    const axiosLogin = () => {
        axios.post(`${process.env.REACT_APP_PROXY}/accounts/member/session`, {
            email: loginState['email'],
            password: loginState['password']
        }).
            then((res) => {
                localStorage.setItem('HH_token', res.data.token);
                navigate(`/${res.data.name}`);
            })
            .catch((err) => {
                // console.log(err);
                alert('이메일과 비밀번호를 다시 한번 확인해주세요.');
            })
    }

    const onCheckEnter = (e) => {
        if (e.key === 'Enter') {
            axiosLogin();
        }
    }

    return (
        <div className="LoginForm">
            <div className='loginform_email'>
                <input
                    value={loginState['email']}
                    onChange={saveEamil}
                    placeholder='이메일'
                    onKeyDown={onCheckEnter}
                ></input>
            </div>
            <input
                type="password"
                placeholder='비밀번호'
                className='loginform_password'
                value={loginState['password']}
                onChange={savePwd}
                onKeyDown={onCheckEnter}
            ></input>
            <div className='loginform_login' onClick={() => { axiosLogin() }}>Login</div>
        </div>
    );
}

export default LoginForm;