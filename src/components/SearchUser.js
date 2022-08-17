import React from 'react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import '../styles/components/SearchUser.css';

const SearchUser = () => {

    const token = localStorage.getItem('HH_token');

    const inputRef = useRef();
    const [inputName, setInputName] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [userList,setUserList] = useState('');

    const searchName = (e) =>{
        setInputName(e.target.value);
        if(inputName!==''){
            setShowDropDown(true);
        }
    }

    useEffect(()=>{
        const searchBox = document.querySelector('.SearchUser_top_search_input');
        searchBox.addEventListener('blur', ()=>{
        setShowDropDown(false);
    })
    },[])

    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_PROXY}/accounts/membersearchbynickname`,{
        nickname : 'test',
        headers:{
            Authorization : token
        }
    })
    .then((res)=>{
        // console.log(res);
        // setUserList(res.data);
    })
    .catch((err)=>{
        // console.log(err);
    })
    },[inputName]);

    return (
        <div className='SearchUser_top_box'>
            <div className='SearchUser_top_searchBox'>
                <input className='SearchUser_top_search_input' ref={inputRef} 
                value={inputName} onChange={searchName} placeholder='user name'/>
                <img alt='검색' src={`${process.env.REACT_APP_PROXY}/media/images/HH_icon_search_name.png`}/>
            </div>
            {showDropDown && 
            <div className='SearchUser_top_search_dropdown'>                  

            </div>}
        </div>
    );
};

export default SearchUser;