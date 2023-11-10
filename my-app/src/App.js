import React,{useState,useEffect} from 'react'
import Header from './Components/Header'
import Section from './Components/Section'
import ProfilePicture from './Components/ProfilePicture'
import Card from './Components/Card'
import ima from "./Images/cancel.png"
import { getData } from './API/main_apicalls'
import { useData } from './Context/DataProvider'
import Group from './Components/Group'


export default function App() {
  const {state,setState} = useData();
  
  const fetchData = async () => {
    try {
      const response = await getData();
      
      if (response) {
        const data = await response;

        const userDataMap = {};
        data.tickets.forEach((ticket)=>{
          const {userId, ...ticketData} = ticket;
          if (!userDataMap[userId]) {
            userDataMap[userId] = {
              user: data.users.find((user) => user.id === userId),
              tickets: [],
            }}
            ticketData.userId=userId;
            userDataMap[userId].tickets.push(ticketData);
        })

        const statusDataMap = {};
        data.tickets.forEach((ticket) => {
          const { status } = ticket;
        
          if (!statusDataMap[status]) {
            statusDataMap[status] = [];
          }

          statusDataMap["Done"] = []
          statusDataMap["Cancelled"] = []
        
          statusDataMap[status].push(ticket);
        });

        const priorityDataMap = {};
        data.tickets.forEach((ticket) => {
          const {priority} = ticket;

          if(!priorityDataMap[priority]) {
            priorityDataMap[priority] = [];
          }

          priorityDataMap[priority].push(ticket);
        })
        
        setState((prevState) => ({
          ...prevState, 
          userData : userDataMap,
          statusData : statusDataMap,
          priorityData : priorityDataMap
        }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  
  
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(state);
  
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <Header/>
      <Group/>
      
    </div>
  )
}
