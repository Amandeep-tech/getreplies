import axios, { AxiosRequestConfig, Method } from 'axios';
import { HOST } from './global';

interface CallApiParams {
  url: string;
  method?: Method;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
}

export const callApi = async ({
  url,
  method = 'GET',
  headers = {},
  params = {},
  data = undefined,
}: CallApiParams) => {
  url = `${HOST}${url}`;
  
  console.log(url);
  const baseConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
      ...headers,
    },
    params,
  };
  switch (method) {
    case 'GET':
      return await axios.get(url, baseConfig);
    case 'POST':
      return await axios.post(url, data, baseConfig);
    case 'PUT':
      return await axios.put(url, data, baseConfig);
    case 'DELETE':
      return await axios.delete(url, baseConfig);
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
};
