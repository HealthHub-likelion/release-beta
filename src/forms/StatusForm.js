import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/forms/StatusForm.css';

function StatusForm() {
    const token = localStorage.getItem('HH_token');

    const navigate = useNavigate();

    const deleteAccount = () => {
        // 계정 삭제
        axios.delete(`${process.env.REACT_APP_PROXY}/accounts/member/`, {
            // 헤더 부분
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                // 잘 불러와졌을때
                // console.log(res);
            })
            .catch((err) => {
                // 오류 나왓을 때
                // console.log(err);
            })
    }

    const deleteConfirm = () => {
        if (window.confirm('탈퇴하시겠습니까?')) {
            deleteAccount();
            localStorage.removeItem('HH_token');
            localStorage.removeItem('HH_member_id');
            localStorage.removeItem('HH_name');
            navigate(`/`);
            alert('탈퇴되었습니다.');
        }
    }

    const moveIndex = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('HH_token');
            localStorage.removeItem('HH_member_id');
            localStorage.removeItem('HH_name');
            navigate(`/`);
        }
    }

    return (
        <div className="StatusForm">
            <div className="statusform_title">
                <div>Status</div>
            </div>
            <div className='statusform_button'>
                <button
                    type="button"
                    onClick={() => moveIndex()}
                    className="statusform_button_logout"
                >
                    로그아웃
                </button>
                <button
                    type="button"
                    onClick={() => deleteConfirm()}
                    className="statusform_button_deleteaccount">
                    회원탈퇴
                </button>
            </div>
        </div>

    )
}

export default StatusForm;