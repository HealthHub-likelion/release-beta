import '../../styles/components/modals/EditRoutineModal.css'
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SearchExerciseOffcanvas from '../offcanvases/SearchExerciseOffcanvas';
import axios from 'axios';

function EditRoutineModal({show, onHide, exercises, proceedEdit, setProceedEdit, userData, setUserData, addExercise, setAddExercise}) {
    const [editContent, setEditContent] = useState({});
    const [saveExercise, setSaveExercise] = useState({});

    useEffect(()=>{
        if(proceedEdit===false&&!addExercise){
            setEditContent(exercises);
        }
    },[show]);

    useEffect(()=>{
        if(editContent.re_routine){
            const addExerciseList = [...editContent.re_routine];
            addExerciseList.push(saveExercise);
            setEditContent({...editContent, re_routine:addExerciseList});
        }
    },[saveExercise])

    const editRoutine = () =>{
        if(window.confirm('루틴을 수정하시겠습니까?')){
            const exerciseList = [];
            for(let i = 0; i < editContent['re_routine'].length; i++){
                const setList = [];
                for(let k = 0; k < editContent['re_routine'][i]['set_exercise'].length; k++){
                    const setObject = {weight: editContent['re_routine'][i]['set_exercise'][k]['weight'], 
                                count: editContent['re_routine'][i]['set_exercise'][k]['count']};
                    setList.push(setObject);
                }
                const exerciseObject = {ko_name: editContent['re_routine'][i]['exercise_ko_name'], set_list: setList};
                exerciseList.push(exerciseObject);
            }

            axios.post(`${process.env.REACT_APP_PROXY}/exercise/routine/${editContent['id']}/`,{
                routineName:editContent['routineName'],
                isOpen:editContent['isOpen']?'True':'False',
                ExerciseList:exerciseList
            }, {
                headers:{
                    Authorization: localStorage.getItem('HH_token')
                }
            })
            .then((res)=>{
                window.location.reload();
            })
            .catch((err)=>{
                // console.log(err);
            })
        }
    }
    const deleteRoutine = () =>{
        if(window.confirm('루틴을 삭제하시겠습니까?')){
            axios.delete(`${process.env.REACT_APP_PROXY}/exercise/routine/${exercises['id']}/detail/`, {
                headers:{
                    Authorization: localStorage.getItem('HH_token')
                }
            })
            .then((res)=>{
                const delRoutineList = userData.routine.filter(routineItem=>routineItem['routineId']!==exercises['id']);
                setUserData({...userData, routine:delRoutineList});
                onHide();
            })
            .catch((err)=>{
                // console.log(err);
            })
        }
    }

    const editRoutineName = (e) =>{
        setEditContent({...editContent, routineName:e.target.value});
    }
    const editRoutineOpen = (state) =>{
        if(state){
            setEditContent({...editContent, isOpen:true});
            return;
        }
        setEditContent({...editContent, isOpen:false});
    }
    const editSetNum = (e, state, index, k) =>{
        let editSetItem;
        const editSet = editContent['re_routine'][index]['set_exercise'].slice();
        let editRoutineItem;
        const editRoutineList = editContent['re_routine'].slice();

        if(state === 'weight'){
            editSetItem = {...editContent['re_routine'][index]['set_exercise'][k], weight: e.target.value};
        }
        else{
            editSetItem = {...editContent['re_routine'][index]['set_exercise'][k], count: e.target.value};
        }
        editSet[k] = editSetItem;
        editRoutineItem = {...editContent['re_routine'][index], set_exercise: editSet};
        editRoutineList[index] = editRoutineItem;
        setEditContent({...editContent, re_routine: editRoutineList});
    }
    const editAddSet = (index) =>{
        const addEditSet = [...editContent['re_routine'][index]['set_exercise'], {count: 0, weight: 0}];
        const addEditRoutineItem = {...editContent['re_routine'][index], set_exercise: addEditSet};
        const addEditRoutineList = editContent['re_routine'].slice();
        addEditRoutineList[index] = addEditRoutineItem;
        setEditContent({...editContent, re_routine: addEditRoutineList});
    }
    const delSet = (k, index) =>{
        const delSetList = editContent['re_routine'][index]['set_exercise'];
        delSetList.splice(k, 1);
        const delExerciseIndex = {...editContent['re_routine'][index], set_exercise: delSetList};
        const delExerciseList = [...editContent['re_routine']];
        delExerciseList[index] = delExerciseIndex;
        setEditContent({...editContent, re_routine:delExerciseList});
    }
    const delRoutine = (index) => {
        const delRoutineList = editContent['re_routine'];
        delRoutineList.splice(index, 1);
        setEditContent({...editContent, re_routine:delRoutineList});
    }

    const editRep = (set, index) =>{
        const set_list = [];

        if(set){
            for(let k = 0; k < set.length; k++){
                set_list.push(
                    <div key={k} className='edit_exercise_set_box'>
                        <div>{k+1}</div>
                        <div>
                            <input type='number' placeholder={set[k]['weight']} value={set[k]['weight']} onChange={(e)=>{editSetNum(e, 'weight', index, k)}}/>
                        </div>
                        <div>X</div>
                        <div>
                            <input type='number' placeholder={set[k]['count']} value={set[k]['count']} onChange={(e)=>{editSetNum(e, 'count', index, k)}}/>
                        </div>
                        <div>
                            {k!==0&&<button onClick={()=>{delSet(k, index)}}>삭제</button>}
                        </div>
                    </div>
                );
            }
        }
        set_list.push(
            <div key={-1} className='edit_add_set'>
                <button onClick={()=>{editAddSet(index)}}>세트 추가</button>
            </div>
        )

        return set_list;
    }

    const editExercises = () =>{
        const tempExercises = editContent['re_routine'];
        const exercise_list = [];
        
        if(tempExercises){
            for(let i = 0; i < tempExercises.length; i++){
                exercise_list.push(
                    <div key={tempExercises[i]['exercise_ko_name']} className='edit_exercise_box'>
                        <div className='edit_exercise_top'>
                            <div>
                                <div className='edit_exercise_title_en'>{tempExercises[i]['exercise_en_name']}</div>
                                <div className='edit_exercise_title_kr'>{tempExercises[i]['exercise_ko_name']}</div>
                            </div>
                            <button onClick={()=>{delRoutine(i)}}>삭제</button>
                        </div>
                        <div className='edit_exercise_column'>
                            <div>세트</div>
                            <div>kg</div>
                            <div></div>
                            <div>렙</div>
                            <div></div>
                        </div>
                        <div>
                            {editRep(tempExercises[i]['set_exercise'], i)}
                        </div>
                    </div>
                );
            }
        }
        exercise_list.push(<button key='add' className='edit_add_exercise' 
                            onClick={()=>{setAddExercise(true); onHide();}}>운동 추가</button>);

        return exercise_list;
    }

    return (
        <div className="EditRoutineModal">
            <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Body className='edit_routine_content'>
                    <div className='edit_routine_header'>
                        <input placeholder={editContent['routineName']} onChange={editRoutineName}/>
                        <div>
                            <button className={editContent['isOpen']?'edit_routine_state_click':'edit_routine_state_unclick'}
                                    onClick={()=>{editRoutineOpen(true)}}>public</button>
                            <button className={editContent['isOpen']?'edit_routine_state_unclick':'edit_routine_state_click'}
                                    onClick={()=>{editRoutineOpen(false)}}>private</button>
                        </div>
                    </div>
                    <div className='edit_routine_body'>
                        {editExercises()}
                    </div>
                    <div className='edit_routine_footer'>
                        <button onClick={()=>{deleteRoutine()}}>Routine 삭제</button>
                        <div>
                            <button className='edit_routine_footer_left' onClick={()=>{onHide()}}>
                                취소
                            </button>
                            <button className='edit_routine_footer_right' onClick={()=>{editRoutine()}}>
                                저장
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <SearchExerciseOffcanvas
                show={addExercise}
                onHide={()=>{setAddExercise(false)}}
                pre_modal='edit'
                setProceedEdit={setProceedEdit}
                setSaveExercise={setSaveExercise}
            />
        </div>
    );
}

export default EditRoutineModal;