import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { Note } from '../App';

interface NotesTableProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NotesTable({ notes, onDelete, onEdit }: NotesTableProps) {
  const columns = useMemo<MRT_ColumnDef<Note>[]>(
    () => [
      {
        accessorKey: 'dateCreated',
        header: 'Дата создания',
        Cell: ({ cell }) => (cell.getValue() as Date).toLocaleDateString(),
      },
      {
        accessorKey: 'text',
        header: 'Текст заметки',
      },
      {
        accessorKey: 'deadline',
        header: 'Дедлайн',
        Cell: ({ cell }) => {
          const val = cell.getValue() as Date | null;
          return val ? val.toLocaleDateString() : '-';
        },
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: notes,
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Действия',
        size: 100,
      },
    },
    renderRowActions: ({ row }) => (
      <Flex gap="xs">
        <Tooltip label="Редактировать">
          <ActionIcon variant="light" color="blue" onClick={() => onEdit(row.original)}>
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Удалить">
          <ActionIcon
            variant="light"
            color="red"
            onClick={() => {
              if (window.confirm('Удалить заметку?')) {
                onDelete(row.original.id);
              }
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