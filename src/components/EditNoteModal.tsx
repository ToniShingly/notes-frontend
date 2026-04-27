import { Modal, Button, Textarea, Stack, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState, useEffect } from 'react';
import type { Note } from '../types/note';

interface EditNoteModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (note: { text: string; deadline: Date | null }) => void;
  initialData: Note | null;
}
export default function EditNoteModal({
  opened,
  onClose,
  onSave,
  initialData,
}: EditNoteModalProps) {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);

  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
      setDeadline(initialData.deadline);
    } else {
      setText('');
      setDeadline(null);
    }
  }, [initialData, opened]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({ text, deadline });
    setText('');
    setDeadline(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Редактировать заметку' : 'Новая заметка'}
      centered
    >
      <Stack gap="md">
        <Textarea
          label="Текст заметки"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          autosize
          minRows={8}
          maxRows={12}
        />
        <DateInput
          label="Дедлайн"
          value={deadline}
          onChange={setDeadline}
          clearable
        />
        <Group justify="center">
          <Button onClick={handleSave}>
            {initialData ? 'Сохранить изменения' : 'Создать'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
