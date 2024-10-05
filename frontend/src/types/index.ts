// services Types

import useFetchData from "@/hooks/useFetchData";

export interface QueryProps {
  [key: string]: string;
}

export interface FuntionProps<T> {
  url?: string | number;
  querys?: QueryProps;
  body?: T;
}

// Loader types

export interface LoadStateI {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

// Store Types

interface UserTypes {
  user: { id: string, firstName: string, lastName: string, email: string };
  token: string;
}
export interface Campo {
  id: number;
  userId: number;
  name: string;
  latitude: string;
  longitude: string;
  size: number;
  workersAmount: number;
  mainCrop: string;
  weatherType: string;
  administration: string;
  season: string;
  updatedAt: string; // ISO date format
  createdAt: string; // ISO date format
}

export interface UserStoreProps {
  user: UserTypes | null;
  fields: Campo[];
  setUser: (user: UserTypes) => void;
  setFields: (fiels: Campo[]) => void;
  deleteField: (id: number) => void;
  closeSesion: () => void;
  addField: (fiel: Campo) => void;
  editField: (fiel: Campo) => void;
}

// useFetchData types

export interface EditCampoTypes {url: string, body: {
  userId: string,
  name: string,
  latitude: string,
  longitude: string,
  size: string,
  workersAmount: string,
  mainCrop: string,
  weatherType: string,
  administration: string,
  season: string,
}}

interface CreateCampoTypes {
  userId?: string,
  name: String,
  latitude: number,
  longitude: number,
  size: number,
  workersAmount: number,
  mainCrop: string,
  weatherType: string,
  administration: string,
  season: string,
}

export interface ServiceTypes {
  registerUser: { firstName: string, lastName: string, email: string, password: string }
  loginUser: { email: string, password: string },
  getUserById: string, 
  getWeatherForecast: Record<string,string>,
  getAllCamposByUserId: string,
  getCampoById:string,
  createCampo: CreateCampoTypes
  // editCampo: EditCampoTypes
  deleteCampo: number
  getMarketGrainPrices:  null,
  getExchangeRates: null,
  getAgroMentorRecomendation: {question: string, field?: Campo},
  // getShortRecommendation:
}