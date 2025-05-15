import * as React from "react";
import { UserData } from "./api/auth";

export interface Session {
  user: UserData;
}

interface SessionContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  loading: boolean;
}

const SessionContext = React.createContext<SessionContextType>({
  session: null,
  setSession: () => {},
  loading: true,
});

export default SessionContext;

export const useSession = () => React.useContext(SessionContext);
