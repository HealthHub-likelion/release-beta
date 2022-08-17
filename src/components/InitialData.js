import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InitialData({username, setUserData}) {
  const navigate = useNavigate();
  
    useEffect(()=>{
        const token = localStorage.getItem('HH_token')?localStorage.getItem('HH_token'):''
  
        axios.get(`${process.env.REACT_APP_PROXY}/accounts/member/?name=${username}`, {
          headers:{
              Authorization: token
          }
        })
        .then((res)=>{
          const data = res.data;

          if(data.isFollow === null){
            localStorage.setItem('HH_member_id', data.id);
            localStorage.setItem('HH_name', data.name);
          }
          setUserData(data);
        })
        .catch((err)=>{
          // console.log(err);
          // 후에 사용자를 못찾았다는 경고 페이지 생성
          navigate(`/NotFoundPage`);
        })
      }, [])
}

export default InitialData;