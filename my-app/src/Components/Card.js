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
    <div style={{
      borderRadius: '6px',
      width: '100%',
      maxWidth: '250px',
      boxShadow: '0 0 5px #7B8788',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      gap: '10px',
      height: 'fit-content',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '600', color: '#616C6F', fontSize: '1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ticket.id}</span>
        <span><ProfilePicture userId={ticket.userId} /></span>
      </div>
      <div style={{
        fontWeight: '600',
        color: 'black',
        fontSize: '0.9em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}>
        <img
          src={getStatusIcon()}
          style={{ width: '1.2em', height: '1.2em', marginRight: '0.5rem' }}
          alt="status-icon"
        />
        {ticket.title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          boxShadow: '0 0 1px #7B8788',
          borderRadius: '4px',
          padding: '0.5rem',
          alignItems: 'center',
        }}>
          <img
            style={{ width: '18px', height: '18px' }}
            src={
              ticket.priority === 0
                ? state.statusMap.nopriority
                : ticket.priority === 1
                ? state.statusMap.low
                : ticket.priority === 2
                ? state.statusMap.medium
                : ticket.priority === 3
                ? state.statusMap.high
                : state.statusMap.urgent
            }
            alt="priority-icon"
          />
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          {ticket.tag.map((element, index) => (
            <div
              key={index}
              style={{
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '0.3rem 0.5rem',
                boxShadow: '0 0 1px #7B8788',
                fontSize: '0.8em',
                fontWeight: '600',
                color: '#616C6F',
              }}>
              {element}
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @media (max-width: 600px) {
            div {
              font-size: 0.8em;
            }
          }
          @media (max-width: 400px) {
            div {
              font-size: 0.7em;
            }
          }
        `}
      </style>
    </div>
  );
}
