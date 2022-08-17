import '../styles/components/UploadImage.css'
import { useRef } from 'react';

const UploadImage = ({imageSrc, setImageSrc, addRecordData, setAddRecordData}) => {
    const selectFile = useRef();

    const handleImageUpload = (e) =>{
        const fileArr = e.target.files;
        setAddRecordData({...addRecordData, img:fileArr});
    
        let file;
        
        for(let i = 0; i <fileArr.length; i++){
            file = fileArr[i];

            let reader = new FileReader();
            reader.onload=()=>{
                setImageSrc(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const removeImage = () =>{
        setImageSrc('');
        setAddRecordData({...addRecordData, img: null});
    }


    return (
        <div className='UploadImage'>
            {imageSrc.length !== 0 && <button onClick={()=>{removeImage()}}>삭제</button>}
            <input type="file" style={{display:'none'}} ref={selectFile} 
                accept="image/jpg,image/png,image/jpeg" onChange={handleImageUpload}/>
            <button onClick={()=>selectFile.current.click()}>등록</button>
        </div>
    );
};

export default UploadImage;