import React from "react";
import type { Session } from "./interfaces/sessions";
import type { Account } from "./interfaces/accounts";

interface User {
  session: Session;
  account: Account;
}

export type UserContextType = {
  user: User | undefined;
  setUser: (session: User | undefined) => void;
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
  const [user, setUser] = React.useState<User | undefined>(
    (() => {
      const cached = localStorage.getItem("user");
      if (cached) {
        const parsed = JSON.parse(cached) as User;
        if (new Date() >= parsed.session.expiresAt) {
          // value in local storage has expired
          localStorage.removeItem("user");
          return;
        }
        return parsed;
      }
      return undefined;
    })()
  );
  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (value: React.SetStateAction<User | undefined>) => {
          if (value) {
            localStorage.setItem("user", JSON.stringify(value));
          } else {
            localStorage.removeItem("user");
          }
          setUser(value);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
