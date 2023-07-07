import { ChangeEvent, FC, useEffect, useState } from 'react';

import SushiVariants from '@/components/SushiVariants/SushiVariants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useToggleWishlistItemMutation } from '@/services/user.service';
import { addSushi } from '@/store/slices/cart.slice';
import { setUser } from '@/store/slices/settings.slice';
import { ISushi, SushiCart } from '@/types/sushi.types';

import styles from './SushiBlock.module.scss';

interface ISushiMenuProps extends ISushi {
  selectedVariant: number;
  onClickVariant: (i: number) => void;
}

const SushiMenu: FC<ISushiMenuProps> = ({
  _id,
  name,
  variants,
  reviews,
  selectedVariant,
  onClickVariant,
}) => {
  const { user } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

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

  const onClickHeart = async () => {
    await toggleWishlistItem(_id);
  };

  const onChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && +event.target.value > 0) {
      setCountInCart(+event.target.value);
    }
  };

  const avgRating =
    reviews.length > 0
      ? Math.ceil(
          reviews.reduce((avgRat, review) => avgRat + review.rating, 0) / reviews.length
        )
      : null;

  return (
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
          <span>{avgRating === null ? 'new' : `${avgRating}/10⭐`}</span>
        </div>
        {user && (
          <button onClick={onClickHeart} disabled={isLoading}>
            {user.favorites.includes(_id) ? (
              <i className='fa-solid fa-heart' />
            ) : (
              <i className='fa-regular fa-heart' />
            )}
          </button>
        )}
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
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default SushiMenu;
