import axios from 'axios';
import type { Note, ApiNote } from '../types/note';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

const mapNoteFromApi = (raw: ApiNote): Note => ({
  ...raw,
  deadline: raw.deadline ? new Date(raw.deadline) : null,
  created_at: new Date(raw.created_at),
});

export const noteService = {
  getNotes: async () => {
    const response = await apiClient.get<ApiNote[]>('/notes');
    return response.data.map(mapNoteFromApi);
  },

  createNote: async (data: { text: string; deadline: string | null }) => {
    const response = await apiClient.post<ApiNote>('/notes', data);
    return mapNoteFromApi(response.data);
  },

  updateNote: async (
    id: number,
    data: { text: string; deadline: string | null },
  ) => {
    const response = await apiClient.patch<ApiNote>(`/notes/${id}`, data);
    return mapNoteFromApi(response.data);
  },

  deleteNote: (id: number) => apiClient.delete(`/notes/${id}`),
};
