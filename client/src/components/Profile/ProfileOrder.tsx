import clsx from 'clsx';
import { FC, useState } from 'react';

import { IOrder } from '@/types/order.types';

import styles from './Profile.module.scss';
import ProfileProducts from './ProfileProducts';

const ProfileOrder: FC<IOrder> = ({
  createdAt,
  products,
  status,
  totalPrice,
  updatedAt,
  _id,
}) => {
  const [isContentOpen, setIsContentOpen] = useState(false);

  const onClickOpen = () => setIsContentOpen((prev) => !prev);

  const createdDate = new Date(createdAt);
  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span className={styles.desc}>
            Номер замовлення: {_id} від {createdDate.toLocaleString('en-US')}
          </span>
          <span>{status}</span>
        </div>

        <div className={clsx(styles.menu, isContentOpen && styles.active)}>
          <div className={styles.info}>
            <span className={styles.desc}>Сума замовлення</span>
            <span>{totalPrice}</span>
          </div>
          <button onClick={onClickOpen}>
            <svg
              width='15'
              height='15'
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
          </button>
        </div>
      </div>
      <div className={clsx(styles.content, isContentOpen && styles.visible)}>
        <h2>Детально про замовлення: </h2>
        <ProfileProducts products={products} />
        <div className={styles.footer}>
          <span>Загальна ціна: {totalPrice}</span>
          <button className={styles.active}>Скасувати</button>
        </div>
      </div>
    </li>
  );
};

export default ProfileOrder;
