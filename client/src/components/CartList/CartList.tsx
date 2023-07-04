import React from 'react';

import { SushiCart } from '@/types';

import styles from './CartList.module.scss';
import CartListItem from './CartListItem';

interface ICartListProps {
  cartSushi: SushiCart[];
}

const CartList: React.FC<ICartListProps> = ({ cartSushi }) => {
  const CartElements = cartSushi.map((item, i) => <CartListItem key={i} {...item} />);

  return <ul className={styles.list}>{CartElements}</ul>;
};

export default CartList;
