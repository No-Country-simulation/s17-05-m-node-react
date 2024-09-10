// services Types

export interface QueryProps {
  [key: string]: string;
}

export interface FuntionProps<T> {
  url?: string;
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
  user: { id: string };
  token: string;
}
interface Campo {
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
  addField: (fiel: Campo) => void;
}

// validation rules Types

export interface ValidationRuleI {
  field: string;
  condition: boolean;
  message: string;
}
