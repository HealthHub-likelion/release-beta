import React from 'react';
import '../styles/components/ElementProfileBox.css'
import { useLocation } from 'react-router-dom';

const ElementProfileBox = ({ member_nickname, member_img }) => {

    const location = useLocation(); ///userPage/Records or Feeds
    const pageLocation = location.pathname.split("/")[2]; //Records or Feeds

    return (
        <>
            {pageLocation === "Feeds" ?
                <div className='ElementProfileBox'>
                    <div className='waveElement_profileImgBox'>
                        <img
                            className='waveElement_profileImgBox'
                            src={`${process.env.REACT_APP_IMAGE}${member_img}`} />
                    </div>
                    <div className='waveElement_profileName'>{member_nickname}</div>
                </div>
                : null
            }
        </>
    );
};

export default ElementProfileBox;