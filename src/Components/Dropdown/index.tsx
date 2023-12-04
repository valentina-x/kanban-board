import React, { ChangeEvent, useState } from 'react';
import styles from '../Dropdown/style.module.scss';
import { useBoardContext } from '../Board/context';

interface TaskType {
  id: string;
  content: string;
}

interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}

interface DropdownProps {
  options: TaskType[];
  column: ColumnType;
  prevcolumn: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, column, prevcolumn }) => {
  const { updateColumn, updateBacklogTasks, columns } = useBoardContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedTask = options.find((task) => task.id === selectedValue);

    if (selectedTask) {
      const updatedBacklogTasks = options.filter((task) => task.id !== selectedValue);
      updateBacklogTasks(updatedBacklogTasks);

      const updatedColumn = { ...column, tasks: [...column.tasks, selectedTask] };
      const updatedColumn2 = { ...columns[prevcolumn], tasks: updatedBacklogTasks };

      updateColumn(column.id, updatedColumn);
      updateColumn(prevcolumn, updatedColumn2);

      setSelectedOption(null);
    }
  };

  return (
    <div>
      <select value={selectedOption || ''} onChange={handleSelect} className={`${styles.list}`}>
        <option value='' disabled>
          {''}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.content}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
