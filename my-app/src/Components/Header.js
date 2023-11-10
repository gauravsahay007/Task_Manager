import React,{useState,useEffect} from 'react'
import header from "../Styles/Header.module.css"
import { useData } from '../Context/DataProvider';

export default function Header() {

  const {state,setState} = useData();

  const [currentGroup, setCurrentGroup] = useState(state.states.currentGroup);
  const [currentOrder, setCurrentOrder] = useState(state.states.currentOrder);
  const [currentState, setCurrentState] = useState({
    currentGroup: state.states.currentGroup,
    currentOrder:state.states.currentOrder,
    change:state.states.change,
    index:0
  });

  const [reload,setReload] = useState(0);


  const handleClick  = (indexNumber,changeNumber) => {
    setCurrentState({...currentState,index:indexNumber,change:changeNumber});
  }
  
  
  useEffect(() => {
    if (currentState.change === 0) {
      setCurrentGroup(currentState.index);
      setState((prevState) => ({
        ...prevState,
        states: {
          ...prevState.states,
          currentGroup: currentState.index,
          change: currentState.change,
        },
      }));
    }
    if (currentState.change === 1) {
      setCurrentOrder(currentState.index);
      setState((prevState) => ({
        ...prevState,
        states: {
          ...prevState.states,
          currentOrder: currentState.index,
          change: currentState.change,
        },
      }));
    }
    
    if(reload<1) setReload(1);
  }, [currentState]);

  useEffect(()=>{
    localStorage.setItem("userViewState", JSON.stringify(state));
    setReload(0);
  },[reload])

  



  

  const GroupName = () => {
   if(currentState.change===0) {
    return currentState.index === 0 ? "Status" : currentState.index === 1 ? "User" : "Priority";
   }
   return state.states.currentGroup === 0 ? "Status" : state.states.currentGroup === 1 ? "User" : "Priority";
  };

  const OrderName = () => {
    if(currentState.change===1) return currentState.index === 0 ? "Priority" : "Title";
    return state.states.currentOrder === 0 ? "Priority" :  "Title";
  }  

  return (
    <div style={{height:"7vh",display:"flex",alignItems:"center",paddingLeft:"3.98vw"}} >
      <div className={header.dropdown}>

      <button className={header.dropbtn} style={{borderRadius:"4px", width:"fit-content", textAlign:"center", display:"flex", justifyContent:"center",justifyItems:"center", textAlign:"center",padding:"4px",gap:"4px", border:"1px", backgroundColor:"white" ,boxShadow:"0 0 5px #7B8788", alignItems:"center"}} > 
     <span style={{color:"#A1A1A1",fontSize:"2vh"}} class="material-symbols-outlined">
      tune</span> 
      <span  style={{fontWeight:"600",color:"#616C6F",fontSize:"1.8vh"}}>Display</span>  
      <span style={{color:"#7B8788",fontSize:"2vh"}} class="material-symbols-outlined">
      arrow_drop_down
      </span> 
      </button>
      <div className={header.dropdowncontent}>
     <div style={{padding:"1vw",color:"#616C6F",fontSize:"2vh",display:"flex", justifyContent:"space-between",gap:"10vw"}}>
       <span style={{fontWeight:"600"}}>Grouping</span>
       <div  className={header.dropdown2} style={{borderRadius:"4px", backgroundColor:"white", width:"6vw",border:"2px solid #E0E0E0",display:"flex"}} > 
       <span  style={{margin:"auto",display:"block",fontWeight:"600"}}>{GroupName()}</span>
       <span style={{color:"#7B8788",fontSize:"3vh"}} class="material-symbols-outlined">
      arrow_drop_down
      </span> 
      <div className={header.dropdown2item}>
        <button className={header.dropdowncontent2} onClick={(()=>{
          handleClick(0,0);
        })} style={{fontSize:"2vh"}} > Status </button>
        <button className={header.dropdowncontent2} style={{fontSize:"2vh"}}  onClick={(()=>{
          handleClick(1,0);
        })} > User   </button>
        <button className={header.dropdowncontent2} style={{fontSize:"2vh"}}  onClick={(()=>{
          handleClick(2,0);
        })} > Priority </button>
      </div>
       </div>
       

     </div>
     <div style={{padding:"1vw",color:"#616C6F",fontSize:"2vh",display:"flex", justifyContent:"space-between"}}>
       <span style={{fontWeight:"600"}}>Ordering</span>
       <div className={header.dropdown2} style={{borderRadius:"4px", backgroundColor:"white", width:"6vw",border:"2px solid #E0E0E0",display:"flex"}} > 
       <span  style={{margin:"auto",display:"block",fontWeight:"600"}}>{OrderName()}</span>
       <span style={{color:"#7B8788",fontSize:"3vh"}} class="material-symbols-outlined">
      arrow_drop_down
      </span> 
      <div className={header.dropdown2item}>
        <button className={header.dropdowncontent2} style={{fontSize:"2vh"}}  onClick={(()=>{
          handleClick(0,1);
        })} > Priority </button>
        <button className={header.dropdowncontent2} style={{fontSize:"2vh"}}  onClick={(()=>{
          handleClick(1,1);
        })}> Title </button>
        
      </div>
       </div>
      
     </div>
    </div>

      </div>
    
    </div>
  )
}
