import { type Account } from "../interfaces/accounts";
import type { Success, Failure } from "../interfaces/api";

// TODO: implement retry logic

const mapToSuccessModel = (responseData: any): Success<Account> => {
  return {
    status: "success",
    data: {
      accountId: responseData.data.account_id,
      username: responseData.data.username,
      firstName: responseData.data.first_name,
      lastName: responseData.data.last_name,
      status: responseData.data.status,
      createdAt: new Date(responseData.data.created_at),
      updatedAt: new Date(responseData.data.updated_at),
    },
  };
};

const mapToFailureModel = (responseData: any): Failure => {
  return {
    status: "error",
    error: responseData.error,
    message: responseData.message,
  };
};

export const createAccount = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<Success<Account> | Failure> => {
  try {
    const baseUrl = process.env.REACT_APP_OSU_SERVICE_API_URL;
    const response = await fetch(`${baseUrl}/v1/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return {
        status: "error",
        error: (responseData as Failure).error,
        message: (responseData as Failure).message,
      };
    }
    if (responseData.status === "success") {
      return mapToSuccessModel(responseData);
    } else {
      return mapToFailureModel(responseData);
    }
  } catch (error) {
    return {
      status: "error",
      error: "internal_server_error",
      message: "An unhandled error occurred while processing the response.",
    };
  }
};

export const fetchOneAccount = async (
  accountId: string
): Promise<Success<Account> | Failure> => {
  try {
    const baseUrl = process.env.REACT_APP_OSU_SERVICE_API_URL;
    const response = await fetch(`${baseUrl}/v1/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return {
        status: "error",
        error: (responseData as Failure).error,
        message: (responseData as Failure).message,
      };
    }
    if (responseData.status === "success") {
      return mapToSuccessModel(responseData);
    } else {
      return mapToFailureModel(responseData);
    }
  } catch (error) {
    return {
      status: "error",
      error: "internal_server_error",
      message: "An unhandled error occurred while processing the response.",
    };
  }
};

export const fetchManyAccounts = async (page: number, pageSize: number) => {
  try {
    const baseUrl = process.env.REACT_APP_OSU_SERVICE_API_URL;
    const response = await fetch(
      // TODO: can we clean up the query args?
      `${baseUrl}/v1/accounts?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "basic-frontend/v0.0.1",
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.error(
        "An error occurred while processing the response.",
        responseData
      );
      return {
        status: "error",
        error: (responseData as Failure).error,
        message: (responseData as Failure).message,
      };
    }
    if (responseData.status === "success") {
      return {
        status: "success",
        data: responseData.data.accounts.map((account: any) => {
          return {
            accountId: account.account_id,
            username: account.username,
            firstName: account.first_name,
            lastName: account.last_name,
            status: account.status,
            createdAt: new Date(account.created_at),
            updatedAt: new Date(account.updated_at),
          };
        }),
        page: responseData.data.page,
        pageSize: responseData.data.page_size,
        total: responseData.data.total,
      };
    }
    return {
      status: "error",
      error: responseData.error,
    };
  } catch (error) {
    return {
      status: "error",
      error: "internal_server_error",
      message: "An unhandled error occurred while processing the response.",
    };
  }
};
