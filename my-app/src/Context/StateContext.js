import { createContext, useContext, useState, useEffect } from "react";

const savedState = JSON.parse(localStorage.getItem("AppState"));

const initialValues = savedState
  ? savedState
  : {
      states: {
        currentGroup: 0,
        currentOrder: 0,
        change: 0,
      },
    };

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [stateGroup, setStateGroup] = useState(initialValues);


  return (
    <StateContext.Provider value={{ stateGroup, setStateGroup }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateGroup = () => {
  return useContext(StateContext);
};

export default StateProvider;
