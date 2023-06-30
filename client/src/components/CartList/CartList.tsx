import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCart, selectCart } from '../../store/slices/cart.slice';
import styles from './CartList.module.scss';
import CartListItem from './CartListItem';

const CartList: React.FC = () => {
  const dispatch = useDispatch();
  const { sushi, totalPrice, totalCount } = useSelector(selectCart);

  const onClickClear = () => dispatch(clearCart());

  const CartElements = sushi.map((item) => (
    <CartListItem key={+item.id * item.count} {...item} />
  ));

  return (
    <div className={styles.cart}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          <i className='fa-solid fa-cart-shopping' />
          Корзина
        </h1>
        <div className={styles.clearBtn}>
          <button onClick={onClickClear}>
            <i className='fa-solid fa-trash' />
            <span>Очистить корзину</span>
          </button>
        </div>
      </div>

      <div className={styles.list}>{CartElements}</div>

      <div className={styles.bottom}>
        <div className={styles.details}>
          <span>
            Всего заказано: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} грн</b>
          </span>
        </div>
        <div className={styles.buttons}>
          <Link to='/' className={`${styles.button} ${styles.goBackBtn}`}>
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
          <div className={`${styles.button} ${styles.payBtn}`}>
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
