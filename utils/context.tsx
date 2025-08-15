"use client";

import React from "react";

export const GlobalContext = React.createContext({
  mediaPopUpBool: false,
  setMediaPopUpBool: (_b: boolean) => { },
  taskPopUpBool: false,
  setTaskPopUpBool: (_t: boolean) => { }
});

export const GlobalProvider = ({ children }: any) => {
  const [mediaPopUpBool, setMediaPopUpBool] = React.useState(false);
  const [taskPopUpBool, setTaskPopUpBool] = React.useState(false);

  return (
    <GlobalContext.Provider value={{ mediaPopUpBool, setMediaPopUpBool, taskPopUpBool, setTaskPopUpBool }}>
      {children}
    </GlobalContext.Provider>
  );
};
