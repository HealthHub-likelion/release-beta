import '../../styles/components/modals/ShowRoutineModal.css';
import { Modal } from 'react-bootstrap';
import EditRoutineModal from './EditRoutineModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

function ShowRoutineModal({ show, onHide, clickRoutineId, userData, setUserData, pre }) {
    const [load, setLoad] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [routineContent, setRoutineContent] = useState({});
    const [proceedEdit, setProceedEdit] = useState(false);
    const [addExercise, setAddExercise] = useState(false);

    useEffect(() => {
        if (!addExercise && proceedEdit) {
            setShowEdit(true);
        }
    }, [addExercise]);

    useEffect(() => {
        if (clickRoutineId !== -1 && !proceedEdit) {
            axios.get(`${process.env.REACT_APP_PROXY}/exercise/routine/${clickRoutineId}/`, {
                headers: {
                    Authorization: localStorage.getItem('HH_token')
                }
            })
                .then((res) => {
                    setRoutineContent(res.data);
                })
                .catch((err) => {
                    // console.log(err);
                })
        }
    }, [clickRoutineId, showEdit]);

    const editBtnClick = () => {
        setProceedEdit(false);
        setShowEdit(true);
        onHide();
    }

    const forkRoutine = () => {
        if (window.confirm('루틴을 저장하시겠습니까?')) {
            setLoad(true);
            axios.post(`${process.env.REACT_APP_PROXY}/exercise/routine/${routineContent['id']}/fork/`, {},
                {
                    headers: {
                        Authorization: localStorage.getItem('HH_token')
                    }
                })
                .then((res) => {
                    alert(`${userData['name']}님의 루틴을 저장하였습니다.`);
                    setLoad(false);
                    onHide();
                })
                .catch((err) => {
                    // console.log(err);
                    alert('중복된 루틴입니다!!');
                    setLoad(false);
                })
        }
    }

    const showRep = (set) => {
        const set_list = [];

        for (let k = 0; k < set.length; k++) {
            set_list.push(
                <div key={k} className='exercise_set_box'>
                    <div>{k + 1}</div>
                    <div>{set[k]['weight']}</div>
                    <div>X</div>
                    <div>{set[k]['count']}</div>
                </div>
            );
        }

        return set_list;
    }

    const showExercises = () => {
        const exercises = routineContent.re_routine;
        const exercise_list = [];

        if (exercises) {
            for (let i = 0; i < exercises.length; i++) {
                exercise_list.push(
                    <div key={i} className='exercise_box'>
                        <div className='exercise_title'>
                            <div className='exercise_title_en'>{exercises[i]['exercise_en_name']}</div>
                            <div className='exercise_title_kr'>{exercises[i]['exercise_ko_name']}</div>
                        </div>
                        <div className='exercise_column'>
                            <div>세트</div>
                            <div>kg</div>
                            <div></div>
                            <div>렙</div>
                        </div>
                        <div>
                            {showRep(exercises[i]['set_exercise'])}
                        </div>
                    </div>
                );
            }
        }
        return exercise_list;
    }

    return (
        <div className="ShowRoutineModal">
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='show_routine_content'>
                    {load ? <LoadingSpinner load={load} /> : null}

                    <div className='show_routine_header'>
                        <div>
                            {routineContent.routineName}
                        </div>
                        <div>
                            {userData.isFollow !== null &&
                                <button onClick={() => { forkRoutine() }}><img className='fork_img' alt='fork' src={`${process.env.REACT_APP_PROXY}/media/images/HH_icon_fork.png`} />Fork</button>
                            }
                            <img alt='취소' src={`${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_close_black.png`} onClick={onHide} />
                        </div>
                    </div>
                    <div className='show_routine_body'>
                        {showExercises()}
                    </div>
                    <div className='show_routine_footer'>
                        {(userData.isFollow === null && pre !== 'wave' )&&
                            <button onClick={() => { editBtnClick() }}>편집</button>}
                    </div>
                </Modal.Body>
            </Modal>

            <EditRoutineModal
                show={showEdit}
                onHide={() => { setShowEdit(false) }}
                exercises={routineContent}
                proceedEdit={proceedEdit}
                setProceedEdit={setProceedEdit}
                userData={userData}
                setUserData={setUserData}
                addExercise={addExercise}
                setAddExercise={setAddExercise}
            />
        </div>
    );
}

export default ShowRoutineModal;