import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../TaskDetailPage/style.module.scss';
import { useBoardContext } from '../Board/context';

const TaskDetailPage: React.FC = () => {
  const { columns } = useBoardContext();
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<{ id: string; content: string; description?: string } | null>(
    null,
  );
  const [editable, setEditable] = useState<boolean>(false);
  const [editedDescription, setEditedDescription] = useState<string>('');

  const findTaskById = (taskId: string) => {
    const allTasks = Object.values(columns)
      .map((column) => column.tasks)
      .flat();

    return allTasks.find((task) => task.id === taskId) || null;
  };

  useEffect(() => {
    const task = findTaskById(taskId!);
    setTask(task);
  }, [taskId]);

  const handleEditClick = () => {
    setEditable(true);
    setEditedDescription(task?.description || '');
  };

  const handleSaveClick = () => {
    setTask((prevTask) => (prevTask ? { ...prevTask, description: editedDescription } : null));
    setEditable(false);
  };

  const handleCancelClick = () => {
    setEditable(false);
    setEditedDescription(task?.description || '');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.content}>
      <div className={styles.content__wrapper}>
        <h1 className={styles.content__title}>{task?.content}</h1>
        <div className={styles.content__text}>
          {editable ? (
            <>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={4}
                cols={50}
              />
              <button onClick={handleSaveClick} className={styles.content__btn}>
                Save
              </button>
              <button onClick={handleCancelClick} className={styles.content__btn}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>{task?.description || 'This task has no description'}</div>
              <button onClick={handleEditClick} className={styles.content__btn}>
                Edit
              </button>
            </>
          )}
        </div>
        <button onClick={handleGoBack} className={styles.content__close}>
          <svg>
            <use xlinkHref='#s_close'></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;
