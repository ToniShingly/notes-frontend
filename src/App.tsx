import './App.css'
import { AppShell, rem, Title, Group, Button, Center, Text, Container, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import NotesTable from './components/NotesTable';
import EditNoteModal from './components/EditNoteModal';
import { useState } from 'react';
import type { Note } from './types/note';
import { useNotes } from './hooks/useNotes';
import { noteService } from './services/api';

function App() {
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { data: notes, isLoading, isError, deleteNote, fetchNotes } = useNotes();

  const addOrUpdateNote = async (data: { text: string; deadline: Date | null }) => {
    const payload = {
      text: data.text,
      deadline: data.deadline ? data.deadline.toISOString() : null,
    };

    try {
      if (editingNote) {
        await noteService.updateNote(editingNote.id, payload);
      } else {
        await noteService.createNote(payload);
      }
      fetchNotes();
      handleClose();
    } catch (error) {
      alert('Ошибка при сохранении');
    }
  };

  const handleEdit = (note: Note) => {
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

  if (isError) {
    return (
      <Center h="100vh">
        <Text color="red">Не удалось соединиться с бэкендом. Проверь Rails сервер!</Text>
      </Center>
    );
  }

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
        <Container size="lg">
          <Stack>
            <NotesTable notes={notes} onDelete={deleteNote} onEdit={handleEdit} isLoading={isLoading} />
            <Center>
              <Button variant="default" onClick={handleCreate} loading={isLoading}>
                Добавить заметку
              </Button>
            </Center>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App
