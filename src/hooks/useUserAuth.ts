import { useContext, useEffect } from "react";
import { UserContext } from "contexts/UserContext";

export const useUserAuth = () => {
  const context = useContext(UserContext);

  useEffect(() => {
    context.validateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return context;
};
