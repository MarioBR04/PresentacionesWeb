import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getWeatherByCity = async (city) => {
  const encodedCity = encodeURIComponent(city);
  return await api.get(`/weather/${encodedCity}`);
};
