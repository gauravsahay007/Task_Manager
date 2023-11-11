import React from 'react';
import ProfilePicture from './ProfilePicture';
import { useData } from '../Context/DataProvider';

export default function Card({ ticket }) {
  const { state } = useData();

  const getStatusIcon = () => {
    const statusIcons = {
      Todo: state.statusMap.todo,
      'In progress': state.statusMap.inprogress,
      Done: state.statusMap.done,
      Cancelled: state.statusMap.cancel,
    };

    return statusIcons[ticket.status] || state.statusMap.onhold;
  };

  // console.log(ticket);

  return (
    <div style={{ borderRadius: '6px', width: '17vw', boxShadow: '0 0 5px #7B8788', display: 'flex', flexDirection: 'column', padding: '1.7vh 0.66vw', gap: '5px',height:"fit-content" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: '600', color: '#616C6F', fontSize: '1em' }}>{ticket.id}</span>
        <span><ProfilePicture userId={ticket.userId} /></span>
      </div>
      <div style={{ fontWeight: '600', color: 'black', fontSize: '0.7em', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img src={getStatusIcon()} style={{ width: '1em', height: '1em', margin: '0.25em' }} alt="" />
        {ticket.title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0.4em', gap: '0.1em', alignItems: 'center' }}>

        <div style={{ display:"flex", boxShadow: '0 0 1px #7B8788', borderRadius: '4px', padding: '0.15em' }}>
          <div style={{ borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1em', height: '1em',  }}>
            <span  >
              <img style={{width:"18px", height:"15px"}} src={ticket.priority===0?state.statusMap.nopriority:ticket.priority===1?state.statusMap.low:ticket.priority===2?state.statusMap.medium:ticket.priority==="3"?state.statusMap.high:state.statusMap.urgent} alt="" />
            </span>
          </div>
        </div>
        <div  style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.1em', alignItems: 'center'}}>
        {ticket.tag.map((element, index) => (
          <div key={index} style={{ borderRadius: '4px', display: 'flex', width: 'fit-content', height: '1em', backgroundColor: 'white', alignItems: 'center', padding: '0.15em',marginLeft:"3px" }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: '600', color: '#616C6F', fontSize: '0.7em' }}>{element}</span>
          </div>
        </div>
        ))}
        
        </div>
        

         
          
          

          
       
          
        
      </div>
    </div>
  );
}

