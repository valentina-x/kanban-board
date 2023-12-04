import React from 'react';
import HeaderStyles from './style.module.scss';
import User from '../../Components/User';

const Header: React.FC = () => {
  return (
    <header className={`${HeaderStyles.header}`}>
      <div className={`${HeaderStyles.header__wrapper}`}>
        <h1 className={`${HeaderStyles.header__title}`}>Awesome Kanban Board</h1>
        <User />
      </div>
    </header>
  );
};

export default Header;
