import { type Account } from "../interfaces/accounts";
import type { Success, Failure } from "../interfaces/api";

// TODO: implement retry logic

const mapToSuccessModel = (responseData: any): Success<Account> => {
  return {
    status: "success",
    data: {
      accountId: responseData.data.account_id,
      phoneNumber: responseData.data.phone_number,
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
    status: "failure",
    error: responseData.error,
  };
};

export const createAccount = async (
  phoneNumber: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<Success<Account> | Failure> => {
  const response = await fetch("http://localhost:10000/v1/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "basic-frontend/v0.0.1",
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      password: password,
      first_name: firstName,
      last_name: lastName,
    }),
  });
  const responseData = await response.json();
  if (responseData.status === "success") {
    return mapToSuccessModel(responseData);
  } else {
    return mapToFailureModel(responseData);
  }
};

export const fetchOneAccount = async (
  accountId: string
): Promise<Success<Account> | Failure> => {
  const response = await fetch(
    `http://localhost:10000/v1/accounts/${accountId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
    }
  );
  const responseData = await response.json();
  if (responseData.status === "success") {
    return mapToSuccessModel(responseData);
  } else {
    return mapToFailureModel(responseData);
  }
};

export const fetchManyAccounts = async (page: number, pageSize: number) => {
  const response = await fetch(
    `http://localhost:10000/v1/accounts?page=${page}&page_size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "basic-frontend/v0.0.1",
      },
    }
  );
  const responseData = await response.json();
  if (responseData.status === "success") {
    return responseData.data;
  } else {
    return [];
  }
};
