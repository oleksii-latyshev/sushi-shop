import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';

import styles from './Menu.module.scss';

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const { totalCount, cartSushi } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.settings);
  const conditionalClass = className ? `${styles.wrapper} ${className}` : styles.wrapper;
  const isMounted = useRef(false);

  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(cartSushi);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [cartSushi]);

  const onClickThemeSwitcher = () => {
    toggleTheme();
  };

  return (
    <div className={conditionalClass}>
      <button onClick={onClickThemeSwitcher} className={styles.icon}>
        {theme === 'light' ? (
          <i className='fa-solid fa-moon' />
        ) : (
          <i className='fa-solid fa-sun' />
        )}
      </button>
      <NavLink to='/wishlist'>
        <i className={`${styles.icon} fa-solid fa-heart`} />
      </NavLink>
      <div className={styles.cart}>
        <NavLink to='/cart'>
          <span>{totalCount}</span>
          <i className='fa-solid fa-cart-shopping' />
        </NavLink>
      </div>
      {user ? (
        <NavLink to='/profile'>
          <i className={`${styles.icon} fa-solid fa-user`} />
        </NavLink>
      ) : (
        <div className={styles.auth}>
          <Link to='/signIn'>
            <button>sing in</button>
          </Link>
          <Link to='/signUp'>
            <button className={styles.active}>sing up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
