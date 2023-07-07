import { FC } from 'react';

import styles from './SushiBlock.module.scss';

interface ISushiInfoProps {
  description: string;
}

const SushiInfo: FC<ISushiInfoProps> = ({ description }) => {
  return (
    <div className={styles.desc}>
      <h2>Опис: </h2>
      <p>{description}</p>
    </div>
  );
};

export default SushiInfo;
