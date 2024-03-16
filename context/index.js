"use client";

import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);
const Context = ({ children }) => {
  const [appState, setAppState] = useState([]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
