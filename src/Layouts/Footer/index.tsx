import React from 'react';
import FooterStyles from './style.module.scss';
import { useBoardContext } from '../../Components/Board/context';

const Footer: React.FC = () => {
  const { activeTasksCount, completedTasksCount } = useBoardContext();
  return (
    <footer className={`${FooterStyles.footer}`}>
      <div className={`${FooterStyles.footer__wrapper}`}>
        <div className={`${FooterStyles.footer__activetasks}`}>
          Active tasks: {activeTasksCount}
        </div>
        <div className={`${FooterStyles.footer__finishedtasks}`}>
          Finished tasks: {completedTasksCount}
        </div>
        <div className={`${FooterStyles.footer__copy}`}>
          Kanban board by Valentina, {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
