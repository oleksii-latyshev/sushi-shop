import { FC } from 'react';

import { IOrder } from '@/types/order.types';

import styles from './Profile.module.scss';

const ProfileProducts: FC<Pick<IOrder, 'products'>> = ({ products }) => {
  const productsList = products.map(({ sushiId: sushi, count, variant }, i) => (
    <li key={i} className={styles.product}>
      <img src={sushi.variants[variant].img} alt={sushi.name} />

      <h3>{sushi.name}</h3>
      <div className={styles.info}>
        <span> {sushi.variants[variant].count} шт</span>
        <span> {sushi.variants[variant].weight} г</span>
      </div>
      <span>x{count}</span>
    </li>
  ));
  return <ul className={styles.products}>{productsList}</ul>;
};

export default ProfileProducts;
