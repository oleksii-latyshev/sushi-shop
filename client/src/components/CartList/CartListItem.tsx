import React from 'react';
import { useDispatch } from 'react-redux';

import { addSushi, deleteSushi, removeSushi } from '../../store/slices/cart.slice';
import type { SushiCart } from '../../types';
import styles from './CartList.module.scss';

const CartListItem: React.FC<SushiCart> = ({
  id,
  name,
  img,
  price,
  category,
  count,
  inCartCount,
}) => {
  const dispatch = useDispatch();

  const onClickRemove = () => dispatch(removeSushi({ id, count }));
  const onClickAdd = () => dispatch(addSushi({ id, count }));
  const onClickDelete = () => dispatch(deleteSushi({ id, count }));

  return (
    <li className={styles.item}>
      <div className={styles.img}>
        <img src={img} alt={name} />
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>в количестве: {count}</p>
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
      <b className={styles.price}>{price * inCartCount} грн</b>
      <div className={styles.remove}>
        <button onClick={onClickDelete} className={styles.circleButton}>
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
    </li>
  );
};

export default CartListItem;
