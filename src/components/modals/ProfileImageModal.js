import '../../styles/components/modals/CreateRecordModal.css';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import UploadProfile from '../UploadProfile';

function ProfileImageModal(props) {
    const [imageSrc, setImageSrc] = useState('');   // 미리보기 데이터(base 64)
    const [profileImg, setProfileImg] = useState(null); // 프로필 사진 데이터

    const token = localStorage.getItem('HH_token');

    const uploadProfileImage = async () => {
        // 1. formData 생성 후 데이터 append
        let form_data = new FormData();
        form_data.append("img", profileImg[0]);

        // 2. axios로 전송
        await axios.post(`${process.env.REACT_APP_PROXY}/accounts/profileimage/upload`, form_data, {
            // 헤더 부분
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                // 잘 불러와졌을때
                // img 경로 추가시 수정할 부분
            })
            .catch((err) => {
                // 오류 나왓을 때
                // console.log(err);
            })

        props.onHide()
        // console.log(props.userdata)
    }

    const removeImage = () => {
        setImageSrc('');
        setProfileImg(null);
        props.onHide()
    }

    return (
        <div className="CreateRecordModal">
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='create_record_modal_body'>
                    <div className='create_record_header'>프로필 이미지</div>
                    <div className='create_record_image'>
                        <div className='create_record_title'>
                            <UploadProfile imageSrc={imageSrc} setImageSrc={setImageSrc} profileImg={profileImg} setProfileImg={setProfileImg} />
                        </div>
                        {profileImg
                            ? <div className='create_record_sub_body'><img alt='사진 미리보기' src={imageSrc} /></div>
                            : <div className='create_record_sub_body'>등록된 사진이 없습니다.</div>}
                    </div>

                    <div className='create_record_footer'>
                        <button onClick={() => removeImage()}>취소</button>
                        <button onClick={() => { uploadProfileImage() }}>저장</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProfileImageModal;