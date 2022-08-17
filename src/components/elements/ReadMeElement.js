import { useEffect, useRef, useState } from 'react';
import '../../styles/components/elements/ReadMeElement.css'
import ReadmeText from '../ReadmeText';
import axios from 'axios';

function ReadMeElement({userData, setUserData}) {
    const textareaRef = useRef();

    const [readmeContent, setReadmeContent] = useState('');
    const [compareContent, setCompareContent] = useState('');
    const [readmeUpdate, setReadmeUpdate] = useState(false);

    useEffect(()=>{
        setReadmeContent(userData.readMe);
    },[userData.readMe])

    const cancelUpdate = () =>{
        setReadmeContent(compareContent);
        setReadmeUpdate(false);
    }

    const saveUpdate = () =>{
        if(readmeContent === compareContent){
            textareaRef.current.focus();
            return;
        }
        else{
            if(window.confirm('작성하시겠습니까?')){
                setReadmeUpdate(false);

                axios.post(`${process.env.REACT_APP_PROXY}/accounts/updatereadme`,{
                    readMe: readmeContent
                },{
                    headers:{
                        Authorization: localStorage.getItem('HH_token')
                    }
                })
                .then((res)=>{
                    setUserData({...userData, readMe:readmeContent});
                })
                .catch((err)=>{
                    // console.log(err);
                })
            }
        }
    }

    const showUpdate = () =>{
        setCompareContent(readmeContent);
        setReadmeUpdate(true);
    }

    const showCreateBtn = () =>{
        const createBtn = [];

        if(userData['isFollow']===null){
            createBtn.push(
                readmeUpdate?
                <div key='udtBtn' className='update_buttongroup'>
                    <div onClick={()=>{cancelUpdate()}}>취소</div>
                    <div onClick={()=>{saveUpdate()}}>작성</div>
                </div>
                :<img key='udtImg' src={`${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_write.png`} alt='수정' onClick={()=>{showUpdate()}}/>
            );
        }

        return createBtn;
    }

    return (
        <div className="ReadMeElement">
            <div className='readme_header'>
                <div className='readme_header_title'>
                    README
                </div>
                {showCreateBtn()}
            </div>
            <div className='ReadmeText'>
                <ReadmeText readmeContent={readmeContent}
                            setReadmeContent={setReadmeContent} 
                            update={readmeUpdate}
                            textareaRef={textareaRef}
                            userData={userData}/>
            </div>
        </div>
    );
}

export default ReadMeElement;