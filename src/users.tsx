import React from "react";
import type { Session } from "./interfaces/sessions";
import type { Account } from "./interfaces/accounts";

interface User {
  session: Session;
  account: Account;
}

export type UserContextType = {
  user: User | null;
  setUser: (session: User | null) => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const userContext = React.useContext(UserContext);
  if (userContext === undefined) {
    throw new Error("useUserContext must be inside a UserContextProvider");
  }
  return userContext;
};

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
