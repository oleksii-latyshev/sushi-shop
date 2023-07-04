import clsx from 'clsx';
import { FC } from 'react';

import { ISushiVariant } from '@/types';

import styles from './SushiVariants.module.scss';

interface ISushiVariantsProps {
  variants: ISushiVariant[];
  activeVariant?: number;
  onClick: (i: number) => void;
}

const SushiVariants: FC<ISushiVariantsProps> = ({ variants, activeVariant = 0, onClick }) => {
  const choicesElements = variants.map((variant, i) => (
    <li key={i} className={clsx(activeVariant === i && styles.active)}>
      <button onClick={() => onClick(i)}>{variant.count} шт</button>
    </li>
  ));
  return <ul className={styles.wrapper}>{choicesElements}</ul>;
};

export default SushiVariants;
