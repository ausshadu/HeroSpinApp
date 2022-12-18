import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create();
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.baseURL = 'https://omdbapi.com';
  config.params = {
    apikey: '1f4c93c7' // Store this in .env file
  };
  return config;
});

export function ApiCall(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
  return instance(config);
}

export function randomNumberFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export async function getSavedItem(key: string): Promise<string | null> {
  return await AsyncStorage.getItem(key);
}

export async function setSavedItem(key: string, value: string): Promise<void> {
  return await AsyncStorage.setItem(key, value);
}

export async function clearSavedData(): Promise<void> {
  return await AsyncStorage.clear();
}