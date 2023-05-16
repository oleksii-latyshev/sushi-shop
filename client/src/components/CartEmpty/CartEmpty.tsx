import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CartEmpty.module.scss';

const CartEmpty: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Корзина пуста</h2>
      <Link to='/'>
        <button>вернуться на главную</button>
      </Link>
    </div>
  );
};

export default CartEmpty;
