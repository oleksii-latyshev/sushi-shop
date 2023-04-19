import React from 'react';

import type { Sushi } from '../../types';
import styles from './CartList.module.scss';

export interface CartListItemProps extends Sushi {
  inCart: number;
}

const CartListItem = ({
  id,
  category,
  counts,
  img,
  name,
  price,
  rating,
  weight,
  inCart,
}: CartListItemProps) => {
  const onClickRemove = () => {};
  const onClickAdd = () => {};
  const onClickDelete = () => {};

  return (
    <li className={styles.item}>
      <div className={styles.img}>
        <img src={img} alt='Pizza' />
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{weight} г</p>
      </div>
      <div className={styles.count}>
        <button
          disabled={inCart === 1}
          onClick={onClickRemove}
          className={styles.circleButton}
        >
          <i className='fa-solid fa-minus' />
        </button>
        <b>{inCart}</b>
        <button onClick={onClickAdd} className={styles.circleButton}>
          <i className='fa-solid fa-plus' />
        </button>
      </div>
      <b className={styles.price}>{price * inCart} грн</b>
      <div className={styles.remove}>
        <button onClick={onClickDelete} className={styles.circleButton}>
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
    </li>
  );
};

export default CartListItem;
