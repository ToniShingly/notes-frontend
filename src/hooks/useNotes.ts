import { useState, useEffect } from 'react';
import type { Note } from '../types/note';
import { noteService } from '../services/api';

export const useNotes = () => {
  const [data, setData] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await noteService.getNotes();
      setData(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id: number) => {
    if (!window.confirm('Удалить заметку?')) return;
    try {
      await noteService.deleteNote(id);
      setData((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      alert('Не удалось удалить');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { data, isLoading, isError, deleteNote, fetchNotes };
};
