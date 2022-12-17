import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create();
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.baseURL = 'https://omdbapi.com';
  config.params = {
    apikey: '1f4c93c7'
  };
  return config;
});

export function ApiCall(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
  return instance(config);
}

export function randomNumberFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}