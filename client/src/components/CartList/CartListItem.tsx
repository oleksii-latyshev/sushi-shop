import React from 'react';
import { useDispatch } from 'react-redux';

import { addSushi, deleteSushi, removeSushi } from '@/store/slices/cart.slice';
import type { SushiCart } from '@/types/sushi.types';

import styles from './CartList.module.scss';

const CartListItem: React.FC<SushiCart> = ({ _id, inCartCount, name, variant, variants }) => {
  const dispatch = useDispatch();

  const onClickRemove = () => dispatch(removeSushi({ _id, variant }));
  const onClickAdd = () => dispatch(addSushi({ _id, variant }));
  const onClickDelete = () => dispatch(deleteSushi({ _id, variant }));

  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <img className={styles.img} src={variants[variant].img} alt={name} />

        <div className={styles.info}>
          <h3>{name}</h3>
          <p>у кількості: {variants[variant].count}</p>
        </div>
      </div>

      <div className={styles.count}>
        <button
          disabled={inCartCount <= 1}
          onClick={onClickRemove}
          className={styles.circleButton}
        >
          <i className='fa-solid fa-minus' />
        </button>
        <b>{inCartCount}</b>
        <button onClick={onClickAdd} className={styles.circleButton}>
          <i className='fa-solid fa-plus' />
        </button>
      </div>
      <b className={styles.price}>{variants[variant].price * inCartCount} грн</b>

      <button onClick={onClickDelete} className={styles.circleButton}>
        <i className='fa-solid fa-xmark' />
      </button>
    </li>
  );
};

export default CartListItem;
