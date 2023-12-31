import axios, { AxiosError } from "axios";
import { useState } from "react";

import { UserInput, AuthResponse } from "types";

export const useAuthRegister = (): [{ loading: boolean }, (input: UserInput) => Promise<AuthResponse | undefined>] => {
  const [loading, setLoading] = useState(false);

  const mutation = async (input: UserInput) => {
    setLoading(true);
    try {
      const { data } = await axios.post<AuthResponse>("/api/auth/register", input);

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
