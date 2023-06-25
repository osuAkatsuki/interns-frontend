import { type Session } from "../interfaces/sessions";
import type { Success, Failure } from "../interfaces/api";

export const login = async (
  username: string,
  password: string
): Promise<Success<Session> | Failure> => {
  // TODO: real api call with fetch()
  if (username === "cmyui" && password === "yes") {
    return {
      status: "success",
      data: {
        sessionId: "7a3ddd79-d964-42e6-999f-22034a84046a",
        firstName: "Josh",
        lastName: "Smith",
        createdAt: new Date(),
        updatedAt: new Date(),
        expiresAt: new Date(),
      },
      meta: {},
    };
  } else {
    return {
      status: "failure",
      error: "Invalid username or password",
      meta: {},
    };
  }
};
