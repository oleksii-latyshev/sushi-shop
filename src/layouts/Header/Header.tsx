import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../components/Menu/Menu';
import type { SearchProps } from '../../components/Search/Search';
import Search from '../../components/Search/Search';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.logo} to='/'>
        sushi
      </Link>
      <Search className={styles.search} placeholder='enter the name of the sushi...' />
      <Menu />
    </div>
  );
};

export default Header;
