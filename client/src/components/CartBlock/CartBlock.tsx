import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import CartList from '@/components/CartList/CartList';
import { useAppSelector } from '@/hooks';
import { useCreateOrderMutation } from '@/services/order.service';
import { clearCart } from '@/store/slices/cart.slice';
import { IProduct } from '@/types/order.types';

import styles from './CartBlock.module.scss';

const CartBlock: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartSushi, totalPrice, totalCount } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.settings);

  const [createOrder, { isSuccess }] = useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      dispatch(clearCart());
    }
  }, [isSuccess]);

  const onClickClear = () => dispatch(clearCart());

  const onClickOrder = async () => {
    const requestBody: IProduct[] = cartSushi.map((sushi) => ({
      sushiId: sushi._id,
      variant: sushi.variant,
      count: sushi.inCartCount,
    }));

    await createOrder(requestBody);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          <i className='fa-solid fa-cart-shopping' />
          Корзина
        </h1>
        <div className={styles.clearBtn}>
          <button onClick={onClickClear}>
            <i className='fa-solid fa-trash' />
            <span>Очистити корзину</span>
          </button>
        </div>
      </div>

      <CartList cartSushi={cartSushi} />

      <div className={styles.bottom}>
        <div className={styles.details}>
          <span>
            Усього замовлено: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сума замовлення: <b>{totalPrice} грн</b>
          </span>
        </div>
        <div className={styles.buttons}>
          <Link to='/' className={clsx(styles.button, styles.goBackBtn)}>
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

            <span>Повернутися назад</span>
          </Link>

          {user ? (
            <button onClick={onClickOrder} className={styles.payBtn}>
              Замовити
            </button>
          ) : (
            <Link className={styles.payBtn} to='/signIn'>
              Замовити
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartBlock;
