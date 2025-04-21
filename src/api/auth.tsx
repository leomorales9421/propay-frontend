import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
