import '../styles/sessions/RecordSession.css';
import RecordsState from '../components/RecordsState';
import WaveElement from '../components/WaveElement';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SmallSliceContainer from '../components/background/SmallSliceBG';

function RecordSession({userData, setUserData}) {

    const [myList,setMyList] = useState([]);
    const [consecutiveDay,setConsecutiveDay] = useState(0);
    const token = localStorage.getItem('HH_token');

    const axiosRecords = () =>{
        axios.get(`${process.env.REACT_APP_PROXY}/record/mylist/`,{
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
        axiosRecords();
    },[]);

    function getDate(create_time){
        return create_time.substr(0,10);
    }

    function getConsecutive(){
        let count = 0;
        let today = new Date();
        let getToday = new Date(today.toISOString().substring(0,10) + " 00:00:00");
        latest(myList).map((e)=>{
            if(Math.ceil((getToday.getTime() - new Date(e.record_create_time.substring(0,10) + " 00:00:00").getTime())/(1000 * 3600 * 24)) === 1){
                today.setDate(today.getDate()-1);
                getToday = new Date(today.toISOString().substring(0,10) + " 00:00:00");
                count += 1;
            }
            // else{
            //     return count;
            // }
        })
        return count;
    }

    useEffect(()=>{
        setConsecutiveDay(getConsecutive());
    })

    function latest(myList){
        const latestList = [...myList];
        return latestList.reverse();
    }

    return (
        <div className = 'RecordSession'>
            <div className='recordSession_recordsState'>
                <SmallSliceContainer>
                    <RecordsState entireWave = {myList.length} getConsecutive = {consecutiveDay}/>
                </SmallSliceContainer>
            </div>
            <div className='recordSession_wavesWindow'>
                <div className='wavesWindow_header'>
                    <div className = 'wavesWindow_header_title'>WAVES</div>
                    <div className = 'wavesWindow_header_recordsCnt'>{myList.length} records</div>
                </div>
                <div className = 'wavesWindow_content'>
                    {
                        latest(myList).map((e,i)=>{
                            return(
                                <WaveElement key = {i}
                                userData={userData} 
                                setUserData={setUserData}
                                record_img = {e.record_img}
                                routine_name = {e.routine_name}
                                create_time = {getDate(e.record_create_time)}
                                comment = {e.record_comment}
                                member_nickname = {e.member_nickname}
                                member_img = {e.member_img}
                                isOpen={e.routine_isOpen}
                                routineId = {e.routine_id}
                                pre='wave'
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default RecordSession;