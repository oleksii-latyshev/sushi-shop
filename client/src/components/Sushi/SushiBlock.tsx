import { FC, useState } from 'react';

import type { ISushi } from '@/types/sushi.types';

import SushiReviews from '../SushiReviews/SushiReviews';
import styles from './SushiBlock.module.scss';
import SushiInfo from './SushiInfo';
import SushiMenu from './SushiMenu';

interface ISushiBlockProps extends ISushi {
  variant: number;
}

const SushiBlock: FC<ISushiBlockProps> = (props) => {
  const { variants, variant, name, description, reviews } = props;

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
          {...props}
        />
      </div>
      <SushiInfo description={description} />
      <SushiReviews reviews={reviews} />
    </div>
  );
};

export default SushiBlock;
