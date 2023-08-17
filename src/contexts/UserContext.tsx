import { createContext, useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";

import { AuthResponse, User } from "types";

type UserContextType = {
  loading: boolean;
  hasValidated: boolean;
  user: User | null;
  validateSession: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  hasValidated: false,
  loading: false,
  user: null,
  validateSession: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasValidated, setHasValidated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const controller = useRef<AbortController | null>(null);

  const validateSession = async () => {
    if (controller.current) {
      controller.current.abort();
    } else {
      controller.current = new AbortController();
    }

    setLoading(true);

    const token = window.localStorage.getItem("token");

    try {
      const { data } = await axios.post<AuthResponse>(
        "/api/auth/session",
        { token },
        {
          signal: controller.current.signal,
        },
      );

      if (data?.data?.id) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUser(data.data);
        setLoading(false);
        setHasValidated(true);
        return;
      }

      window.localStorage.removeItem("token");
    } catch (error) {
      console.log("oi1");
      if (error instanceof AxiosError) {
        console.error(error.response?.data?.message);
      }

      // console.error(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(null);
    setLoading(false);
    setHasValidated(true);
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <UserContext.Provider value={{ loading, user: user, validateSession, hasValidated }}>
      {children}
    </UserContext.Provider>
  );
};
