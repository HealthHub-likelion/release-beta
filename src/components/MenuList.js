import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuList.css'

function MenuList({Tab, username, userData}) {
    const [buttonType] = useState(['My', 'Feeds', 'Records', 'Settings']);
    const [followPage] = useState(Tab === 'Follows'?true:false);

    const navigate = useNavigate();

    const selectImgSrc = (type) =>{
      let returnSrc = null;

      switch(type){
        case 'My':
          if(Tab === 'My' && userData['isFollow']===null) returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_my_clicked.png`;
          else returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_my.png`;
          break;
        case 'Feeds':
          if(Tab === 'Feeds') returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_feed_clicked.png`;
          else returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_feed.png`;
          break;
        case 'Records':
          returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_record.png`;
          break;
        case 'Settings':
          if(Tab === 'Settings') returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_setting_clicked.png`;
          else returnSrc = `${process.env.REACT_APP_PROXY}/media/images/icons/HH_icon_setting.png`;
          break;
        default:
          returnSrc = null;
          break;
      }
      return returnSrc;
    }
    const selectColor = (type) =>{
      return type === Tab && userData['isFollow']===null?'#66B3F9':'#E3F5FE';
    }
    const selectBorder = (type) =>{
      return type === Tab && userData['isFollow']===null?'3px solid #66B3F9':'';
    }

    const movePage = (type) => {
      if(type === 'My' && localStorage.getItem('HH_name')){
        navigate(`/${localStorage.getItem('HH_name')}`);
        window.location.reload();
        return;
      }
      else if(type === 'My' && !localStorage.getItem('HH_name')){
        if(window.confirm('로그인되어 있지 않습니다.\n로그인 화면으로 이동하시겠습니까?')){
          navigate(`/`);
          return;
        }
      }
      navigate(`/${localStorage.getItem('HH_name')}/${type}`);
    }

    const showButtonList = () =>{
      const buttons = [];
      let start_index;
      let end_index;
      
      if(followPage || userData.isFollow !== null){
        start_index = 0;
        end_index = 1;
      }
      else{
        start_index = 0;
        end_index = 4;
      }

      for(let i = start_index; i < end_index; i++){
        const imgSrc = selectImgSrc(buttonType[i]); 
        const textColor = selectColor(buttonType[i]);
        const textBorder = selectBorder(buttonType[i]);

        buttons.push(
          <button key={i} className="menulist_button_box" style={{borderBottom:textBorder}}
                  onClick={()=>{movePage(buttonType[i])}}>
            <img className='menulist_button_img' src={imgSrc} alt='icon'/>
            <div className='menulist_button' style={{color:textColor}}>
              {buttonType[i]}
            </div>
          </button>
        );
      }

      return buttons;
    }

    return (
      <div className="MenuList">
        {followPage
        ?
        <div className='follow_menu'>{showButtonList()}</div>
        :<div className='not_follow_menu'>{showButtonList()}</div>}
      </div>
    );
  }

  export default MenuList;