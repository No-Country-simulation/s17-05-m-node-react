import { FuntionProps, QueryProps } from "@/types";
import api from "./api";
import createQuerys from "@/utils/createQuerys";


//  User services

export const registerUser = <T>({ body }: FuntionProps<T>) =>
  api.post("/auth/register", body);

export const loginUser = <T>({ body }: FuntionProps<T>) =>
  api.post("/auth/login", body);

export const getUserById = <T>({ url }: FuntionProps<T>) => {
  return api.get(`/data/${url}`);
};

// Clima services

export const getWeatherForecast = async <T>({ querys }: FuntionProps<T>) =>
  await api.get(`/clima/forescast?${createQuerys(querys as QueryProps)}`);

// Campo services

export const getAllCamposByUserId = async <T>({ url }: FuntionProps<T>) =>
  await api.get(`/campo/user/${url}`);

export const getCampoById = async <T>({ url }: FuntionProps<T>) =>
  await api.get(`/campo/${url}`);

export const createCampo = async <T>({ body }: FuntionProps<T>) =>
  await api.post("/campo", body);

export const editCampo = async <T>({ url, body }: FuntionProps<T>) =>
  await api.patch(`/campo/${url}`, body);

// Market services

export const getMarketGrainPrices = async () => await api.get("/market");
export const getExchangeRates = async () => await api.get("/dollar");

// AgroMentro service

export const getAgroMentorRecomendation = async <T>({
  body,
}: FuntionProps<T>) => await api.post("/agroMentor/response", body);

// Generic advice services

export const getShortRecommendation = async <T>({ body }: FuntionProps<T>) =>
  await api.post("/agroMentor/recommendation", body);