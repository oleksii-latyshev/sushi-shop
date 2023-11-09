import { FC } from 'react';

import styles from './Loading.module.scss';

const LoadingBlock: FC = () => {
  return (
    <div className={styles.blockLoading}>
      <i className='fa-solid fa-spinner' />
    </div>
  );
};

export default LoadingBlock;
