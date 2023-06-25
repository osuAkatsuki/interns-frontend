import React from "react";
import type { Session } from "./interfaces/sessions";

export type SessionContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  // setSession: (session: Session | null) => void;
};

export const SessionContext = React.createContext<
  SessionContextType | undefined
>(undefined);

export const useSessionContext = () => {
  const sessionContext = React.useContext(SessionContext);
  if (sessionContext === undefined) {
    throw new Error(
      "useSessionContext must be inside a SessionContextProvider"
    );
  }
  return sessionContext;
};

interface Props {
  children: React.ReactNode;
}

export const SessionContextProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = React.useState<Session | null>(null);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
