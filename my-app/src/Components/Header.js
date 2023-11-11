import React, { useState, useEffect } from 'react';
import header from "../Styles/Header.module.css";
import { useStateGroup } from '../Context/StateContext';

export default function Header() {
  const { stateGroup, setStateGroup } = useStateGroup();
  console.log(stateGroup);
  const AppState = JSON.parse(localStorage.getItem("AppState"));
  const [currentGroup, setCurrentGroup] = useState(stateGroup.states.currentGroup);
  const [currentOrder, setCurrentOrder] = useState(stateGroup.states.currentOrder);
  const [currentState, setCurrentState] = useState({
    currentGroup: stateGroup.states.currentGroup,
    currentOrder: stateGroup.states.currentOrder,
    change: stateGroup.states.change,
    index1: AppState ? AppState.states.currentGroup : 0,
    index2: AppState ? AppState.states.currentOrder : 0
  });

  const [reload, setReload] = useState(0);

  const handleClick = (indexNumber, changeNumber) => {
    if (changeNumber === 0) setCurrentState({ ...currentState, index1: indexNumber, change: changeNumber });
    if (changeNumber === 1) setCurrentState({ ...currentState, index2: indexNumber, change: changeNumber });
  };
 
  useEffect(() => {
    if (currentState.change === 0) {
      setCurrentGroup(currentState.index1);
      setStateGroup((prevState) => ({
        ...prevState,
        states: {
          ...prevState.states,
          currentGroup: currentState.index1,
          change: currentState.change,
       
        },
      }));
    }
    if (currentState.change === 1) {
      setCurrentOrder(currentState.index2);
      setStateGroup((prevState) => ({
        ...prevState,
        states: {
          ...prevState.states,
          currentOrder: currentState.index2,
          change: currentState.change,
     
        },
      }));
    }

    if (reload < 1) setReload(1);
  }, [currentState]);

  useEffect(() => {
    localStorage.setItem("AppState", JSON.stringify(stateGroup));
    setReload(0);
  }, [reload]);

  const GroupName = () => {
    if (currentState.change === 0) {
      return currentState.index1 === 0 ? "Status" : currentState.index1 === 1 ? "User" : "Priority";
    }
    return stateGroup.states.currentGroup === 0 ? "Status" : stateGroup.states.currentGroup === 1 ? "User" : "Priority";
  };

  const OrderName = () => {
    if (currentState.change === 1) return currentState.index2 === 0 ? "Priority" : "Title";
    return stateGroup.states.currentOrder === 0 ? "Priority" : "Title";
  };

  return (
    <div style={{ height: "7vh", display: "flex", alignItems: "center", paddingLeft: "3.98vw",backgroundColor:"white" }} >
      <div className={header.dropdown}>

        <button className={header.dropbtn} style={{ borderRadius: "4px", width: "fit-content", textAlign: "center", display: "flex", justifyContent: "center", justifyItems: "center", textAlign: "center", padding: "0.5em", gap: "0.5em", border: "1px", backgroundColor: "white", boxShadow: "0 0 5px #7B8788", alignItems: "center" }} >
          <span style={{ color: "#A1A1A1", fontSize: "2vh" }} class="material-symbols-outlined">
            tune
          </span>
          <span style={{ fontWeight: "600", color: "#616C6F", fontSize: "1.8vh" }}>Display</span>
          <span style={{ color: "#7B8788", fontSize: "2vh" }} class="material-symbols-outlined">
            arrow_drop_down
          </span>
        </button>
        <div className={header.dropdowncontent}>
          <div style={{ padding: "1em", color: "#616C6F", fontSize: "2vh", display: "flex", justifyContent: "space-between", gap: "2.5em" }}>
            <span style={{ fontWeight: "600" }}>Grouping</span>
            <div className={header.dropdown2} style={{ borderRadius: "4px", backgroundColor: "white", width: "6em", border: "2px solid #E0E0E0", display: "flex" }} >
              <span style={{ margin: "auto", display: "block", fontWeight: "600", fontSize: "1em" }}>{GroupName()}</span>
              <span style={{ color: "#7B8788", fontSize: "3vh" }} class="material-symbols-outlined">
                arrow_drop_down
              </span>
              <div className={header.dropdown2item}>
                <button className={header.dropdowncontent2} onClick={() => { handleClick(0, 0); }} style={{ fontSize: "1em" }}> Status </button>
                <button className={header.dropdowncontent2} onClick={() => { handleClick(1, 0); }} style={{ fontSize: "1em" }}> User </button>
                <button className={header.dropdowncontent2} onClick={() => { handleClick(2, 0); }} style={{ fontSize: "1em" }}> Priority </button>
              </div>
            </div>
          </div>
          <div style={{ padding: "1em", color: "#616C6F", fontSize: "2vh", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "600" }}>Ordering</span>
            <div className={header.dropdown2} style={{ borderRadius: "4px", backgroundColor: "white", width: "6em", border: "2px solid #E0E0E0", display: "flex" }} >
              <span style={{ margin: "auto", display: "block", fontWeight: "600", fontSize: "1em" }}>{OrderName()}</span>
              <span style={{ color: "#7B8788", fontSize: "3vh" }} class="material-symbols-outlined">
                arrow_drop_down
              </span>
              <div className={header.dropdown2item}>
                <button className={header.dropdowncontent2} onClick={() => { handleClick(0, 1); }} style={{ fontSize: "1em" }}> Priority </button>
                <button className={header.dropdowncontent2} onClick={() => { handleClick(1, 1); }} style={{ fontSize: "1em" }}> Title </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
