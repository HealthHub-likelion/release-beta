import axios from 'axios';
import '../styles/forms/SecurityForm.css';

function SecurityForm({ isOpen, setIsOpen }) {
    const token = localStorage.getItem('HH_token');

    /* Security Patch */
    const switchSecurity = (security) => {
        axios.patch(`${process.env.REACT_APP_PROXY}/accounts/member/`, {
            // 바디 부분
            isOpen: security
        }, {
            // 헤더 부분
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                // 잘 불러와졌을때
                // console.log('patch', res.data);
                getState();
            })
            .catch((err) => {
                // 오류 나왓을 때
                // console.log(err);
            })
    }

    const getState = () => {
        // 변경 확인
        axios.get(`${process.env.REACT_APP_PROXY}/accounts/getsettingoption`, {
            // 헤더 부분
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                // 잘 불러와졌을때
                console.log('now isOpen', res.data.status.isOpen);
            })
            .catch((err) => {
                // 오류 나왓을 때
                console.log(err);
            })
    }

    /* 버튼 활성화 변경 */
    const setPrivate = () => {
        return isOpen ? 'private_button' : 'private_button_clicked';
    }
    const setPublic = () => {
        return isOpen ? 'public_button_clicked' : 'public_button';
    }

    return (
        <div className="SecurityForm">
            <div className="securityform_title">
                <div>Security</div>
            </div>
            <div className='securityform_button'>
                <button className={setPrivate()} onClick={() => { setIsOpen(false); switchSecurity(false); }}>
                    private
                </button>
                <button className={setPublic()} onClick={() => { setIsOpen(true); switchSecurity(true); }}>
                    public
                </button>
            </div>
        </div>
    )
}

export default SecurityForm;