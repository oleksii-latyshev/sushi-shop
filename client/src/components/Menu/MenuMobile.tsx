import clsx from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks';

import styles from './Menu.module.scss';

const MenuMobile: FC = () => {
  const [isOpenMenu, SetIsOpenMenu] = useState(false);

  const { user } = useAppSelector((state) => state.settings);
  const { totalCount } = useAppSelector((state) => state.cart);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const onClickMenu = () => {
    SetIsOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickInsideMenu = (event: MouseEvent) => {
      if (mobileMenuRef.current && !event.composedPath().includes(mobileMenuRef.current)) {
        SetIsOpenMenu(false);
      }
    };

    document.body.addEventListener('click', handleClickInsideMenu);

    return () => document.body.removeEventListener('click', handleClickInsideMenu);
  }, []);

  return (
    <div ref={mobileMenuRef}>
      <button onClick={onClickMenu} className={styles.trigger}>
        <i className='fa-solid fa-bars' />
      </button>
      {isOpenMenu && (
        <div className={styles.mobileMenu}>
          {user ? (
            <>
              <NavLink to='/profile'>
                <i className='fa-solid fa-user' />
                <span>Профіль</span>
              </NavLink>
              <NavLink to='/wishlist'>
                <i className={clsx('fa-solid fa-heart', styles.icon)} />
                <span>Список бажань</span>
              </NavLink>
              <div className={styles.cart}>
                <NavLink to='/cart'>
                  <span>{totalCount}</span>
                  <i className='fa-solid fa-cart-shopping' />
                  <p>Корзина</p>
                </NavLink>
              </div>
            </>
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
      )}
    </div>
  );
};

export default MenuMobile;
