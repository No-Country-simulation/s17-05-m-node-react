import z from "zod";
import { parseValidationResult } from "../../Utils/parseData.js";

const campoSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1).max(255),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  size: z.number().int().positive().max(100000),
  workersAmount: z.number().int().positive().max(10000),
  mainCrop: z.enum([
    "Soja",
    "Maíz",
    "Trigo",
    "Girasol",
    "Cebada",
    "Avena",
    "Sorgo",
    "Arroz",
    "Maní",
    "Lino",
    "Algodón",
    "Caña de azúcar",
    "Tabaco",
    "Uva (vinícola)",
    "Uva (consumo)",
    "Papa",
    "Batata",
    "Cebolla",
    "Zanahoria",
    "Tomate",
    "Zapallo",
    "Frutilla",
    "Durazno",
    "Naranja",
    "Limón",
    "Pomelo",
    "Mandarina",
    "Olivo",
    "Manzana",
    "Pera",
    "Arándano",
    "Kiwi",
    "Chía",
    "Quinoa",
    "Cártamo",
    "Pimientos",
  ]),
  weatherType: z.enum([
    "Cálido y Húmedo",
    "Cálido y Seco",
    "Templado",
    "Frío y Seco",
    "Frío y Húmedo",
    "Montañoso",
    "Mediterráneo",
    "Otro",
  ]),
  administration: z.enum(["Propietario", "Alquilado"]),
  season: z.string().min(1).max(255),
});

export const validateCampo = (data) => {
  const result = campoSchema.safeParse(data);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateUpdateCampo = (data) => {
  const result = campoSchema.partial().safeParse(data);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
