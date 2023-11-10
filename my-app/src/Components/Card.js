import React from 'react'
import ProfilePicture from './ProfilePicture'
import { useData } from '../Context/DataProvider'
export default function Card({ticket,pic}) {
    const {state} = useData();
    // console.log(ticket);
;
  return (
    <div style={{borderRadius:"6px",width:"17vw",boxShadow:"0 0 5px #7B8788",display:"flex",flexDirection:"column", paddingTop:"1.7vh",paddingRight:"0.66vw",paddingLeft:"0.66vw",paddingBottom:"1.7vh",gap:"5px"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <span  style={{fontWeight:"600",color:"#616C6F",fontSize:"1.4vh"}}>{ticket.id}</span>  
            <span><ProfilePicture  userId={ticket.userId} /></span>
        </div>
        <div  style={{fontWeight:"600",color:"black",fontSize:"1.2vh",display:'flex',justifyItems:"center",justifyContent:"left",flexDirection:"row",alignItems:"center"}}>

        <img src={
  ticket.status?(ticket.status === "Todo"
    ? state.statusMap.todo
    : ticket.status === "In progress"
    ? state.statusMap.inprogress
    : ticket.status === "Done"
    ? state.statusMap.done
    : ticket.status === "Cancelled"
    ? state.statusMap.cancel
    : state.statusMap.onhold):state.ticket.statusMap.onhold
}  style={{width:"12px", height:"12px",margin:"5px"}} /> {ticket.title}
</div> 
        <div style={{display:"flex",flexDirection:"row",marginTop:"4px",gap:"0.3vw",alignItems:"center"}}>
            <div style={{boxShadow:"0 0 1px #7B8788",borderRadius:"4px",padding:"3px"}} >
            <div style={{ borderRadius:"4px",display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1vw', height: '1vw', backgroundColor: '#6b6f76' }}>
            <span style={{ fontSize: '1.4vh', color: 'white', textAlign: 'center' }} class="material-symbols-outlined">
                priority_high
            </span>
        </div>
      </div>

            <div>
            </div>
            <div style={{ borderRadius:"4px",display: 'flex', justifyContent: 'center', alignItems: 'center', width:"fit-content", height: '1vw', backgroundColor: 'white' ,alignItems:"center",paddingLeft:"3px",paddingRight:"3px",padding:"3px"}}>
            <div style={{ position: "relative",display:'flex',margin:"auto",alignItems:"center",justifyContent:"center"}}>
        <span style={{ background: "#BEC2C8", width: "1vh", height: "0.8vh", borderRadius: "50%", display: "inline-block", marginRight: "0.5vh" }}></span>
        <span style={{ fontWeight: "600", color: "#616C6F", fontSize: "1.2vh" }}>Feature Request</span>
    </div>
        </div>
           
           


        </div>

       
    </div>
  )
}


