import { useContext } from "react";
import { UserContext } from "contexts/UserContext";

export const useUserAuth = () => {
  const context = useContext(UserContext);

  return context;
};
