import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SushiVariants from '@/components/SushiVariants/SushiVariants';
import { addSushi, selectSushiById } from '@/store/slices/cart.slice';
import type { ISushi, SushiCart } from '@/types/sushi.types';

import styles from './SushiList.module.scss';

const SushiListItem: React.FC<ISushi> = ({ _id, name, rating, variants }) => {
  const [selectVariant, setSelectVariant] = useState(0);
  const sushiInCart = useSelector(selectSushiById(_id));
  const dispatch = useDispatch();

  const onClickAddToCart = () => {
    const item: SushiCart = {
      _id,
      name,
      variants,
      variant: selectVariant,
      inCartCount: 1,
    };
    dispatch(addSushi(item));
  };

  const onClickVariant = (i: number) => {
    setSelectVariant(i);
  };

  const countInCart =
    sushiInCart.length > 0 ? (
      <span>{sushiInCart.reduce((sumCount, item) => sumCount + item.inCartCount, 0)}</span>
    ) : null;

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
          {countInCart}
        </button>
      </div>
    </li>
  );
};

export default SushiListItem;
