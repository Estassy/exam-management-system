import axios from 'axios';

const API_URL = "http://localhost:8080/courses";
const token = localStorage.getItem("token");

export const getAllCourses = () => {
  return axios.get(API_URL);
};

export const getCourseById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};


export const createCourse = (course) => {
  return axios.post(API_URL, course, {
  headers: {
        Authorization: `Bearer ${token}`,
      },
   });
};

export const updateCourse = (id, course) => {
  return axios.put(`${API_URL}/${id}`, course);
};

export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getCoursesByStudent = (studentId) => {
  return axios.get(`${API_URL}/student/${studentId}`);
};

export const addStudentToCourse = (courseId, studentId) => {
  return axios.post(`${API_URL}/${courseId}/students/${studentId}`);
};

export const removeStudentFromCourse = (courseId, studentId) => {
  return axios.delete(`${API_URL}/${courseId}/students/${studentId}`);
};
