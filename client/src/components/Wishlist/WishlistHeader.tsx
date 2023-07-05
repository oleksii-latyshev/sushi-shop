import React from 'react';

import styles from './Wishlist.module.scss';

const WishlistHeader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Ваш список бажань:</h2>
    </div>
  );
};

export default WishlistHeader;
