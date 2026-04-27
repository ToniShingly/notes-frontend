import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Flex, Tooltip, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { Note } from '../types/note';

interface NotesTableProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  isLoading: boolean;
}

export default function NotesTable({
  notes,
  onDelete,
  onEdit,
  isLoading,
}: NotesTableProps) {
  const columns = useMemo<MRT_ColumnDef<Note>[]>(
    () => [
      {
        accessorKey: 'created_at',
        header: 'Дата создания',
        size: 100,
        grow: 1,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return date ? new Date(date).toLocaleDateString() : '-';
        },
      },
      {
        accessorKey: 'text',
        header: 'Текст заметки',
        size: 300,
        grow: 3,
        Cell: ({ cell }) => {
          const content = cell.getValue<string>() || '';
          return (
            <Text size="sm" truncate="end">
              {content}
            </Text>
          );
        },
      },
      {
        accessorKey: 'deadline',
        header: 'Дедлайн',
        size: 100,
        grow: 1,
        Cell: ({ cell }) => {
          const val = cell.getValue<string>();
          return val ? new Date(val).toLocaleDateString() : '-';
        },
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: notes,
    state: { isLoading },
    layoutMode: 'grid',
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Действия',
        size: 100,
        grow: 1,
      },
    },
    renderRowActions: ({ row }) => (
      <Flex gap="xs">
        <Tooltip label="Редактировать">
          <ActionIcon
            variant="light"
            color="blue"
            onClick={() => onEdit(row.original)}
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Удалить">
          <ActionIcon
            variant="light"
            color="red"
            onClick={() => {
              onDelete(row.original.id);
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    mantineTableProps: {
      striped: 'even',
    },
  });

  return <MantineReactTable table={table} />;
}
