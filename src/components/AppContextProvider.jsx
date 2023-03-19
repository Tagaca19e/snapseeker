import { useState, createContext } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);

  return (
    <AppContext.Provider
      value={{
        searchResults,
        setSearchResults,
        openCamera,
        setOpenCamera,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
