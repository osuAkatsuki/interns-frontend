import { type Session } from "../interfaces/sessions";
import type { Success, Failure } from "../interfaces/api";

// TODO: implement retry logic

const deserializeSuccessResponse = (responseData: any): Success<Session> => {
  return {
    status: "success",
    data: {
      sessionId: responseData.data.session_id,
      accountId: responseData.data.account_id,
      expiresAt: new Date(responseData.data.expires_at),
      createdAt: new Date(responseData.data.created_at),
      updatedAt: new Date(responseData.data.updated_at),
    },
    meta: {
      page: responseData.meta.page,
      pageSize: responseData.meta.page_size,
      total: responseData.meta.total,
    },
  };
};

const deserializeFailureResponse = (responseData: any): Failure => {
  return {
    status: "error",
    message: responseData.message,
    error: responseData.error,
  };
};

export const login = async (
  username: string,
  password: string
): Promise<Success<Session> | Failure> => {
  try {
    const baseUrl = process.env.REACT_APP_WEBSITE_SESSIONS_SERVICE_API_URL;
    const response = await fetch(`${baseUrl}/v1/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const responseData: Success<Session> | Failure = await response.json();
    if (!response.ok || responseData.status !== "success") {
      console.error("An error occurred while processing the response.", responseData);
      return deserializeFailureResponse(responseData);
    }
    return deserializeSuccessResponse(responseData);
  } catch (error) {
    return {
      status: "error",
      message: "internal_server_error",
      error: "An unhandled error occurred while processing the response.",
    };
  }
};

export const logout = async (sessionId: string): Promise<Success<Session> | Failure> => {
  try {
    const baseUrl = process.env.REACT_APP_WEBSITE_SESSIONS_SERVICE_API_URL;
    const response = await fetch(`${baseUrl}/v1/sessions/${sessionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
    });
    const responseData: Success<Session> | Failure = await response.json();
    if (!response.ok || responseData.status !== "success") {
      console.error("An error occurred while processing the response.", responseData);
      return deserializeFailureResponse(responseData);
    }
    return deserializeSuccessResponse(responseData);
  } catch (error) {
    return {
      status: "error",
      error: "internal_server_error",
      message: "An unhandled error occurred while processing the response.",
    };
  }
};
