import axios, { AxiosError } from "axios";
import { useState } from "react";

import { LoginInput, AuthResponse } from "types";

export const useAuthLogin = (): [{ loading: boolean }, (input: LoginInput) => Promise<AuthResponse | undefined>] => {
  const [loading, setLoading] = useState(false);

  const mutation = async (input: LoginInput) => {
    setLoading(true);
    try {
      const { data } = await axios.post<AuthResponse>("/api/auth/login", input);

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
