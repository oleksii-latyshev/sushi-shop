import React from 'react';

import Menu from '../../components/Menu/Menu';
import Search from '../../components/Search/Search';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <a className={styles.logo} href='#!'>
        sushi
      </a>
      <Search className={styles.search} placeholder='enter the name of the sushi...' />
      <Menu />
    </div>
  );
};

export default Header;
