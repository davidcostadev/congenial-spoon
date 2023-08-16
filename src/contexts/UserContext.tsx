import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { AuthResponse, User } from "types";

type UserContextType = {
  loading: boolean;
  user: User | null;
  validateSession: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  loading: false,
  user: null,
  validateSession: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const validateSession = async () => {
    setLoading(true);

    const token = window.localStorage.getItem("token");
    console.log(token);
    try {
      const { data } = await axios.post<AuthResponse>("/api/auth/session", { token });
      console.log({ data });
      if (data?.data?.id) {
        setUser(data.data);
        setLoading(false);

        return;
      } else {
        setLoading(false);
        setUser(null);
        window.localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return <UserContext.Provider value={{ loading, user: user, validateSession }}>{children}</UserContext.Provider>;
};
