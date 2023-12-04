import React, { useState, useRef } from 'react';
import UserStyles from './style.module.scss';
import UserAvatar from '../../Assets/images/user-avatar.png';
import { useOnClickOutside } from 'usehooks-ts';

const User: React.FC = () => {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);
  const ref = useRef(null);

  const handleUserClick = (): void => {
    setIsNavActive(!isNavActive);
  };

  const handleClickOutside = () => {
    setIsNavActive(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <div className={`${UserStyles.user}`} onClick={handleUserClick} ref={ref}>
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
