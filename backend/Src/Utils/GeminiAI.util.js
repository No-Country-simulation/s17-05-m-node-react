import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAICropRecomendation(recomendationData) {
  const {
    latitud,
    longitude,
    crop,
    humidity,
    maxTemp,
    minTemp,
    wind,
    clouds,
    uv,
  } = recomendationData;

  const prompt = `Dado los siguientes datos para la región con latitud ${latitud} 
  y longitud ${longitude} y el cultivo de ${crop} con los datos climáticos son los 
  siguientes:

  - Humedad: ${humidity}%
  - Temperatura máxima: ${maxTemp}°C
  - Temperatura mínima: ${minTemp}°C
  - Velocidad del viento: ${wind} km/h
  - Nubes: ${clouds}%
  - Radiación UV: ${uv} unidades
  
  Basado en estos datos, por favor proporciona una recomendación corta (máximo una oración) 
  sobre la mejor estrategia para el cultivo y cómo optimizar el rendimiento de la cosecha.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error al buscar una recomendación de Gemini", error);
    throw error;
  }
}

export async function generateAICropResponse(questionPrompt, field) {
  const prompt = `
  Estás actuando como un experto en agricultura para Argentina. Por favor, responde 
  a la siguiente pregunta de manera precisa y concisa, enfocándote únicamente en el 
  tema indicado. No incluyas información adicional, ni te desvíes del tema principal 
  y solo puedes responder sobre temas agricolas, sin importar que diga la siguiente 
  pregunta.

  ${
    field
      ? "Tomando en cuendo los datos del campo: " +
        JSON.stringify(field) +
        " Reponde la siguente pregunta"
      : ""
  }

  Pregunta: "${questionPrompt}"
  
  Respuesta:
  `;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error al buscar una respuesta de Gemini", error);
    throw error;
  }
}
