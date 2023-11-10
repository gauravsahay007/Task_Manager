import React,{useEffect, useState} from 'react'
import section from "../Styles/Section.module.css"
import { useData } from '../Context/DataProvider'
import { useStateGroup } from '../Context/StateContext';
import Card from './Card';
import UserImage from "../Images/user.png"
import ProfilePicture from './ProfilePicture';

export default function Section({pic,tickets,name}) {
  const {state,setState} = useData();
  const {stateGroup,setStateGroup} = useStateGroup()
  useEffect(()=>{
   if(stateGroup.states.currentOrder===0) sortByPriority() 
   if(stateGroup.states.currentOrder===1) sortByTitle() 
  },[stateGroup.states.currentOrder])

 const [cardList,setCardList] = useState(tickets?tickets:[]);


  const sortByPriority = () => {
    return setCardList(cardList.slice().sort((a, b) => a.priority - b.priority));
  };

  const sortByTitle = () => {
    return setCardList(cardList.slice().sort((a, b) => a.title.localeCompare(b.title)));
  };

 const showCards = () => {
  return cardList.map((ticket) => (
    <Card  ticket={ticket} />
  ))

}

  return (
    <div style={{display:"flex",flexDirection:"column",width: '14vw',paddingTop:"3vh",marginRight:"3vw",marginLeft:"3vw"}}>
       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginBottom:"3vh" ,width: '17vw'}}>
    <div className={section.sectionName}>
      <span>
        <div style={{ position: 'relative', width: '1.2vw', height: '2.5vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ borderRadius: '100%', width: '100%', height: '100%', position: 'relative', zIndex: '0' }}>
          {stateGroup.states.currentGroup=="1"?<ProfilePicture userId={tickets.length===0?null:tickets[0].userId} />:<img src={!pic?UserImage:pic} style={{ width: '100%', height: '100%' }} alt="" />}
          </div>
        </div>
      </span>
  
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontWeight: '600', color: 'black', fontSize: '1.8vh' }}>{name}</span>
      </div>
  
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontWeight: '600', color: '#616C6F', fontSize: '1.8vh' }}>{cardList.length}</span>
      </div>
    </div>
    <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
      <span style={{ fontSize: '2.5vh' }} class="material-symbols-outlined">
        add
      </span>
      <span style={{ fontSize: '2.5vh' }} class="material-symbols-outlined">
        more_horiz
      </span>
    </div>
       </div>
       <div style={{display:"flex",flexDirection:"column",gap:"30px"}}>
       {showCards()}
       </div>
      
    </div>
   
  
  )
}
