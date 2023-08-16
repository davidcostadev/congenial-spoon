import axios, { AxiosError } from "axios";
import { useState } from "react";

import { LoginInput, LoginResponse } from "types";

export const useAuthLogin = (): [{ loading: boolean }, (input: LoginInput) => Promise<LoginResponse | undefined>] => {
  const [loading, setLoading] = useState(false);

  const mutation = async (input: LoginInput) => {
    setLoading(true);
    try {
      const { data } = await axios.post<LoginResponse>("/api/auth/login", input);

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
