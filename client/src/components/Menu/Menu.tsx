import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';

import styles from './Menu.module.scss';
import MenuMobile from './MenuMobile';

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const [isOpenMenu, SetIsOpenMenu] = useState(false);
  const { totalCount, cartSushi } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.settings);
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
  const onClickMobileMenu = () => {
    SetIsOpenMenu((prev) => !prev);
  };

  return (
    <div className={clsx(styles.wrapper, className && className)}>
      <button onClick={onClickThemeSwitcher} className={styles.icon}>
        {theme === 'light' ? (
          <i className='fa-solid fa-moon' />
        ) : (
          <i className='fa-solid fa-sun' />
        )}
      </button>
      {user && (
        <div className={styles.mobile}>
          <NavLink to='/wishlist'>
            <i className={clsx('fa-solid fa-heart', styles.icon)} />
          </NavLink>
        </div>
      )}

      <div className={styles.mobile}>
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
      <button onClick={onClickMobileMenu} className={styles.trigger}>
        <i className='fa-solid fa-bars' />
      </button>
      {isOpenMenu && <MenuMobile />}
    </div>
  );
};

export default Menu;
