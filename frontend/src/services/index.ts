import { FuntionProps, QueryProps } from "@/types";
import api from "./api";
import createQuerys from "@/utils/createQuerys";

// User services
const registerUser = <T>( body : T ) =>
  api.post("/auth/register", body);

const loginUser = <T>({ body }: FuntionProps<T>) =>
  api.post("/auth/login", body);

const getUserById = <T>({ url }: FuntionProps<T>) => {
  return api.get(`/data/${url}`);
};

// Clima services
const getWeatherForecast = async <T>({ querys }: FuntionProps<T>) =>
  await api.get(`/clima/forescast?${createQuerys(querys as QueryProps)}`);

// Campo services
const getAllCamposByUserId = async <T>({ url }: FuntionProps<T>) =>
  await api.get(`/campo/user/${url}`);

const getCampoById = async <T>({ url }: FuntionProps<T>) =>
  await api.get(`/campo/${url}`);

const createCampo = async <T>({ body }: FuntionProps<T>) =>
  await api.post("/campo", body);

const editCampo = async <T>({ url, body }: FuntionProps<T>) =>
  await api.patch(`/campo/${url}`, body);

const deleteCampo = async <T>({ url }: FuntionProps<T>) =>
  await api.delete(`/campo/${url}`);

// Market services
const getMarketGrainPrices = async () => await api.get("/market");
const getExchangeRates = async () => await api.get("/dollar");

// AgroMentro service
const getAgroMentorRecomendation = async <T>({
  body,
}: FuntionProps<T>) => await api.post("/agroMentor/response", body);

// Generic advice services
const getShortRecommendation = async <T>({ body }: FuntionProps<T>) =>
  await api.post("/agroMentor/recommendation", body);

// Default export
 const services = {
  registerUser,
  // loginUser,
  // getUserById,
  // getWeatherForecast,
  // getAllCamposByUserId,
  // getCampoById,
  // createCampo,
  // editCampo,
  // deleteCampo,
  // getMarketGrainPrices,
  // getExchangeRates,
  // getAgroMentorRecomendation,
  // getShortRecommendation,
};

export default services
