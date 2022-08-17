import '../styles/sessions/RecordSession.css';
import RecordsState from '../components/RecordsState';
import WaveElement from '../components/WaveElement';
import axios from 'axios';
import { useEffect, useState } from 'react';

function RecordSession() {

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
        let count = 1;
        let today = new Date();
        let getToday = new Date(today.toISOString().substring(0,10) + " 00:00:00");
        myList.map((e)=>{
            if(Math.ceil((new Date().getTime() - new Date(e.record_create_time.substring(0,10) + " 00:00:00").getTime())/(1000 * 3600 * 24)) === 1){
                today.setDate(today.getDate()-1);
                getToday = new Date(today.toISOString().substring(0,10) + " 00:00:00");
                count += 1;
            }
            else{
                return count;
            }
        })
        return count;
    }

    useEffect(()=>{
        setConsecutiveDay(getConsecutive());
    },[])

    return (
        <div className = 'RecordSession'>
            <div className='recordSession_recordsState'>
                <RecordsState entireWave = {myList.length} getConsecutive = {consecutiveDay}/>
            </div>
            <div className='recordSession_wavesWindow'>
                <div className='wavesWindow_header'>
                    <div className = 'wavesWindow_header_title'>WAVES</div>
                    <div className = 'wavesWindow_header_recordsCnt'>{myList.length} records</div>
                </div>
                <div className = 'wavesWindow_content'>
                    {
                        myList.map((e,i)=>{
                            return(
                                <WaveElement key = {i}
                                record_img = {e.record_img}
                                routine_name = {e.routine_name}
                                create_time = {getDate(e.record_create_time)}
                                comment = {e.record_comment}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default RecordSession;