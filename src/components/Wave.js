import '../styles/components/Wave.css'

function Wave({waveLevel}) {

    const selectStyle = (i) => {
        const horizon_speed = 10 - (0.3 * waveLevel);
        const Perpen_speed = -(1 + (1 * (i-1)));
        let background_url;
        let bottom_value;

        if(waveLevel === 0){
            background_url = `${process.env.REACT_APP_PROXY}/media/images/HH_wave_lv0.png`
            bottom_value = -210;
        }
        else if(waveLevel > 0 && waveLevel <= 7){
            background_url = `${process.env.REACT_APP_PROXY}/media/images/HH_wave_lv1_${i}.png`
            bottom_value = -160;
        }
        else if(waveLevel > 7 && waveLevel <= 14){
            background_url = `${process.env.REACT_APP_PROXY}/media/images/HH_wave_lv2_${i}.png`
            bottom_value = -120;
        }
        else if(waveLevel > 14 && waveLevel <= 21){
            background_url = `${process.env.REACT_APP_PROXY}/media/images/HH_wave_lv3_${i}.png`
            bottom_value = -70;
        }
        else{
            background_url = `${process.env.REACT_APP_PROXY}/media/images/HH_wave_lv4_${i}.png`
            bottom_value = -30;
        }

        const isStyle = {
            bottom: `${bottom_value}px`,
            animation: `wave_element ${horizon_speed}s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite ,swell ${horizon_speed}s ease ${Perpen_speed}s infinite`,
            background: `url(${background_url}) repeat-x`
        }

        if(i===1){
            isStyle['zIndex'] = '3';
        }
        else if(i===2){
            isStyle['zIndex'] = '2';
        }
        else{
            isStyle['zIndex'] = '1';
        }

        return isStyle;
    }

    return (
        <div className="Wave">
            <div className='ocean'>
                {waveLevel > 14
                ?<>
                <div className="wave_element" style={selectStyle(1)}></div>
                <div className="wave_element" style={selectStyle(2)}></div>
                <div className="wave_element" style={selectStyle(3)}></div>
                </>
                :<>
                <div className="wave_element" style={selectStyle(1)}></div>
                <div className="wave_element" style={selectStyle(2)}></div>
                </>
                } 
            </div>
        </div>
    );
}

export default Wave;