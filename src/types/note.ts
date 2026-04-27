export type Note = {
  id: number;
  text: string;
  deadline: Date | null;
  created_at: Date;
};

export type ApiNote = Omit<Note, 'deadline' | 'created_at'> & {
  deadline: string | null;
  created_at: string;
};
