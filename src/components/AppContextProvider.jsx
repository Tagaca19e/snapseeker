import { useState, createContext, useMemo } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = useMemo(() => {
    return {
      searchResults,
      setSearchResults,
      openCamera,
      setOpenCamera,
      isLoading,
      setIsLoading,
      currentUser,
      setCurrentUser,
    };
  }, [searchResults, openCamera, isLoading, currentUser]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
