import '../../styles/components/offcanvases/SearchExerciseOffcanvas.css'
import { Offcanvas } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function SearchExerciseOffcanvas({show, onHide, pre_modal, setProceedCreate, setProceedEdit, setSaveExercise}) {
    const inputExRef = useRef();

    const [exerciseCategory, setExerciseCategory] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY}/exercise/list/`,{
            headers:{
                Authorization: localStorage.getItem('HH_token')
            }
        })
        .then((res)=>{
            setExerciseCategory(res.data);
        })
        .catch((err)=>{
            // console.log(err);
        })
    },[])

    const [partList] = useState(['전체', '가슴', '등', '다리', '어깨', '팔', '유산소', '전신', '코어', '기타'])
    const [clickedPart, setClickedPart] = useState('전체');
    const [selectEcercise, setSeletEcercise] = useState('');
    const [inputExercise, setInputExercise] = useState('');

    const showPart = partList.map(part=><button key={part} className={clickedPart===part?'clickedPart':'clickPart'}
                                                onClick={()=>{setClickedPart(part)}}>{part}</button>);

    const sortAry =(list)=>{
        list.sort(function(a, b){
            const upperCaseA = a['en_name'].toUpperCase();
            const upperCaseB = b['en_name'].toUpperCase();
            
            if(upperCaseA > upperCaseB) return 1;
            if(upperCaseA < upperCaseB) return -1;
            if(upperCaseA === upperCaseB) return 0;
        });

        return list;
    }

    const inputName = (e) =>{
        setInputExercise(e.target.value);
    }

    const showExercise = () =>{
        let filterList;

        if(clickedPart !== '전체'){
            filterList = exerciseCategory.filter(exercise => exercise['part'] === clickedPart);
        }
        else{
            filterList = exerciseCategory.slice();
        }
        if(inputExercise!==''){
            filterList = filterList.filter(exercise => {
                const upperCaseEN = exercise['en_name'].toUpperCase();
                const lowerCaseEN = exercise['en_name'].toLowerCase();
                const caseEN = exercise['en_name'];
                const caseKO = exercise['ko_name'];
                
                return upperCaseEN.includes(inputExercise) || caseEN.includes(inputExercise) 
                || caseKO.includes(inputExercise) || lowerCaseEN.includes(inputExercise);
            })
        }

        filterList = sortAry(filterList);

        const showExercise = [];
        
        if(filterList.length > 0){
            for(let i = 0; i < filterList.length; i++){
                showExercise.push(
                    <div key={i} className={selectEcercise[0]===filterList[i]['ko_name']?'select_exercise_box':'search_exercise_box'}
                        onClick={()=>{setSeletEcercise([filterList[i]['ko_name'], filterList[i]['en_name']])}}>
                        <div>
                            <div className='search_exercise_en'>
                                {filterList[i]['en_name']}
                            </div>
                            <div className='search_exercise_ko'>
                                {filterList[i]['ko_name']}
                            </div>
                        </div>
                        <div className='search_exercise_right'>
                            <div className='search_exercise_part'>
                                {filterList[i]['part']}
                            </div>
                            <img alt='정보' src={`${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_info.png`}/>
                        </div>
                    </div>
                );
            }
        }
        else{
            showExercise.push(
                <div key='empty' className='emptyBox'>
                    검색 결과가 없습니다.
                </div>
            );
        }
        

        return showExercise;
    }

    const proceedCancle = () =>{
        setSeletEcercise('');
        setInputExercise('');
        onHide();
        pre_modal==='create'?setProceedCreate(true):setProceedEdit(true);
    }
    const proceedCheck = () =>{
        if(selectEcercise===''){
            inputExRef.current.focus();
            return;
        }

        setSeletEcercise('');
        setInputExercise('');

        if(pre_modal==='create'){
            setProceedCreate(true);
            setSaveExercise({
                ko_name: selectEcercise[0],
                set_list:[{
                    count: 0,
                    weight: 0
                }]
            })
        }
        else{
            setProceedEdit(true);
            setSaveExercise({
                exercise_ko_name: selectEcercise[0],
                exercise_en_name: selectEcercise[1],
                set_exercise:[{
                    count: 0,
                    weight: 0
                }]
            })
        }
        
        onHide();
    }

    return (
        <div className="SearchExerciseOffcanvas">
            <Offcanvas show={show} onHide={onHide} placement='end' className='search_exercise_offcanvas'>
                <Offcanvas.Header className='search_exercise_header'>
                    <Offcanvas.Title className='search_exercise_title'>Exercises</Offcanvas.Title>
                    <div>{showPart}</div>
                    <div className='search_exercise_inputBox'>
                        <input ref={inputExRef} value={inputExercise} placeholder='운동명을 검색해보세요.'
                                onChange={inputName}/>
                        <img alt='검색' src={`${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_search.png`}/>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <div className='search_exercise_body'>{showExercise()}</div>
                    <div className='search_exercise_footer'>
                        <button className='search_footer_cancel' onClick={()=>{proceedCancle()}}>취소</button>
                        <button className='search_footer_right' onClick={()=>{proceedCheck()}}>확인</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default SearchExerciseOffcanvas;