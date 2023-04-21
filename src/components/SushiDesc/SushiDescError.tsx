import React from 'react';

import styles from './SushiDesc.module.scss';

const SushiDescError = () => {
  return <div className={styles.errorWrapper}>Выбранная суши не существует</div>;
};

export default SushiDescError;
