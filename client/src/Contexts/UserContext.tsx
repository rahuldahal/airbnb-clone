import { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export interface User {
  _id: string;
  email: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  ready: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {
    console.log('handle set user here...');
  },
  ready: false,
});

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({
  children,
}: UserContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/user').then(({ data }) => {
        setUser(data.message);
        setReady(true);
      });
    }
  }, [user]);

  const value: UserContextProps = { user, setUser, ready };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
