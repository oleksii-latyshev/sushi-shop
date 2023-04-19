import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import type { IState } from '../../types';
import styles from './Menu.module.scss';

interface MenuInstance {
  className?: string;
}

const Menu = ({ className }: MenuInstance) => {
  const totalCount = useSelector((state: IState) => state.cart.totalCount);
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;

  return (
    <div className={conditionalClass}>
      {/* <i className='fa-solid fa-moon' /> */}
      <i className={`${styles.icon} fa-solid fa-sun`} />
      <i className={`${styles.icon} fa-solid fa-heart`} />
      <div className={styles.cart}>
        <NavLink to='/cart'>
          <span>{totalCount}</span>
          <i className='fa-solid fa-cart-shopping' />
        </NavLink>
      </div>
      <i className={`${styles.icon} fa-solid fa-user`} />
    </div>
  );
};

export default Menu;
