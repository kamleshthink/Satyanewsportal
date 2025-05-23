import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getNewsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/news/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 