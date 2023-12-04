import React, { useState } from 'react';
import UserStyles from './style.module.scss';
import UserAvatar from '../../Assets/images/user-avatar.png';

const User: React.FC = () => {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);

  const handleUserClick = (): void => {
    setIsNavActive(!isNavActive);
  };

  return (
    <>
      <div className={`${UserStyles.user}`} onClick={handleUserClick}>
        <img src={UserAvatar} alt='avatar' width='40' height='40' />
        <svg className={`${UserStyles.user__arrow} ${isNavActive ? UserStyles.active : ''}`}>
          <use xlinkHref='#s_arrow-down'></use>
        </svg>
        <div className={`${UserStyles.user__nav} ${isNavActive ? UserStyles.active : ''}`}>
          <a href='#'>Profile</a>
          <a href='#'>Log Out</a>
        </div>
      </div>
    </>
  );
};

export default User;
