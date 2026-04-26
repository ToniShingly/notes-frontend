import './App.css'
import { AppShell, rem, Title, Group } from '@mantine/core'
import NotesTable from './components/NotesTable';

function App() {
  return (
    <AppShell
      header={{ height: 60, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="center">
          <Title order={1}>Заметки</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main
        pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
      >
        <NotesTable />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
