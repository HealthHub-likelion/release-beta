import '../../styles/components/elements/WavesElement.css'
import Wave from '../Wave';
import { useEffect, useState } from 'react';

function WavesElement({userData}) {
    const [recordTimeList, setRecordTimeList] = useState([]);

    useEffect(()=>{
        setRecordTimeList(userData.recordTimeList);
    },[userData.recordTimeList])

    const [waveLevel, setWaveLevel] = useState(0);
    let wave_level = 0;

    const normalizationDate = (date) =>{
        const year = date.getFullYear();
        const month = date.getMonth()+1 < 10?'0'+(date.getMonth()+1):date.getMonth()+1;
        const day = date.getDate() < 10?'0'+date.getDate():date.getDate();

        return year+'-'+month+'-'+day;
    }

    useEffect(()=>{
        setWaveLevel(wave_level);
    },[waveLevel]);

    const showWavePlate = () =>{
        let consecutiveLevel = 0;
        let decreaseCount = 0;

        const date = new Date();

        const plateList = [];
        
        for(let i = 29; i > -1; i--){
            const dateCount = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i);
            const compareDate = normalizationDate(dateCount);

            if(recordTimeList){
                if(recordTimeList.includes(compareDate)){
                    if(consecutiveLevel < 3)consecutiveLevel += 1;
                    decreaseCount = 0;
                    wave_level += 1;
                }
                else{
                    consecutiveLevel = 0;
                    decreaseCount += 1;
    
                    if(decreaseCount >= 7){
                        if(wave_level > 0) wave_level -= 1;
                        decreaseCount = 0;
                    }
                }
            }

            let seletClassName;
            switch(consecutiveLevel){
                case 0:
                    seletClassName = 'wave_none_box'
                    break;
                case 1:
                    seletClassName = 'wave_1lv_box'
                    break;
                case 2:
                    seletClassName = 'wave_2lv_box'
                    break;
                case 3:
                    seletClassName = 'wave_3lv_box'
                    break;
                default:
                    seletClassName = 'wave_none_box'
            }

            plateList.push(
                <div key={i} className={seletClassName}></div>
            );
            
        }
        return plateList;
    }


    return (
        <div className="WavesElement">
            <div className='wave_header'>
                WAVE
            </div>
            <div className='wave_content'>
                <div className='wave_Wave'>
                    <Wave waveLevel={waveLevel}/>
                </div>
                <div className='wave_date'>
                    <div className='wave_date_info'>
                        <div>timeworn</div><div>recent</div>
                    </div>
                    <div className='wave_plate'>
                        {showWavePlate()}
                    </div>
                    <div className='wave_date_state_info'>
                        <div className='wave_state_none_box'></div>
                        <div className='wave_state_1lv_box'></div>
                        <div className='wave_state_2lv_box'></div>
                        <div className='wave_state_3lv_box'></div>
                        <div className='wave_date_sate_info_content'>consecutive</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WavesElement;