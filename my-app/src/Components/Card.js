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

  return (
    <div style={{ borderRadius: '6px', width: '17vw', boxShadow: '0 0 5px #7B8788', display: 'flex', flexDirection: 'column', padding: '1.7vh 0.66vw', gap: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: '600', color: '#616C6F', fontSize: '1em' }}>{ticket.id}</span>
        <span><ProfilePicture userId={ticket.userId} /></span>
      </div>
      <div style={{ fontWeight: '600', color: 'black', fontSize: '0.7em', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img src={getStatusIcon()} style={{ width: '1em', height: '1em', margin: '0.25em' }} alt="" />
        {ticket.title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0.4em', gap: '0.1em', alignItems: 'center' }}>
        <div style={{ boxShadow: '0 0 1px #7B8788', borderRadius: '4px', padding: '0.15em' }}>
          <div style={{ borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1em', height: '1em', backgroundColor: '#6b6f76' }}>
            <span style={{ fontSize: '0.6em', color: 'white', textAlign: 'center' }} className="material-symbols-outlined">
              priority_high
            </span>
          </div>
        </div>
        <div style={{ borderRadius: '4px', display: 'flex', width: 'fit-content', height: '1em', backgroundColor: 'white', alignItems: 'center', padding: '0.15em' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ background: '#BEC2C8', width: '0.5em', height: '0.4em', borderRadius: '50%', display: 'inline-block', marginRight: '0.25em' }}></span>
            <span style={{ fontWeight: '600', color: '#616C6F', fontSize: '0.7em' }}>Feature Request</span>
          </div>
        </div>
      </div>
    </div>
  );
}
