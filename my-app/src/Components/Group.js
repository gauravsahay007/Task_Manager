import React,{useState,useEffect} from 'react'
import { useData } from '../Context/DataProvider'
import { useStateGroup } from '../Context/StateContext';
import Section from './Section';
import GroupStyle from "../Styles/Group.module.css"
export default function Group() {

    const {stateGroup,setStateGroup} = useStateGroup();
    const {state,setState} = useData();
    const [multiplex, setMultiplex] = useState(0);
  

    const GroupByUser = (userData) => {
        if (!userData) {
            return <></>;
          }
        return(
            <div className={GroupStyle.wrapper} >
            {Object.keys(userData).map((userId) => {
              const user = userData[userId];
              return (<Section key={userId} tickets = {user.tickets} name={user.user.name} />)
            })}
          </div>
        )
    }

    const GroupByStatus = (statusData) => {
        if (!statusData) {
            return <></>;
        }
        return(
            <div className={GroupStyle.wrapper} >
            {Object.keys(statusData).map((ticket) => {
              return (<Section key={ticket} tickets={statusData[ticket]} name={ticket} pic={ticket=="Todo"?state.statusMap.todo:ticket=="Backlog"?state.statusMap.onhold:ticket=="In progress"?state.statusMap.inprogress:ticket=="Done"?state.statusMap.done:state.statusMap.cancel}  />)
            })}
          </div>
        )
    }

    const GroupByPriority = (priorityData) => {
        if(!priorityData){
            return <></>
        }
 
        return (
            <div className={GroupStyle.wrapper} >
            {Object.keys(priorityData).map((ticket) => {
                console.log(typeof ticket);
              return (<Section key={ticket} tickets={priorityData[ticket]} name={ticket==="0"?"No priority":ticket==="1"?"Low":ticket==="2"?"Medium":ticket==="3"?"High":"Urgent"} pic={ticket==="0"?state.statusMap.nopriority:ticket==="1"?state.statusMap.low:ticket==="2"?state.statusMap.medium:ticket==="3"?state.statusMap.high:state.statusMap.urgent}  />)
            })}
          </div>
        )
    }

    useEffect(()=>{
        setMultiplex(stateGroup.states.currentGroup)
    },[stateGroup])
 


    
  return (
    <div >
        {multiplex===1?GroupByUser(state.userData):multiplex===0?GroupByStatus(state.statusData):GroupByPriority(state.priorityData)};
    </div>
  )
}
