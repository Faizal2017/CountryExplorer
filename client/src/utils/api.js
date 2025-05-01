import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// Fetch all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch countries");
  }
};

// Search countries by name
export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to search countries");
  }
};

// Filter countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch countries by region");
  }
};

// Get country details by code
export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data[0];
  } catch (err) {
    throw new Error("Failed to fetch country details");
  }
};