import React from 'react';

import styles from './Menu.module.scss';

interface MenuInstance {
  className?: string;
}

const Menu = ({ className }: MenuInstance) => {
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  return (
    <div className={conditionalClass}>
      {/* <i className='fa-solid fa-moon' /> */}
      <i className='fa-solid fa-sun' />
      <i className='fa-solid fa-heart' />
      <i className='fa-solid fa-user' />
    </div>
  );
};

export default Menu;
