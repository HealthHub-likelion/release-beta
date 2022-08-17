import '../styles/components/RoutineBox.css'
import { useEffect, useState } from 'react';
import ShowRoutineModal from './modals/ShowRoutineModal';
import CreateRoutineModal from './modals/CreateRoutineModal';

function RoutineBox({ userData, setUserData }) {
    const [showRoutine, setShowRoutine] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [proceedCreate, setProceedCreate] = useState(false);
    const [clickRoutineId, setClickRoutineId] = useState(-1);

    useEffect(()=>{
        if(proceedCreate){
            setShowCreate(true);
            setProceedCreate(false);
        }
    },[proceedCreate]);

    const [createState, setCreateState] = useState({
        create_name: '',
        create_isOpne: true,
        create_exercises: []
    });

    const showCreateModal=()=>{
        setCreateState({
            create_name: '', create_isOpne: true, create_exercises: []
        });
        setShowCreate(true);
    }

    const clickRoutine =(state, index)=>{
        if(!state && userData.isFollow!==null){
            alert('잠겨있는 루틴입니다.');
            return;
        }
        setClickRoutineId(userData.routine[index].routineId);
        setShowRoutine(true);
    }


    const showRoutines = () =>{
        const list = [];
        
        if(userData.routine){
            for(let i = 0; i < userData.routine.length; i++){
                list.push(
                    <div key={i} className='routineBox' onClick={()=>{clickRoutine(userData.routine[i]['routineOpen'], i)}}>
                        <div className='routineBox_top'>
                            <div className='routineBox_left'>
                                <div className='routineBox_title'>
                                    {userData.routine[i]['routineName']}
                                </div>
                                {!userData.routine[i]['routineOpen']
                                &&<img alt='공개여부' src={`${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_security.png`}/>}
                            </div>
                            <div className='routineBox_right'>
                                {userData.routine[i]['routineCount']} records
                            </div>
                        </div>
                        {/* <div className='routineBox_bottom'>
                            latest_date: {userData.routine[i]['latest_date']}
                        </div> */}
                    </div>
                )
            }
        }
        if(userData['isFollow']===null){
            list.push(<div key={-1} className='routineBox_plus' onClick={()=>{showCreateModal()}}><img alt='플러스' src={`${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_plus.png`}/></div>)
        }

        return list;
    }

    return (
        <div className="RoutineBox">
            {showRoutines()}

            <ShowRoutineModal 
                show={showRoutine}
                onHide={()=>{setShowRoutine(false)}}
                userData={userData}
                clickRoutineId={clickRoutineId}
                setUserData={setUserData}
            />
            <CreateRoutineModal
                show={showCreate}
                onHide={()=>{setShowCreate(false)}}
                createState={createState}
                setCreateState={setCreateState}
                setProceedCreate={setProceedCreate}
            />
        </div>
    );
}

export default RoutineBox;