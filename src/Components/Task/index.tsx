import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './style.module.scss';

interface TaskType {
  id: string;
  content: string;
}

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <div>
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <div className={`${styles.task}`}>{task.content}</div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Task;
