import React from 'react';
import User from '../Images/user.png';
import { useData } from '../Context/DataProvider';

export default function ProfilePicture({ pic, userId }) {
  const { state } = useData();

  return (
    <div style={{ position: 'relative', width: '1.3vw', height: '2.7vh' }}>
      <div style={{ borderRadius: '100%', width: '100%', height: '100%', position: 'relative', zIndex: '0' }}>
        <img src={pic || User} style={{ width: '100%', height: '100%' }} alt="" />
        <div
          style={{
            position: 'relative',
            bottom: '1.7vh',
            left: '0.8vw',
            backgroundColor: !userId ? '#E3E5E7' : state.userData[userId]?.user.available ? '#E4B102' : '#E3E5E7',
            borderRadius: '100%',
            width: '40%',
            height: '40%',
            zIndex: '1',
            border: '1px solid #F4F5F8',
          }}
        ></div>
      </div>
    </div>
  );
}
