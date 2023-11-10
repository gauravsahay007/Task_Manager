import React, { createContext, useContext, useState, useEffect } from "react";

import cancel from "../Images/cancel.png";
import done from "../Images/done.png";
import high from "../Images/high.png";
import inprogress from "../Images/inprogress.png";
import low from "../Images/low.png";
import medium from "../Images/medium.png";
import onhold from "../Images/onhold.png";
import urgent from "../Images/urgent.png";
import todo from "../Images/todo.png";
import nopriority from "../Images/nopriority.png";

const statusMap = {
  cancel,
  done,
  high,
  inprogress,
  low,
  medium,
  onhold,
  urgent,
  todo,
  nopriority,
};

const initialValues = {
  userData: {},
  statusMap,
  statusData: {},
  priorityData: {},
};

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, setState] = useState(initialValues);


  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
