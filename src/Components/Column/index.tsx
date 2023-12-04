import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task';
import styles from './style.module.scss';
import { useBoardContext } from '../Board/context';
import Dropdown from '../Dropdown';
import { Link } from 'react-router-dom';

interface TaskType {
  id: string;
  content: string;
}

interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { updateColumn, columns } = useBoardContext();
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [newTaskContent, setNewTaskContent] = useState<string>('');

  const handleAddCardClick = () => {
    setIsAddingTask(true);
  };

  const handleCancelAddCard = () => {
    setIsAddingTask(false);
    setNewTaskContent('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(e.target.value);
  };

  const handleAddTask = () => {
    if (newTaskContent.trim() !== '') {
      const newTaskId = `task-${Date.now()}`;
      const newTask: TaskType = { id: newTaskId, content: newTaskContent };
      const updatedColumn = { ...column, tasks: [...column.tasks, newTask] };
      updateColumn(column.id, updatedColumn);
      setIsAddingTask(false);
      setNewTaskContent('');
    }
  };

  return (
    <>
      <Droppable key={column.id} droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={styles.column}>
            <div className={styles.column__title}>{column.title}</div>
            <div className={styles.column__tasks}>
              {column.tasks.map((task, index) => (
                <Link to={`/tasks/${task.id}`} key={task.id} style={{ textDecoration: 'none' }}>
                  <Task task={task} index={index} />
                </Link>
              ))}
              {column.id === 'column-1' && isAddingTask ? (
                <div className={`${styles.column__addinput}`}>
                  <input
                    type='text'
                    value={newTaskContent}
                    onChange={handleInputChange}
                    placeholder='Enter the task text..'
                  />
                  <button
                    onClick={handleAddTask}
                    className={`${styles.column__btn} ${styles.column__btn_blue}`}
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCancelAddCard}
                    className={`${styles.column__btn} ${styles.column__btn_blue}`}
                  >
                    Cancel
                  </button>
                </div>
              ) : column.id === 'column-2' &&
                columns['column-1'].tasks.length > 0 &&
                isAddingTask ? (
                <Dropdown
                  options={columns['column-1'].tasks}
                  column={column}
                  prevcolumn={'column-1'}
                />
              ) : column.id === 'column-3' &&
                columns['column-2'].tasks.length > 0 &&
                isAddingTask ? (
                <Dropdown
                  options={columns['column-2'].tasks}
                  column={column}
                  prevcolumn={'column-2'}
                />
              ) : column.id === 'column-4' &&
                columns['column-3'].tasks.length > 0 &&
                isAddingTask ? (
                <Dropdown
                  options={columns['column-3'].tasks}
                  column={column}
                  prevcolumn={'column-3'}
                />
              ) : (
                <button
                  onClick={handleAddCardClick}
                  className={`${styles.column__btn} ${styles.column__btn_addbtn}`}
                  disabled={
                    column.id === 'column-1'
                      ? false
                      : column.id === 'column-2' && columns['column-1'].tasks.length === 0
                      ? true
                      : column.id === 'column-3' && columns['column-2'].tasks.length === 0
                      ? true
                      : column.id === 'column-4' && columns['column-3'].tasks.length === 0
                      ? true
                      : false
                  }
                >
                  + Add card
                </button>
              )}
              {provided.placeholder}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
