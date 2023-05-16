import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addSushi, selectSushiById } from '../../store/slices/cartSlice';
import type { Sushi, SushiCart } from '../../types';
import styles from './SushiList.module.scss';

type SushiListItemProps = Sushi;

const SushiListItem: React.FC<SushiListItemProps> = ({
  id,
  name,
  img,
  price,
  category,
  counts,
  rating,
  weight,
}) => {
  const [selectSize, setSelectSize] = useState(counts[0]); // TODO проверить на ререндер массив, мб useMemo нужно будет заюзать
  const sushiInCart = useSelector(selectSushiById(id));
  const dispatch = useDispatch();

  const onClickAddToCart = () => {
    const item: SushiCart = {
      id,
      name,
      img,
      price,
      category,
      count: selectSize,
      inCartCount: 1,
    };

    dispatch(addSushi(item));
  };

  const choicesElements = counts.map((countFood) => (
    <li key={countFood} className={selectSize === countFood ? styles.active : ''}>
      <button onClick={() => setSelectSize(countFood)}>{countFood} шт</button>
    </li>
  ));

  return (
    <li className={styles.item}>
      <Link to={`sushi/${id}`}>
        <img src={img} alt={name} />
        <h3>{name}</h3>
      </Link>

      <ul className={styles.choices}>{choicesElements}</ul>
      {/* можно тут реализовать блок, который будет показывать рейтинг суши и вес основанный на выбранном количестве * на из пропса вес */}
      <div className={styles.footer}>
        <p>{price} грн</p>
        <button onClick={onClickAddToCart}>
          Добавить
          {sushiInCart.length > 0 ? (
            <span>
              {sushiInCart.reduce((sumCount, item) => sumCount + item.inCartCount, 0)}
            </span>
          ) : null}
        </button>
      </div>
    </li>
  );
};

export default SushiListItem;
