import { getApiEndpoint } from "../api";
import axios from "axios";

export const verifyUserRequest = async () => {
  const apiEndPoint = getApiEndpoint();
  const response = await axios.post(
    `${apiEndPoint}/`,
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};

export const getDataList = async () => {
  const options = {
    method: "GET",
    url: "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars",
    params: { model: "corolla" },
    headers: {
      "X-RapidAPI-Key": "8dd69deabamsh23816a4bfcfb886p1c4eb1jsn0e7c37d10e21",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (values) => {
  const apiEndPoint = getApiEndpoint();
  console.log(apiEndPoint);
  const response = axios.post(
    `${apiEndPoint}/login`,
    {
      email: values.email,
      password: values.password,
    },
    { withCredentials: true }
  );
  return response;
};

export const register = async (values) => {
  const apiEndPoint = getApiEndpoint();
  const response = axios.post(
    `${apiEndPoint}/register`,
    {
      email: values.email,
      password: values.password,
    },
    { withCredentials: true }
  );
  return response;
};
