import { useState, createContext } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);

  return (
    <AppContext.Provider
      value={{ searchResults, setSearchResults, openCamera, setOpenCamera }}
    >
      {children}
    </AppContext.Provider>
  );
}
