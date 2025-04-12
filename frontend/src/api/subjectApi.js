import axios from 'axios';

const API_URL = 'http://localhost:3000/api/subjects';

export const getSubjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const getSubject = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subject:', error);
    throw error;
  }
};

export const createSubject = async (subjectData) => {
  try {
    const response = await axios.post(API_URL, subjectData);
    return response.data;
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
};

export const updateSubject = async (id, subjectData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, subjectData);
    return response.data;
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
};