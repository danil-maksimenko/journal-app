import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext({
  userId: null,
  setUserId: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
