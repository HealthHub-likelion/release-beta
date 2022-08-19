import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/sessions/FollowsSession.css'

function FollowList({ follower, setFollower, following, setFollowing, showFollowers, userData, setUserData }) {

  //페이지 이동
  const nagative = useNavigate();
  const onClickProfile = (id) => {
    nagative(`/${id}`);
  }

  //팔로우, 언팔로우 토글
  const toggleFollower = (idx) => {
    if (userData.followingCount > -1 && userData.followerCount > -1) {
      if (follower['Member'][idx]['isFollow'] === true) { // 버튼 unfollow -> follow
        axoisreqUnFollow(follower['Member'][idx]['name']);
        setUserData({ ...userData, followingCount: userData.followingCount - 1 });
      } else { // 버튼 follow -> unfollow
        axiosreqFollow(follower['Member'][idx]['name']);
        setUserData({ ...userData, followingCount: userData.followingCount + 1 });
      }
    }

    const followerObject = follower['Member'][idx];
    followerObject['isFollow'] = !follower['Member'][idx]['isFollow'];

    const tempData1 = follower['Member'].slice();
    tempData1[idx] = followerObject;
    setFollower({ Member: tempData1 });
  }

  const toggleFollowing = (idx) => {

    if (following['Member'][idx]['isFollow'] === true && userData.followingCount > -1 && userData.followerCount > -1) {
      axoisreqUnFollow(following['Member'][idx]['name']);
      setUserData({ ...userData, followingCount: userData.followingCount - 1 });
    }
    // else{
    //   axiosreqFollow(following['Member'][idx]['name']);
    //   setUserData({...userData, followerCount: userData.followerCount+1});
    // }

    const followingObject = following['Member'][idx];
    followingObject['isFollow'] = !following['Member'][idx]['isFollow'];

    const tempData2 = following['Member'].slice();
    tempData2[idx] = followingObject;
    setFollowing({ Member: tempData2 });
  }

  const token = localStorage.getItem('HH_token');

  const axiosreqFollow = (userName) => {
    axios.post(`${process.env.REACT_APP_PROXY}/accounts/member/follow`, {
      //바디 부분
      name: userName
    }, {
      headers: {
        Authorization: token
      }

    }).then((res) => {
    })
      .catch((err) => {
        // console.log(err);
      })
  }

  const axoisreqUnFollow = (userName) => {
    window.confirm("unfollow 하시겠습니까?");
    axios.post(`${process.env.REACT_APP_PROXY}/accounts/member/unfollow`, {
      //바디 부분
      name: userName
    }, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {

      }).catch((err) => {
        // console.log(err);
      })
  }

  function followerList() {
    const list = [];
    if (showFollowers === true) {
      if (follower['Member']) {
        for (let i = 0; i < follower['Member'].length; i++) {
          list.push(
            <div className="FollowElement" key={i}>
              <div className="followImg">
                <img className="profileImg"
                  src={`${process.env.REACT_APP_IMAGE}` + follower['Member'][i]['img']}
                  onClick={() => onClickProfile(follower['Member'][i]['name'])}>
                </img>
              </div>
              <div className="followName"
                onClick={() => onClickProfile(follower['Member'][i]['name'])}>
                {follower['Member'][i]['name']}
              </div>
              {userData['isFollow'] === null
                ? <div className='isFollowBox'>
                  <button className='followBtn' onClick={() => toggleFollower(i)}>
                    {follower['Member'][i]['isFollow'] ? 'unfollow' : 'follow'}
                  </button>
                </div>
                : <></>}
            </div>
          )
        }
      }
    }
    else {
      if (following['Member']) {
        for (let i = 0; i < following['Member'].length; i++) {
          list.push(
            <div className="FollowElement" key={i}>
              <img className="profileImg"
                src={`${process.env.REACT_APP_IMAGE}` + following['Member'][i]['img']}
                onClick={() => onClickProfile(following['Member'][i]['name'])}>
              </img>
              <div className="followName"
                onClick={() => onClickProfile(following['Member'][i]['name'])}>
                {following['Member'][i]['name']}
              </div>
              {userData['isFollow'] === null
                ? <div className='isFollowBox'>
                  <button className='followBtn' onClick={() => toggleFollowing(i)}>
                    {following['Member'][i]['isFollow'] ? 'unfollow' : 'follow'}
                  </button>
                </div>
                : <></>}
            </div>
          )
        }
      }
    }
    return list;
  }

  return (
    <div className='FollowList'>
      {followerList()}
    </div>
  )
}

export default FollowList




