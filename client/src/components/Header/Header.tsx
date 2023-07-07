import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Menu from '@/components/Menu/Menu';
import Search from '@/components/Search/Search';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const location = useLocation();

  const excludedPaths =
    location.pathname !== '/cart' &&
    location.pathname !== '/wishlist' &&
    location.pathname !== '/profile';

  return (
    <div className={styles.wrapper}>
      <Link className={styles.logo} to='/'>
        sushi
      </Link>
      {excludedPaths && <Search className={styles.search} placeholder='назва суші...' />}
      <Menu />
    </div>
  );
};

export default Header;
