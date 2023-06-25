import { type Session } from "../interfaces/sessions";
import type { Success, Failure } from "../interfaces/api";

// TODO: implement retry logic

const mapToSuccessModel = (responseData: any): Success<Session> => {
  return {
    status: "success",
    data: {
      sessionId: responseData.data.session_id,
      accountId: responseData.data.account_id,
      expiresAt: new Date(responseData.data.expires_at),
      createdAt: new Date(responseData.data.created_at),
      updatedAt: new Date(responseData.data.updated_at),
    },
  };
};

const mapToFailureModel = (responseData: any): Failure => {
  return {
    status: "error",
    error: responseData.error,
  };
};

export const login = async (
  username: string,
  password: string
): Promise<Success<Session> | Failure> => {
  try {
    const response = await fetch("http://localhost:10000/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (!response.ok) {
      console.error(
        "An error occurred while processing the response.",
        await response.text()
      );
      return {
        status: "error",
        error: "An error occurred while processing the response.",
      };
    }
    const responseData = await response.json();
    if (responseData.status === "success") {
      return mapToSuccessModel(responseData);
    } else {
      return mapToFailureModel(responseData);
    }
  } catch (error) {
    return {
      status: "error",
      error: "An unhandled error occurred while processing the response.",
    };
  }
};
