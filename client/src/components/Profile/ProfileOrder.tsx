import { FC } from 'react';

import { IOrder } from '@/types';

import styles from './Profile.module.scss';

const ProfileOrder: FC<IOrder> = ({
  createdAt,
  products,
  status,
  totalPrice,
  updatedAt,
  _id,
}) => {
  const createdDate = new Date(createdAt);
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <span className={styles.desc}>
          Номер замовлення: {_id} від {createdDate.toLocaleString('en-US')}
        </span>
        <span>{status}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.desc}>Сума замовлення</span>
        <span>{totalPrice}</span>
      </div>
      <div className={styles.menu}>
        <span>Кількість замовлених суші {products.length}</span>
        <button>👆</button>
      </div>
    </li>
  );
};

export default ProfileOrder;
