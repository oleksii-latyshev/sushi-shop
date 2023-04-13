// import styles from './CartList.module.scss';
import './CartList.scss';

import React from 'react';
import type { Food } from 'src/types';

export interface CartListItemProps extends Food {
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
    <li className='item'>
      <div className='img'>
        <img className='pizza-block__image' src={img} alt='Pizza' />
      </div>
      <div className='info'>
        <h3>{name}</h3>
        <p>{weight} г</p>
      </div>
      <div className='count'>
        <button disabled={inCart === 1} onClick={onClickRemove} className='circleButton'>
          <i className='fa-solid fa-minus' />
        </button>
        <b>{inCart}</b>
        <button onClick={onClickAdd} className='circleButton'>
          <i className='fa-solid fa-plus' />
        </button>
      </div>
      <b className='price'>{price * inCart} грн</b>
      <div className='remove'>
        <button onClick={onClickDelete} className='circleButton'>
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
    </li>
  );
};

export default CartListItem;
