import { FC, useState } from 'react';

import { useAppSelector } from '@/hooks';
import type { ISushi } from '@/types/sushi.types';

import SushiReviewForm from '../SushiReviews/SushiReviewForm';
import SushiReviews from '../SushiReviews/SushiReviews';
import styles from './SushiBlock.module.scss';
import SushiInfo from './SushiInfo';
import SushiMenu from './SushiMenu';

interface ISushiBlockProps extends ISushi {
  variant: number;
}

const SushiBlock: FC<ISushiBlockProps> = ({ _id, ...data }) => {
  const { variants, variant, name, description, reviews } = data;
  const { user } = useAppSelector((state) => state.settings);

  const [selectedVariant, setSelectedVariant] = useState(variant);

  const onClickVariant = (i: number) => {
    setSelectedVariant(i);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={variants[selectedVariant].img} alt={name} />
        <SushiMenu
          selectedVariant={selectedVariant}
          onClickVariant={onClickVariant}
          _id={_id}
          {...data}
        />
      </div>
      <SushiInfo description={description} />
      {user && <SushiReviewForm _id={_id} />}
      <SushiReviews reviews={reviews} />
    </div>
  );
};

export default SushiBlock;
