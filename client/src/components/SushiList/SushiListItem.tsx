import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addSushi, selectSushiById } from '@/store/slices/cart.slice';
import type { ISushi, ISushiVariant, SushiCart } from '@/types';

import SushiVariants from '../SushiVariants/SushiVariants';
import styles from './SushiList.module.scss';

const SushiListItem: React.FC<ISushi> = ({
  _id,
  name,
  category,
  description,
  rating,
  variants,
}) => {
  const [selectVariant, setSelectVariant] = useState(0);
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

  const onClickVariant = (i: number) => {
    setSelectVariant(i);
  };

  return (
    <li className={styles.item}>
      <Link to={`sushi/${_id}?variant=${selectVariant}`} className={styles.header}>
        <img src={variants[selectVariant].img} alt={name} />
        <h3>{name}</h3>
      </Link>

      <SushiVariants
        variants={variants}
        onClick={onClickVariant}
        activeVariant={selectVariant}
      />

      <div className={styles.info}>
        <span>{variants[selectVariant].weight} г</span>
        <span>{rating}/10⭐</span>
      </div>

      <div className={styles.footer}>
        <p>{variants[selectVariant].price} грн</p>
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
