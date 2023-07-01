import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';

import styles from './Menu.module.scss';

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const { totalCount, sushi } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;
  const isMounted = useRef(false);

  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(sushi);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [sushi]);

  const onClickThemeSwitcher = () => {
    toggleTheme();
  };

  return (
    <div className={conditionalClass}>
      {/* <i className='fa-solid fa-moon' /> */}
      <button onClick={onClickThemeSwitcher} className={styles.icon}>
        <i className='fa-solid fa-sun' />
      </button>
      <i className={`${styles.icon} fa-solid fa-heart`} />
      <div className={styles.cart}>
        <NavLink to='/cart'>
          <span>{totalCount}</span>
          <i className='fa-solid fa-cart-shopping' />
        </NavLink>
      </div>
      {user ? (
        <Link to='/profile'>
          <i className={`${styles.icon} fa-solid fa-user`} />
        </Link>
      ) : (
        <div className={styles.auth}>
          <Link to='/signIn'>
            <button>sing in</button>
          </Link>
          <Link to='/signUp'>
            <button className='active'>sing up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
