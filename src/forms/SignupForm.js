import '../styles/forms/SignupForm.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm() {
    const navigate = useNavigate();

    const [alertComment, setAlertComment] = useState('');
    const [alertComment2, setAlertComment2] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const [nickName, setNickName] = useState('');
    const [email, setEamil] = useState('');
    const [isValid, setIsValid] = useState({
        nicknameValid: false,
        emailValid: false,
        passwordValid: false
    })

    const handlePassword = (e) => { setPassword(e.target.value) }
    const handlePassword2 = (e) => { setPassword2(e.target.value) }
    const inputName = (e) => { setNickName(e.target.value); }
    const inputEmail = (e) => { setEamil(e.target.value); }

    useEffect(() => {
        if (password2.length == 0) {
            setAlertComment('');
            setPasswordMatch(false);
        }
        else {
            if (password === password2) {
                setAlertComment('');
                setPasswordMatch(true);
            }
            else {
                setAlertComment('* 비밀번호가 일치하지 않습니다!');
                setPasswordMatch(false);
            }
        }
    }, [password, password2]);

    useEffect(() => {
        checkPassword(password);
        if (password.length == 0) {
            setAlertComment2('');
        }
        else {
            if (isValid.passwordValid) {
                setAlertComment2('');
            }
            else {
                setAlertComment2('* 영어,숫자,특수문자 포함 8글자 이상');
            }
        }
    }, [password])

    function checkPassword(password) {
        //영어,숫자,특수문자 포함 8글자 이상
        const pwd_rule = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{7,20}$/;
        if (pwd_rule.test(password)) {
            setIsValid((prev) => {
                return { ...prev, passwordValid: true }
            })
            return true;
        }
        else {
            setIsValid((prev) => {
                return { ...prev, passwordValid: false }
            })
            setAlertComment2('영어,숫자,특수문자 포함 8글자 이상');
            return false;
        }
    }

    const axiosNickName = () => {
        if (checkNickname(nickName)) {
            axios.post(`${process.env.REACT_APP_PROXY}/accounts/member/`, {
                name: nickName
            })
                .then((res) => {
                    // console.log(res);
                    alert('가능한 닉네임입니다!');
                })
                .catch((err) => {
                    // console.log(err);
                    alert('중복된 닉네임입니다.');
                })
        }
        else {
            alert('닉네임은 영문자로 시작하는 영문자 또는 숫자 3자 이상입니다.');
        }
    }

    function checkNickname(nickname) {
        //영문자로 시작하는 영문자 또는 숫자 3자 이상
        const nickname_rule = /^[a-z]+[a-z0-9]{2}$/;
        if (nickname_rule.test(nickname)) {
            setIsValid((prev) => {
                return { ...prev, nicknameValid: true }
            })
            // console.log(isValid)
            return true;
        }
        else {
            setIsValid((prev) => {
                return { ...prev, nicknameValid: false }
            })
            return false;
        }
    }

    const axiosEmail = () => {
        if (checkEmail(email)) {
            axios.post(`${process.env.REACT_APP_PROXY}/accounts/member/`, {
                email: email
            }).
                then((res) => {
                    // console.log(res);
                    alert('가능한 이메일입니다!');
                })
                .catch((err) => {
                    // console.log(err);
                    alert('중복된 이메일입니다.');
                })
        }
        else {
            alert('이메일 형식을 지켜주세요.')
        }
    }

    function checkEmail(email) {
        const email_rule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (email_rule.test(email)) {
            setIsValid((prev) => {
                return { ...prev, emailValid: true }
            })
            return true;
        }
        else {
            setIsValid((prev) => {
                return { ...prev, emailValid: false }
            })
            return false;
        }
    }

    const saveUser = () => {
        if (isValid.emailValid === true && isValid.nicknameValid === true && isValid.passwordValid === true && passwordMatch === true) {
            axios.post(`${process.env.REACT_APP_PROXY}/accounts/`, {
                name: nickName,
                email: email,
                password: password2
            }).
                then((res) => {
                    // console.log(err);
                    alert('회원가입이 완료되었습니다!');
                    navigate(`/login`);
                })
                .catch((err) => {
                    // console.log(err);
                    alert('회원가입 실패!!');
                })
        }
        else {
            alert('형식을 확인해주세요.');
        }
    }

    const onCheckEnter = (e) => {
        if (e.key === 'Enter') {
            saveUser();
        }
    }

    return (
        <div className="SignupForm">
            <div className='signupForm_nickname'>
                <input
                    placeholder='닉네임' value={nickName} onChange={inputName}>
                </input>
                <div onClick={() => { axiosNickName() }}>확인</div>
            </div>
            <div className='signupForm_email'>
                <input placeholder='이메일' value={email} onChange={inputEmail}></input>
                <div onClick={() => { axiosEmail() }}>확인</div>
            </div>
            <input
                type="password"
                placeholder='비밀번호'
                className='singupForm_password'
                onChange={handlePassword}
                onKeyDown={onCheckEnter}
            ></input>
            <div className='signupForm_passwordAlertBox'>
                <div className='signupForm_passwordAlert'>{alertComment2}</div>
            </div>
            <input
                type="password"
                placeholder='비밀번호 중복 검사'
                className='signupForm_doubleCheck'
                onChange={handlePassword2}
                onKeyDown={onCheckEnter}
            ></input>
            <div className='signupForm_passwordAlertBox'>
                <div className='signupForm_passwordAlert'>{alertComment}</div>
            </div>
            <div className='signupForm_signup' onClick={() => { saveUser() }}>Signup</div>
        </div>
    );
}

export default SignupForm;