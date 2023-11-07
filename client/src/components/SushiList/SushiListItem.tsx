import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import SushiVariants from '@/components/SushiVariants/SushiVariants';
import { useAppSelector } from '@/hooks';
import { useToggleWishlistItemMutation } from '@/services/user.service';
import { addSushi, selectSushiById } from '@/store/slices/cart.slice';
import { setUser } from '@/store/slices/settings.slice';
import type { ISushi, SushiCart } from '@/types/sushi.types';
import { getAbsolutePath } from '@/utils/helpers/getAbsolutePath';

import Popup from '../Popup/Popup';
import styles from './SushiList.module.scss';

const SushiListItem: React.FC<ISushi> = ({ _id, name, reviews, variants }) => {
  const heartRef = useRef<HTMLButtonElement>(null);
  const [selectVariant, setSelectVariant] = useState(0);
  const sushiInCart = useAppSelector(selectSushiById(_id));
  const { user } = useAppSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [toggleWishlistItem, { data, isLoading, isSuccess, isError }] =
    useToggleWishlistItemMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess]);

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

  const onClickHeart = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (heartRef.current && heartRef.current.contains(event.target as Node)) {
      event.preventDefault();
      await toggleWishlistItem(_id);
    }
  };

  const countInCart =
    sushiInCart.length > 0 ? (
      <span>{sushiInCart.reduce((sumCount, item) => sumCount + item.inCartCount, 0)}</span>
    ) : null;

  const avgRating =
    reviews.length > 0
      ? Math.ceil(
          reviews.reduce((avgRat, review) => avgRat + review.rating, 0) / reviews.length
        )
      : null;

  return (
    <li className={styles.item}>
      {isSuccess && data && (
        <Popup>
          ✔ {name} {user?.favorites.includes(_id) ? 'додано до' : 'прибрано з'} списку бажань
        </Popup>
      )}
      {isError && data && (
        <Popup>
          ❌ {name} помилка {user?.favorites.includes(_id) ? 'додаванні до ' : 'прибрані з '}
          списку бажань
        </Popup>
      )}
      <Link
        onClick={onClickHeart}
        to={getAbsolutePath(`sushi/${_id}?variant=${selectVariant}`)}
        className={styles.header}
      >
        {user && (
          <button ref={heartRef} className={styles.heart} disabled={isLoading}>
            {user?.favorites.includes(_id) ? (
              <i className='fa-solid fa-heart' />
            ) : (
              <i className='fa-regular fa-heart' />
            )}
          </button>
        )}

        <img src={variants[selectVariant].img} alt={name} className='' />
        <h3>{name}</h3>
      </Link>

      <SushiVariants
        variants={variants}
        onClick={onClickVariant}
        activeVariant={selectVariant}
      />

      <div className={styles.info}>
        <span>{variants[selectVariant].weight} г</span>
        <span>{avgRating === null ? 'new' : `${avgRating}/10⭐`}</span>
      </div>

      <div className={styles.footer}>
        <p>{variants[selectVariant].price} грн</p>
        <button onClick={onClickAddToCart}>
          В корзину
          {countInCart}
        </button>
      </div>
    </li>
  );
};

export default SushiListItem;
