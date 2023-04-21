import React from 'react';

import type { Sushi } from '../../types';
import styles from './SushiDesc.module.scss';

const SushiDesc = ({ id, category, counts, img, name, price, rating, weight }: Sushi) => {
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
