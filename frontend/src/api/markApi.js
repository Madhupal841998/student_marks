import axios from 'axios';

const API_URL = 'http://localhost:3000/api/marks';

export const getMarksByStudent = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching marks:', error);
    throw error;
  }
};

export const getMark = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching mark:', error);
    throw error;
  }
};

export const createMark = async (markData) => {
  try {
    const response = await axios.post(API_URL, markData);
    return response.data;
  } catch (error) {
    console.error('Error creating mark:', error);
    throw error;
  }
};

export const updateMark = async (id, markData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, markData);
    return response.data;
  } catch (error) {
    console.error('Error updating mark:', error);
    throw error;
  }
};

export const deleteMark = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting mark:', error);
    throw error;
  }
};