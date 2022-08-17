import '../styles/components/SelectRoutineBox.css'

const SelectRoutineBox = ({userData, addRecordData, setAddRecordData}) => {
    // console.log(userData.routine);

    const clickRoutineBox = (id) =>{
        setAddRecordData({...addRecordData, routine_id: id});
    };

    const showRoutines = () => {
        const routineList = [];

        const selectRoutineId = addRecordData['routine_id'];

        for(let i=0; i < userData.routine.length; i++){
            routineList.push(
                <div key={i} className={selectRoutineId===userData['routine'][i]['routineId']?'select_clicked_routine_box':'select_routine_box'}
                    onClick={()=>{clickRoutineBox(userData['routine'][i]['routineId'])}}>
                    <div className={selectRoutineId===userData['routine'][i]['routineId']?'select_clicked_routine_name':'select_routine_name'}>
                        {userData['routine'][i]['routineName']}
                    </div>
                    <div className={selectRoutineId===userData['routine'][i]['routineId']?'select_clicked_routine_count':'select_routine_count'}>
                        {/* <div>최근실행 날짜</div> */}
                        <div>{userData['routine'][i]['routineCount']} records</div>
                    </div>
                </div>
            );
        }
        return routineList;
    };

    return (
        <div className='SelectRoutineBox'>
            {showRoutines()}
        </div>
    );
};

export default SelectRoutineBox;