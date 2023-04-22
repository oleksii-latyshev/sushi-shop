import React from 'react';

import type { Sushi } from '../../types';
import styles from './SushiDesc.module.scss';

const SushiDesc: React.FC<Sushi> = ({
  id,
  category,
  counts,
  img,
  name,
  price,
  rating,
  weight,
}) => {
  return (
    <div className={styles.wrapper}>
      <img src={img} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{price} грн</p>
      </div>
    </div>
  );
};

export default SushiDesc;
