import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { AuthResponse, User } from "types";

type UserContextType = {
  loading: boolean;
  initialCheck: boolean;
  user: User | null;
  validateSession: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  initialCheck: false,
  loading: false,
  user: null,
  validateSession: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialCheck, setInitialCheck] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const validateSession = async () => {
    setLoading(true);

    const token = window.localStorage.getItem("token");

    try {
      const { data } = await axios.post<AuthResponse>("/api/auth/session", { token });

      if (data?.data?.id) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUser(data.data);
        setLoading(false);
        setInitialCheck(true);
        return;
      } else {
        setLoading(false);
        setUser(null);
        window.localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      setUser(null);
      setInitialCheck(true);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <UserContext.Provider value={{ loading, user: user, validateSession, initialCheck }}>
      {children}
    </UserContext.Provider>
  );
};
