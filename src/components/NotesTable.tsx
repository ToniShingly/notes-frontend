import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type Note = {
  text: string;
  dateCreated: string;
  deadline: string;
};

const data: Note[] = [
  {
    text: 'Заметка 1',
    dateCreated: '2026-04-20',
    deadline: '2026-04-22',
  },
  {
    text: 'Заметка 2',
    dateCreated: '2026-04-21',
    deadline: '2026-04-25',
  },
  {
    text: 'Заметка 3',
    dateCreated: '2026-04-25',
    deadline: '2026-04-30',
  },
];

export default function NotesTable() {
  const columns = useMemo<MRT_ColumnDef<Note>[]>(
    () => [
      {
        accessorKey: 'dateCreated',
        header: 'Дата создания',
      },
      {
        accessorKey: 'text',
        header: 'Текст заметки',
      },
      {
        accessorKey: 'deadline',
        header: 'Дедлайн',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
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
          <ActionIcon 
            variant="light" 
            color="blue" 
            onClick={() => console.log('Edit', row.original)}
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>
        
        <Tooltip label="Удалить">
          <ActionIcon 
            variant="light" 
            color="red" 
            onClick={() => {
              if (window.confirm('Вы уверены?')) {
                console.log('Delete', row.original);
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