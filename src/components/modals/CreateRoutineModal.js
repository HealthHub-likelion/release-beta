import '../../styles/components/modals/CreateRoutineModal.css';
import '../../styles/components/modals/EditRoutineModal.css';
import { Modal } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import SearchExerciseOffcanvas from '../offcanvases/SearchExerciseOffcanvas';
import axios from 'axios';

function CreateRoutineModal({show, onHide, createState, setCreateState, setProceedCreate}) {
    const nameRef = useRef();
    const [addExercise, setAddExercise] = useState(false);

    const inputRoutineName = (e) =>{
        setCreateState({...createState, create_name:e.target.value});
    }

    const [saveExercise, setSaveExercise] = useState({});

    useEffect(()=>{
        const addExerciseList = [...createState.create_exercises ,saveExercise];
        setCreateState({...createState, create_exercises:addExerciseList});
    },[saveExercise])

    const createCancle = () =>{
        onHide();
    }

    const addExerciseSet = (index) =>{
        const setList = [...createState['create_exercises'][index]['set_list'], {count: 0, weight: 0}];
        const exerciseIndex = {...createState['create_exercises'][index], set_list: setList};
        const exerciseList = [...createState['create_exercises']];
        exerciseList[index] = exerciseIndex;
        setCreateState({...createState, create_exercises:exerciseList});
    }
    const deleteSet = (k, index) =>{
        const delSetList = createState['create_exercises'][index]['set_list'];
        delSetList.splice(k, 1);
        const delExerciseIndex = {...createState['create_exercises'][index], set_list: delSetList};
        const delExerciseList = [...createState['create_exercises']];
        delExerciseList[index] = delExerciseIndex;
        setCreateState({...createState, create_exercises:delExerciseList});
    }
    const changeWeight = (e, k, index) =>{
        const udtSet = {...createState['create_exercises'][index]['set_list'][k], weight: e.target.value};
        const udtSetList = createState['create_exercises'][index]['set_list'];
        udtSetList[k] = udtSet;
        const udtExerciseIndex = {...createState['create_exercises'][index], set_list: udtSetList};
        const udtExerciseList = [...createState['create_exercises']];
        udtExerciseList[index] = udtExerciseIndex;
        setCreateState({...createState, create_exercises:udtExerciseList});
    }
    const changeCount = (e, k, index) =>{
        const udtSet = {...createState['create_exercises'][index]['set_list'][k], count: e.target.value};
        const udtSetList = createState['create_exercises'][index]['set_list'];
        udtSetList[k] = udtSet;
        const udtExerciseIndex = {...createState['create_exercises'][index], set_list: udtSetList};
        const udtExerciseList = [...createState['create_exercises']];
        udtExerciseList[index] = udtExerciseIndex;
        setCreateState({...createState, create_exercises:udtExerciseList});
    }

    const deleteExercise=(index)=>{
        const delExCreateState = createState.create_exercises;
        delExCreateState.splice(index, 1);
        setCreateState({...createState, create_exercises:delExCreateState});
    }

    const saveRoutine = () =>{
        if(createState.create_name===''){
            nameRef.current.focus();
            return;
        }
        if(!createState.create_exercises || createState.create_exercises.length===0){
            alert('운동을 추가해주세요!');
            return;
        }

        axios.post(`${process.env.REACT_APP_PROXY}/exercise/routine/`,{
            routineName: createState.create_name,
            isOpen: createState.create_isOpne?'True':'False',
            ExerciseList: createState.create_exercises
        },
        {
            headers:{
                Authorization: localStorage.getItem('HH_token')
            }
        })
        .then((res)=>{
            window.location.reload();
            onHide();
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    const createEdit = (set, index) =>{
        const set_list = [];

        if(set){
            for(let k = 0; k < set.length; k++){
                set_list.push(
                    <div key={k} className='edit_exercise_set_box'>
                        <div>{k+1}</div>
                        <div>
                            <input type='number' placeholder={set[k]['weight']} value={set[k]['weight']} onChange={(e)=>{changeWeight(e, k, index)}}/>
                        </div>
                        <div>X</div>
                        <div>
                            <input type='number' placeholder={set[k]['count']} value={set[k]['count']} onChange={(e)=>{changeCount(e, k, index)}}/>
                        </div>
                        <div>
                            {k!==0&&<button onClick={()=>{deleteSet(k, index)}}>삭제</button>}
                        </div>
                    </div>
                );
            }
        }
        set_list.push(
            <div key={-1} className='edit_add_set'>
                <button onClick={()=>{addExerciseSet(index)}}>세트 추가</button>
            </div>
        )

        return set_list;
    }

    const showAddExercise = () =>{
        const createExerciseList = [];

        if(createState.create_exercises.length>0){
            for(let i = 0; i < createState.create_exercises.length; i++){
                createExerciseList.push(
                    <div key={i} className='edit_exercise_box'>
                        <div className='edit_exercise_top'>
                            <div>
                                <div className='edit_exercise_title_en'>{createState.create_exercises[i]['ko_name']}</div>
                            </div>
                            <button onClick={()=>{deleteExercise(i)}}>삭제</button>
                        </div>
                        <div className='edit_exercise_column'>
                            <div>세트</div>
                            <div>kg</div>
                            <div></div>
                            <div>렙</div>
                            <div></div>
                        </div>
                        <div>
                            {createEdit(createState.create_exercises[i]['set_list'], i)}
                        </div>
                    </div>
                );
            }
        }

        return createExerciseList;
    }

    return (
        <div className="CreateRoutineModal">
            <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Body className='create_routine_content'>
                    <div className='create_routine_header'>
                        <input ref={nameRef} placeholder='루틴 이름' value={createState.create_name} onChange={inputRoutineName}/>
                        <div>
                            <button className={createState['create_isOpne']?'create_routine_state_click':'create_routine_state_unclick'}
                                    onClick={()=>{setCreateState({...createState, create_isOpne: true})}}>public</button>
                            <button className={createState['create_isOpne']?'create_routine_state_unclick':'create_routine_state_click'}
                                    onClick={()=>{setCreateState({...createState, create_isOpne: false})}}>private</button>
                        </div>
                    </div>
                    <div className='create_routine_body'>
                        {showAddExercise()}
                        <button className='create_add_exercise' 
                                onClick={()=>{setAddExercise(true); onHide();}}>운동 추가</button>
                    </div>
                    <div className='create_routine_footer'>
                        <button className='create_routine_footer_left' onClick={()=>{createCancle()}}>
                            취소
                        </button>
                        <button className='create_routine_footer_right' onClick={()=>{saveRoutine()}}>
                            생성
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <SearchExerciseOffcanvas
                show={addExercise}
                onHide={()=>{setAddExercise(false)}}
                pre_modal='create'
                setProceedCreate={setProceedCreate}
                setSaveExercise={setSaveExercise}
            />
        </div>
    );
}

export default CreateRoutineModal;