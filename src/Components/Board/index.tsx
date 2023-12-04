import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useBoardContext } from './context';
import Column from '../Column';
import styles from './style.module.scss';

const Board: React.FC = () => {
  const { columns, onDragEnd } = useBoardContext();

  return (
    <div className={styles.board}>
      <div className={styles.board__wrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(columns).map((column) => (
            <Column column={column} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
