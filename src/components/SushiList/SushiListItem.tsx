import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import type { Sushi } from '../../types';
import styles from './SushiList.module.scss';

type SushiListItemProps = Sushi;

const FoodListItem = ({
  id,
  name,
  img,
  price,
  category,
  counts,
  rating,
  weight,
}: SushiListItemProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [selectSize, setSelectSize] = useState(counts[0]); // TODO проверить на ререндер массив, мб useMemo нужно будет заюзать

  const choicesElements = counts.map((countFood) => (
    <li key={countFood} className={selectSize === countFood ? styles.active : ''}>
      <button onClick={() => setSelectSize(countFood)}>{countFood} шт</button>
    </li>
  ));

  return (
    <li className={styles.item}>
      <Link to='sushi/1'>
        <img src={img} alt={name} />
        <h3>{name}</h3>
      </Link>

      <ul className={styles.choices}>{choicesElements}</ul>
      <div className={styles.footer}>
        <p>{price} грн</p>
        <button onClick={() => setCartCount((prev) => prev + 1)}>
          Добавить {cartCount > 0 ? <span>{cartCount}</span> : null}
        </button>
      </div>
    </li>
  );
};

export default FoodListItem;
