import { type Session } from "../interfaces/sessions";
import type { Success, Failure } from "../interfaces/api";

// TODO: implement retry logic

export const login = async (
  phoneNumber: string,
  password: string
): Promise<Success<Session> | Failure> => {
  const response = await fetch("http://localhost:10000/v1/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "basic-frontend/v0.0.1",
    },
    body: JSON.stringify({ phone_number: phoneNumber, password: password }),
  });
  return await response.json();
};
