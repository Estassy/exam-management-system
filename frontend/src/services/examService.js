import axios from "axios";

const API_URL = "http://localhost:8080/api/exams"; // Mets l'URL de ton backend

const getAllExams = () => axios.get(API_URL);
const getExamById = (id) => axios.get(`${API_URL}/${id}`);
const createExam = (examData) => axios.post(API_URL, examData);
const updateExam = (id, examData) => axios.put(`${API_URL}/${id}`, examData);
const deleteExam = (id) => axios.delete(`${API_URL}/${id}`);

export default { getAllExams, getExamById, createExam, updateExam, deleteExam };
