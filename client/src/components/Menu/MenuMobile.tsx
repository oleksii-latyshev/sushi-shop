import clsx from 'clsx';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks';

import styles from './Menu.module.scss';

const MenuMobile: FC = () => {
  const { user } = useAppSelector((state) => state.settings);
  const { totalCount } = useAppSelector((state) => state.cart);

  return (
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
  );
};

export default MenuMobile;
