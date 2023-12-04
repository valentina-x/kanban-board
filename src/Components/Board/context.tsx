import React, { createContext, useContext, useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

interface TaskType {
  id: string;
  content: string;
}

interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}

interface BoardContextType {
  columns: Record<string, ColumnType>;
  onDragEnd: (result: DropResult) => void;
  activeTasksCount: number;
  completedTasksCount: number;
  backlogTasks: TaskType[];
  updateColumn: (columnId: string, updatedColumn: ColumnType) => void;
  updateBacklogTasks: (updatedBacklogTasks: TaskType[]) => void;
}

interface IBoardProvider {
  children: React.ReactNode;
}

const initialData = {
  'column-1': {
    id: 'column-1',
    title: 'Backlog',
    tasks: [],
  },
  'column-2': {
    id: 'column-2',
    title: 'Ready',
    tasks: [],
  },
  'column-3': {
    id: 'column-3',
    title: 'In Progress',
    tasks: [],
  },
  'column-4': {
    id: 'column-4',
    title: 'Finished',
    tasks: [],
  },
};

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext не может быть использован без BoardProvider');
  }
  return context;
};

const BoardProvider: React.FC<IBoardProvider> = ({ children }) => {
  const [columns, setColumns] = useState<Record<string, ColumnType>>(() => {
    const storedColumns = localStorage.getItem('boardColumns');
    return storedColumns ? JSON.parse(storedColumns) : initialData;
  });
  const [backlogTasks, setBacklogTasks] = useState<TaskType[]>(initialData['column-1'].tasks);
  const [activeTasksCount, setActiveTasksCount] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);

  useEffect(() => {
    const activeCount = columns['column-1'].tasks.length;
    setActiveTasksCount(activeCount);

    const backlogTasks = columns['column-1'].tasks.map((task) => ({
      id: task.id,
      content: task.content,
    }));
    setBacklogTasks(backlogTasks);

    const completedCount = columns['column-4'].tasks.length;
    setCompletedTasksCount(completedCount);

    localStorage.setItem('boardColumns', JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumn: ColumnType = columns[result.source.droppableId];
    const destinationColumn: ColumnType = columns[result.destination.droppableId];

    const [movedTask] = sourceColumn.tasks.splice(result.source.index, 1);
    destinationColumn.tasks.splice(result.destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [sourceColumn.id]: sourceColumn,
      [destinationColumn.id]: destinationColumn,
    });

    setBacklogTasks((prevBacklogTasks) => {
      const updatedBacklogTasks = columns['column-1'].tasks.map((task) => ({
        id: task.id,
        content: task.content,
      }));
      return updatedBacklogTasks;
    });
  };

  const updateColumn = (columnId: string, updatedColumn: ColumnType) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: updatedColumn,
    }));
  };

  const updateBacklogTasks = (updatedBacklogTasks: TaskType[]) => {
    setTimeout(() => {
      setBacklogTasks(updatedBacklogTasks);
    }, 0);
    console.log('в контексте updatedBacklogTasks', updatedBacklogTasks);
    console.log('в контексте backlogTasks', backlogTasks);
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        onDragEnd,
        activeTasksCount,
        completedTasksCount,
        updateColumn,
        backlogTasks,
        updateBacklogTasks,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
