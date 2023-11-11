import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Group from './Components/Group';
import { getData } from './API/main_apicalls';
import { useData } from './Context/DataProvider';


var rootStyle = {
  backgroundColor : 'green',
  color : 'white',
  height : '100%'

}

export default function App() {
  const { state, setState } = useData();

  const fetchData = async () => {
    try {
      const response = await getData();

      if (response) {
        const data = await response;
        const { tickets, users } = data;

        const userDataMap = processUserData(tickets, users);
        const statusDataMap = processStatusData(tickets);
        const priorityDataMap = processPriorityData(tickets);

        setState((prevState) => ({
          ...prevState,
          userData: userDataMap,
          statusData: statusDataMap,
          priorityData: priorityDataMap,
        }));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const processUserData = (tickets, users) => {
    const userDataMap = {};

    tickets.forEach((ticket) => {
      const { userId, ...ticketData } = ticket;

      if (!userDataMap[userId]) {
        userDataMap[userId] = {
          user: users.find((user) => user.id === userId),
          tickets: [],
        };
      }

      ticketData.userId = userId;
      userDataMap[userId].tickets.push(ticketData);
    });

    return userDataMap;
  };

  const processStatusData = (tickets) => {
    const statusDataMap = {};

    tickets.forEach((ticket) => {
      const { status } = ticket;

      if (!statusDataMap[status]) {
        statusDataMap[status] = [];
      }

      statusDataMap['Done'] = [];
      statusDataMap['Cancelled'] = [];

      statusDataMap[status].push(ticket);
    });

    return statusDataMap;
  };

  const processPriorityData = (tickets) => {
    const priorityDataMap = {};

    tickets.forEach((ticket) => {
      const { priority } = ticket;

      if (!priorityDataMap[priority]) {
        priorityDataMap[priority] = [];
      }

      priorityDataMap[priority].push(ticket);
    });

    return priorityDataMap;
  };

  useEffect(() => {
    fetchData();
  }, []);
 

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Group />
    </div>
  );
}
