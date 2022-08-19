import React from "react";
import ProfileContainer from "../components/background/ProfileBG";
import '../styles/pages/NotFoundPage.css'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

    const navigate = useNavigate();

    const inputRef = useRef();
    const token = localStorage.getItem('HH_token');

    const [inputName, setInputName] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [userList,setUserList] = useState([]);

    const searchName = (e) =>{
        setInputName(e.target.value);
    }

    useEffect(()=>{
        if(inputName!==''){
            setShowDropDown(true);
        }
        else setShowDropDown(false);
    })

    useEffect(()=>{
        if(inputName !== ''){
            axios.post(`${process.env.REACT_APP_PROXY}/accounts/membersearchbykeyword`,{
                keyword : inputName
            },{
                headers:{
                    Authorization: token
                }
            })
            .then((res)=>{
                if(inputName == ''){
                    setUserList([]);
                }
                setUserList([res.data.Member][0]);
            })
            .catch((err)=>{
                console.log(err);
                setUserList([]);
            })
        }
        else{
            setUserList([]);
        }
        },[inputName]);

    const clickLogo = () =>{
        if(localStorage.getItem('HH_name')){
            navigate(`/${localStorage.getItem('HH_name')}`);
            return
        }
        navigate(`/`);
    }

    function moveToUser(userName){
        navigate(`/${userName}`)
    }

    useEffect(()=>{
        const container = document.querySelector('.notFound_top_search_dropdown');
        const serarchInput = document.querySelector('.notFound_top_search_input');
        document.addEventListener('mouseup', function(e) {
            if(container !== null){
                if (!container.contains(e.target)) {
                    container.style.display = 'none';
                }
            }
            if (serarchInput.contains(e.target)) {
                container.style.display = 'block';
            }
        });
    })

    return (
        <ProfileContainer>
            <div className="NotFoundPage">
                <div className='notFound_top'>
                    <div className='notFound_top_box'>
                        <div className='notFound_top_searchBox'>
                            <input className='notFound_top_search_input' ref={inputRef} 
                                value={inputName} onChange={searchName} placeholder='user name'/>
                            <img alt='검색' src={`${process.env.REACT_APP_PROXY}/media/images/HH_icon_search_name.png`}/>
                        </div>
                        {showDropDown &&
                        <div className='notFound_top_search_dropdown'>
                            {
                                userList.map((e,i)=>{
                                    return(
                                        <div className="notFound_userList" key = {i}
                                            onClick={()=>{moveToUser(e.name)}}>  
                                            <div className="notFound_userImgContainer">
                                                <img
                                                    className="notFound_userImg"
                                                    src = {`${process.env.REACT_APP_PROXY}/media/${e.img}`}
                                                    />
                                            </div>
                                            <div className="notFound_userName">{e.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        }
                        <div className='notFound_box' onClick={()=>{clickLogo()}}>
                            <div className='notFound_logo_left'>Health</div>
                            <div className='notFound_logo_right'>Hub</div>
                        </div>
                    </div>
                </div>
                <div className="NotFoundContainer">
                        <div className="NotFound_404">404</div>
                        <div className="NotFound_alert">User Not Found</div>
                </div>
            </div>
        </ProfileContainer>
    );
};

export default NotFoundPage;