import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectCartTotalCount } from '../../store/slices/cartSlice';
import styles from './Menu.module.scss';

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const totalCount = useSelector(selectCartTotalCount);
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
