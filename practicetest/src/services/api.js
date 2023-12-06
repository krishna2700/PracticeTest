import axios from "axios";

const BASE_URL = "https://stg.dhunjam.in/account/admin";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePrice = async (id, prices) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { amount: prices });
    return response.data;
  } catch (error) {
    throw error;
  }
};
