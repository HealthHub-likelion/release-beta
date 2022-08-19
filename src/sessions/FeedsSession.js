import React from 'react';
import WaveElement from '../components/WaveElement';
import '../styles/sessions/FeedsSession.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

const FeedsSession = () => {

    const [feed_myList,setMyList] = useState([]);
    const token = localStorage.getItem('HH_token');

    const axiosFeeds = () =>{
        axios.get(`${process.env.REACT_APP_PROXY}/record/followinglist/`,{
            headers:{
                Authorization : token
            }
        })
        .then((res)=>{
            // console.log(res);
            setMyList(res.data);
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    useEffect(()=>{
        axiosFeeds();
    },[]);

    function getDate(create_time){
        const getCreate_time = create_time.substr(0,10);
        return getCreate_time;
    }

    function latest(feed_myList){
        const latestList = [...feed_myList];
        latestList.sort((a,b)=>{
            return b.record_id - a.record_id;
        })
        return latestList;
    }

    return (
        <div className='FeedsSession'>
            {
                        latest(feed_myList).map((e,i)=>{
                            return(
                                <WaveElement key = {i}
                                record_img = {e.record_img}
                                routine_name = {e.routine_name}
                                create_time = {getDate(e.record_create_time)}
                                comment = {e.record_comment}
                                member_nickname = {e.member_nickname}
                                member_img = {e.member_img}
                                />
                            )
                        })
                    }
        </div>
    );
};

export default FeedsSession;