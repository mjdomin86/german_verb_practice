import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Verb API calls
export const verbService = {
  getAllVerbs: () => api.get('/verbs'),
  getAllVerbsRandomized: () => api.get('/verbs/random'),
  getVerbById: (id) => api.get(`/verbs/${id}`),
  createVerb: (verb) => api.post('/verbs', verb),
  updateVerb: (id, verb) => api.put(`/verbs/${id}`, verb),
  deleteVerb: (id) => api.delete(`/verbs/${id}`),
};

// Practice API calls
export const practiceService = {
  checkAnswer: (answer) => api.post('/practice/check', answer),
  savePracticeSession: (totalQuestions, correctAnswers) => 
    api.post('/practice/session', null, { 
      params: { totalQuestions, correctAnswers } 
    }),
  getRecentSessions: (days = 7) => 
    api.get('/practice/sessions', { params: { days } }),
  getAverageScore: () => api.get('/practice/average-score'),
};

export default api;