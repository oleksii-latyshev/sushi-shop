import { FC } from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>🤔</h2>
      <p>такої сторінки немає</p>
    </div>
  );
};

export default NotFoundBlock;
