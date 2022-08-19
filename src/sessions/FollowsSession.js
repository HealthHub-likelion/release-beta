import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FollowList from '../components/FollowList';
import '../styles/sessions/FollowsSession.css'

function FollowsSession({showFollowers, userData, setUserData}) {

    const [follower, setFollower] = useState([]); //팔로워 목록
    const [following, setFollowing] = useState([]); //팔로잉 목록
    const token = localStorage.getItem('HH_token');

    //팔로워 목록
    const axiosFollower = () => {
      if(userData['name']){
        axios.get(`${process.env.REACT_APP_PROXY}/accounts/member/follow?who=follower&name=${userData['name']}`, {
          headers : {
            Authorization: token
          }
        })
        .then((res) => {
          // console.log(res);
          setFollower(res.data);
        })
        .catch((err) => {
          // console.log(err);
        })
      }    
    }

    //팔로잉 목록
    const axiosFollowing = () => {
      if(userData['name']){
        axios.get(`${process.env.REACT_APP_PROXY}/accounts/member/follow?who=following&name=${userData['name']}`, {
          headers : {
            Authorization: token
          }
        })
        .then((res) => {
          // console.log(res);
          setFollowing(res.data);
        })
        .catch((err) => {
          // console.log(err);
        })
      }
    } 

    useEffect(() => {
      axiosFollower();
      axiosFollowing();
    }, [userData]);

  return (
    <div className='FollowsSession'>
      <FollowList
      follower={follower}
      setFollower={setFollower}
      following={following}
      setFollowing={setFollowing}
      showFollowers={showFollowers}
      userData={userData}
      setUserData={setUserData}
      />
    </div>
  )
}

export default FollowsSession