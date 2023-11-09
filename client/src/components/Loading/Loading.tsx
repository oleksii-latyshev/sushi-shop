import { FC } from 'react';

import styles from './Loading.module.scss';

const Loading: FC = () => {
  return <i className={`fa-solid fa-spinner ${styles.element}`} />;
};

export default Loading;
