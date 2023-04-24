import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import styles from './Menu.module.scss';

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const { totalCount, sushi } = useAppSelector((state) => state.cart);
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(sushi);
      console.log(json);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [sushi]);

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
