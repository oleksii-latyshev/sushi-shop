import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Menu from '@/components/Menu/Menu';
import Search from '@/components/Search/Search';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <Link className={styles.logo} to='/'>
        sushi
      </Link>
      {location.pathname !== '/cart' && (
        <Search className={styles.search} placeholder='enter the name of the sushi...' />
      )}
      <Menu />
    </div>
  );
};

export default Header;
