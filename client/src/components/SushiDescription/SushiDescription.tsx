import { ChangeEvent, FC, useEffect, useState } from 'react';

import SushiVariants from '@/components/SushiVariants/SushiVariants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useToggleWishlistItemMutation } from '@/services/user.service';
import { addSushi } from '@/store/slices/cart.slice';
import { setUser } from '@/store/slices/settings.slice';
import type { ISushi, SushiCart } from '@/types/sushi.types';

import styles from './SushiDescription.module.scss';

interface ISushiDescriptionProps extends ISushi {
  variant: number;
}

const SushiDescription: FC<ISushiDescriptionProps> = ({
  _id,
  description,
  name,
  rating,
  variants,
  variant,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.settings);

  const [selectedVariant, setSelectedVariant] = useState(variant);
  const [countInCart, setCountInCart] = useState(1);

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
      variant: selectedVariant,
      inCartCount: countInCart,
    };
    dispatch(addSushi(item));
  };

  const onClickVariant = (i: number) => {
    setSelectedVariant(i);
  };

  const onClickHeart = async () => {
    await toggleWishlistItem(_id);
  };

  const onChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && +event.target.value > 0) {
      setCountInCart(+event.target.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={variants[selectedVariant].img} alt={name} />
        <div className={styles.menu}>
          <h2>{name}</h2>
          <SushiVariants
            variants={variants}
            activeVariant={selectedVariant}
            onClick={onClickVariant}
          />
          <div className={styles.info}>
            <div>
              <span>{variants[selectedVariant].weight} г</span>
              <span>{rating}/10⭐</span>
            </div>
            <button onClick={onClickHeart} disabled={isLoading}>
              {user && user?.favorites.includes(_id) ? (
                <i className='fa-solid fa-heart' />
              ) : (
                <i className='fa-regular fa-heart' />
              )}
            </button>
          </div>

          <div className={styles.control}>
            <label htmlFor='cart-count'>
              Кількість:
              <input
                id='cart-count'
                value={countInCart || ''}
                onChange={onChangeCount}
                min={0}
                type='number'
              />
            </label>
            <div>
              <span>{variants[selectedVariant].price * countInCart} грн</span>
              <button onClick={onClickAddToCart} className={styles.active}>
                купити
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.desc}>
        <h2>Опис: </h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SushiDescription;
