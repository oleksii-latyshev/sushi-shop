// import styles from './CartList.module.scss';
import './CartList.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import type { CartListItemProps } from './CartListItem';
import CartListItem from './CartListItem';

const inCart: CartListItemProps[] = [
  {
    id: 1,
    name: 'Love ua',
    price: 649,
    counts: [10, 15, 20],
    weight: 11,
    img: 'https://mafia.ua/storage/editor/fotos/450x450/love-ua.jpeg',
    category: 5,
    rating: 7,
    inCart: 1,
  },
  {
    id: 2,
    name: 'Сан сет',
    price: 899,
    counts: [15, 20, 50],
    weight: 12,
    img: 'https://mafia.ua/storage/editor/fotos/450x450/san-set.jpeg',
    category: 5,
    rating: 10,
    inCart: 3,
  },
];

const CartList = () => {
  const onClickClear = () => {};

  const CartElements = inCart.map((element) => <CartListItem key={element.id} {...element} />);

  const totalCount = inCart.length;
  const totalPrice = 0;

  return (
    <div className='cart'>
      <div className='top'>
        <h1 className='title'>
          <i className='fa-solid fa-cart-shopping' />
          Корзина
        </h1>
        <div className='clearBtn'>
          <button onClick={onClickClear}>
            <i className='fa-solid fa-trash' />
            <span>Очистить корзину</span>
          </button>
        </div>
      </div>

      <div className='list'>{CartElements}</div>

      <div className='bottom'>
        <div className='details'>
          <span>
            Всего заказано: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} грн</b>
          </span>
        </div>
        <div className='buttons'>
          <Link to='/' className='button go-back-btn'>
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 13L1 6.93015L6.86175 1'
                stroke='#D3D3D3'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
          <div className='button pay-btn'>
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
