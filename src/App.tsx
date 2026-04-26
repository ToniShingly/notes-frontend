import './App.css'
import { AppShell, rem, Title, Group, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import NotesTable from './components/NotesTable';
import EditNoteModal from './components/EditNoteModal';
import { useState } from 'react';

export type Note = {
  id: string;
  text: string;
  dateCreated: Date;
  deadline: Date | null;
};

function App() {
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      text: 'Заметка 1',
      dateCreated: new Date(),
      deadline: new Date(new Date().getTime() + 86400000),
    },
  ]);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const addOrUpdateNote = (data: { text: string; deadline: Date | null }) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingNote.id ? { ...n, ...data } : n))
      );
    } else {
      const newNote: Note = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        dateCreated: new Date(),
      };
      setNotes((prev) => [...prev, newNote]);
    }
    handleClose();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(null);
    setEditingNote(note);
    open();
  };

  const handleCreate = () => {
    setEditingNote(null);
    open();
  };

  const handleClose = () => {
    close();
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppShell
      header={{ height: 60, offset: false }}
      padding="md"
    >
      <EditNoteModal
        opened={modalOpened}
        onClose={handleClose}
        onSave={addOrUpdateNote}
        initialData={editingNote}
      />
      <AppShell.Header>
        <Group h="100%" justify="center">
          <Title order={1}>Заметки</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main
        pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
      >
        <NotesTable notes={notes} onDelete={deleteNote} onEdit={handleEdit} />
        
        <Button variant="default" onClick={handleCreate} mt="md">
          Добавить заметку
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}

export default App
