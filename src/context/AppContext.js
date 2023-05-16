import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState('');
  const [loader, setLoader] = useState('');
  const [token, setToken] = useState(false);

  const contextValues = { state, setState, loader, setLoader, token, setToken };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);