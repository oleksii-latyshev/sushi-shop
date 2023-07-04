import { ChangeEvent, FC, useState } from 'react';

import type { ISushi } from '@/types';

import SushiVariants from '../SushiVariants/SushiVariants';
import styles from './SushiDescription.module.scss';

interface ISushiDescriptionProps extends ISushi {
  variant: number;
}

const SushiDescription: FC<ISushiDescriptionProps> = ({
  _id,
  category,
  description,
  name,
  rating,
  variants,
  variant,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variant);
  const [countInCart, setCountInCart] = useState(1);

  const onClickVariant = (i: number) => {
    setSelectedVariant(i);
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
        <div>
          <h2>{name}</h2>
          <SushiVariants
            variants={variants}
            activeVariant={selectedVariant}
            onClick={onClickVariant}
          />
          <div>
            <span>{variants[selectedVariant].weight} г</span>
            <span>{rating}/10⭐</span>
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
              <button className={styles.active}>купити</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <h2>Опис: </h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SushiDescription;
