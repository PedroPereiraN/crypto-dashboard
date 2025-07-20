import axios from "axios";
import { ResponseType } from "axios";

export type Instance = {
  baseURL?: string;
  headers?: {
    authorization?: string;
    accept?: string;
  };
  responseType?: ResponseType;
};

function axiosClientInstance({ baseURL, headers, responseType }: Instance) {
  const api = axios.create({
    baseURL: baseURL,
    responseType: responseType,
  });

  api.interceptors.request.use((config) => {
    config.headers.Authorization = headers?.authorization;
    config.headers.Accept = headers?.accept;

    return config;
  });

  return api;
}

export const geckoClient = axiosClientInstance({
  baseURL: process.env.NEXT_PUBLIC_COINGECKO_API_URL ?? "",
  headers: {
    accept: "application/json",
  },
});

export const appClient = axiosClientInstance({});
