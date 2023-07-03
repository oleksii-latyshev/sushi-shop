import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addSushi, selectSushiById } from '@/store/slices/cart.slice';
import type { ISushi, ISushiVariant, SushiCart } from '@/types';

import styles from './SushiList.module.scss';

const SushiListItem: React.FC<ISushi> = ({
  _id,
  name,
  category,
  description,
  rating,
  variants,
}) => {
  const [selectVariant, setSelectVariant] = useState<ISushiVariant>(variants[0]); // TODO проверить на ререндер массив, мб useMemo нужно будет заюзать
  const sushiInCart = useSelector(selectSushiById(_id));
  const dispatch = useDispatch();

  const onClickAddToCart = () => {
    // const item: SushiCart = {
    //   _id,
    //   name,
    //   img,
    //   price,
    //   category,
    //   count: selectSize,
    //   inCartCount: 1,
    // };
    // dispatch(addSushi(item));
  };

  const choicesElements = variants.map((variant, i) => (
    <li key={i} className={clsx(selectVariant.count === variant.count && styles.active)}>
      <button onClick={() => setSelectVariant(variant)}>{selectVariant.count} шт</button>
    </li>
  ));

  return (
    <li className={styles.item}>
      <Link to={`sushi/${_id}`}>
        <img src={selectVariant.img} alt={name} />
        <h3>{name}</h3>
      </Link>

      <ul className={styles.choices}>{choicesElements}</ul>

      <div className={styles.info}>
        <span>{selectVariant.weight} г</span>
        <span>{rating}/10</span>
      </div>

      <div className={styles.footer}>
        <p>{selectVariant.price} грн</p>
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
