import axios, { AxiosError } from "axios";
import { useState } from "react";

import { UserInput, RegisterResponse } from "types";

export const useAuthRegister = (): [
  { loading: boolean },
  (input: UserInput) => Promise<RegisterResponse | undefined>,
] => {
  const [loading, setLoading] = useState(false);

  const mutation = async (input: UserInput) => {
    setLoading(true);
    try {
      const { data } = await axios.post<RegisterResponse>("/api/auth/register", input);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message);
      }

      throw error;
    }
  };

  return [{ loading }, mutation];
};
