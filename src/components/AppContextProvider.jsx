import { useState, createContext } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <AppContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </AppContext.Provider>
  );
}
