import '../../styles/components/modals/CreateRecordModal.css'
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import SelectRoutineBox from '../SelectRoutineBox';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

function CreateRecordModal({ show, onHide, userData }) {
    const [load, setLoad] = useState(false);

    const date = new Date();
    const tenMinAgo = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() - 10);
    const oneHourTenMinAgo = new Date(tenMinAgo.getFullYear(), tenMinAgo.getMonth(), tenMinAgo.getDate(), tenMinAgo.getHours() - 1, tenMinAgo.getMinutes());

    const regularNumber = (num) => {
        return num < 10 ? '0' + num : num;
    }

    const [imageSrc, setImageSrc] = useState('');
    const [addRecordData, setAddRecordData] = useState({
        start_time: {
            year: oneHourTenMinAgo.getFullYear(),
            month: regularNumber(oneHourTenMinAgo.getMonth() + 1),
            date: regularNumber(oneHourTenMinAgo.getDate()),
            hour: regularNumber(oneHourTenMinAgo.getHours()),
            minute: regularNumber(oneHourTenMinAgo.getMinutes()),
            seconds: '00'
        },
        end_time: {
            year: tenMinAgo.getFullYear(),
            month: regularNumber(tenMinAgo.getMonth() + 1),
            date: regularNumber(tenMinAgo.getDate()),
            hour: regularNumber(tenMinAgo.getHours()),
            minute: regularNumber(tenMinAgo.getMinutes()),
            seconds: '00'
        },
        routine_id: '',
        img: null,
        comment: ''
    })

    useEffect(() => {
        setAddRecordData({
            start_time: {
                year: oneHourTenMinAgo.getFullYear(),
                month: regularNumber(oneHourTenMinAgo.getMonth() + 1),
                date: regularNumber(oneHourTenMinAgo.getDate()),
                hour: regularNumber(oneHourTenMinAgo.getHours()),
                minute: regularNumber(oneHourTenMinAgo.getMinutes()),
                seconds: '00'
            },
            end_time: {
                year: tenMinAgo.getFullYear(),
                month: regularNumber(tenMinAgo.getMonth() + 1),
                date: regularNumber(tenMinAgo.getDate()),
                hour: regularNumber(tenMinAgo.getHours()),
                minute: regularNumber(tenMinAgo.getMinutes()),
                seconds: '00'
            },
            routine_id: '',
            img: null,
            comment: ''
        });
    }, [onHide])

    const checkDay = (state) => {
        if (state) {
            setAddRecordData({
                ...addRecordData,
                start_time: { ...addRecordData['start_time'], date: regularNumber(date.getDate()) }
            });
            return;
        }
        setAddRecordData({
            ...addRecordData,
            start_time: { ...addRecordData['start_time'], date: regularNumber(date.getDate() - 1) }
        });
    }

    const inputHour = (state, e) => {
        if (state === 'start') {
            setAddRecordData({
                ...addRecordData,
                start_time: { ...addRecordData['start_time'], hour: regularNumber(e.target.value) }
            });
            return;
        }
        setAddRecordData({
            ...addRecordData,
            end_time: { ...addRecordData['end_time'], hour: regularNumber(e.target.value) }
        });
    }
    const inputMinute = (state, e) => {
        if (state === 'start') {
            setAddRecordData({
                ...addRecordData,
                start_time: { ...addRecordData['start_time'], minute: regularNumber(e.target.value) }
            });
            return;
        }
        setAddRecordData({
            ...addRecordData,
            end_time: { ...addRecordData['end_time'], minute: regularNumber(e.target.value) }
        });
    }
    const inputComment = (e) => {
        setAddRecordData({ ...addRecordData, comment: e.target.value });
    }

    const cancelAddRecord = () => {
        window.confirm('?????????????????????????\n????????? ????????? ???????????????.') && onHide();
    }
    const saveAddRecord = () => {
        if (addRecordData['routine_id'] === '') {
            alert('?????? ????????? ????????? ????????? ?????????.');
            return;
        }
        if (window.confirm('?????????????????????????\n?????? ????????? ???????????????.')) {
            let formData = new FormData();
            const setStartTime = `${addRecordData['start_time']['year']}-${addRecordData['start_time']['month']}-${addRecordData['start_time']['date']} ${addRecordData['start_time']['hour']}:${addRecordData['start_time']['minute']}:00`;
            const setEndTime = `${addRecordData['end_time']['year']}-${addRecordData['end_time']['month']}-${addRecordData['end_time']['date']} ${addRecordData['end_time']['hour']}:${addRecordData['end_time']['minute']}:00`;

            if (addRecordData['img']) {
                formData.append('img', addRecordData['img'][0]);
            }

            
            axios.post(`${process.env.REACT_APP_PROXY}/record/`, {
                start_time: setStartTime,
                end_time: setEndTime,
                routine_id: addRecordData['routine_id'],
                member_id: localStorage.getItem('HH_member_id'),
                comment: addRecordData['comment']
            }, {
                headers: {
                    Authorization: localStorage.getItem('HH_token')
                }
            }).then((res) => {
                setLoad(true);
                if (res.data.record_id && addRecordData['img']) {
                    axios.post(`${process.env.REACT_APP_IMAGE}/record/${res.data.record_id}/`, formData, {
                        headers: {
                            Authorization: localStorage.getItem('HH_token')
                        }
                    }).then((res) => {
                        // console.log(res);
                        window.location.reload();
                        onHide();
                    }).catch((err) => {
                        // console.log(err);
                        alert('????????? ?????? ??????!!');
                        setLoad(false);
                    })
                    console.log(res);
                }
            }).catch((err) => {
                // console.log(err);
                alert('????????? ?????? ??????!!');
                setLoad(false);
            })
        }
    }

    return (
        <div className="CreateRecordModal">
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='create_record_modal_body'>
                    {load ? <LoadingSpinner load={load} /> : null}

                    <div className='create_record_header'>Today's Workout</div>
                    <div className='create_record_body'>
                        <div className='create_record_time'>
                            <div className='create_record_title'>
                                <div>time to workout</div><></>
                            </div>
                            <div className='create_record_sub_body'>
                                <div>
                                    <div className='create_record_time_title'>??????</div>
                                    <div className='create_record_input_group'>
                                        {oneHourTenMinAgo.getDate() === date.getDate()
                                            ?
                                            <><input type='radio' name='day' onClick={() => { checkDay(false) }} /><label>??????</label>
                                                <input type='radio' name='day' onClick={() => { checkDay(true) }} defaultChecked /><label>??????</label></>
                                            :
                                            <><input type='radio' name='day' onClick={() => { checkDay(false) }} defaultChecked /><label>??????</label>
                                                <input type='radio' name='day' onClick={() => { checkDay(true) }} /><label>??????</label></>
                                        }
                                        <input className='create_record_input_time' placeholder={addRecordData['start_time']['hour']}
                                            type='number' onChange={(e) => { inputHour('start', e) }} /><div>???</div>
                                        <input className='create_record_input_time' placeholder={addRecordData['start_time']['minute']}
                                            type='number' onChange={(e) => { inputMinute('start', e) }} /><div>???</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='create_record_time_title'>??????</div>
                                    <div className='create_record_input_group'>
                                        <label>??????</label>
                                        <input className='create_record_input_time' placeholder={addRecordData['end_time']['hour']}
                                            type='number' onChange={(e) => { inputHour('end', e) }} /><div>???</div>
                                        <input className='create_record_input_time' placeholder={addRecordData['end_time']['minute']}
                                            type='number' onChange={(e) => { inputMinute('end', e) }} /><div>???</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='create_record_routine'>
                            <div className='create_record_title'>
                                <div>today's routine</div><></>
                            </div>
                            <div className='create_record_sub_body'>
                                <SelectRoutineBox userData={userData} addRecordData={addRecordData} setAddRecordData={setAddRecordData} />
                            </div>
                        </div>
                        <div className='create_record_image'>
                            <div className='create_record_title'>
                                <div>photo of the day</div>
                                <UploadImage imageSrc={imageSrc} setImageSrc={setImageSrc} addRecordData={addRecordData} setAddRecordData={setAddRecordData} />
                            </div>
                            {addRecordData['img']
                                ? <div className='create_record_sub_body'><img alt='?????? ????????????' src={imageSrc} /></div>
                                : <div className='create_record_sub_body'>????????? ????????? ????????????.</div>}
                        </div>
                        <div className='create_record_comment'>
                            <div className='create_record_title'>
                                <div>comment of the day</div><></>
                            </div>
                            <div className='create_record_sub_body'>
                                <textarea value={addRecordData['comment']} placeholder='?????? ????????? ????????????????' onChange={inputComment} />
                            </div>
                        </div>
                    </div>
                    <div className='create_record_footer'>
                        <button onClick={() => { cancelAddRecord() }}>??????</button>
                        <button onClick={() => { saveAddRecord() }}>??????</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateRecordModal;