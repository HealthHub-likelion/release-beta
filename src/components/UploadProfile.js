import '../styles/components/UploadImage.css'
import { useRef } from 'react';

const UploadProfile = ({ imageSrc, setImageSrc, profileImg, setProfileImg }) => {
    const selectFile = useRef();

    const handleImageUpload = (e) => {
        const fileArr = e.target.files;
        setProfileImg(fileArr);

        let file;

        for (let i = 0; i < fileArr.length; i++) {
            file = fileArr[i];

            let reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const removeImage = () => {
        setImageSrc('');
        setProfileImg(null);
    }


    return (
        <div className='UploadImage'>
            {imageSrc.length !== 0 && <button onClick={() => { removeImage() }}>삭제</button>}
            <input type="file" style={{ display: 'none' }} ref={selectFile}
                accept="image/jpg,image/png,image/jpeg" onChange={handleImageUpload} />
            <button onClick={() => selectFile.current.click()}>+</button>
        </div>
    );
};

export default UploadProfile;