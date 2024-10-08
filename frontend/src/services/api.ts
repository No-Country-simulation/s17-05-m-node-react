import axios, { InternalAxiosRequestConfig } from "axios";
import { userStore } from "@/context/zustand";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BASE || "http://localhost:3001/api/v0", // url que viene del .env o el local
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { user } = userStore.getState();
  const token = user?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
