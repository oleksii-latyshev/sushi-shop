import React from 'react';
import { Link } from 'react-router-dom';

import emptyBox from '@/assets/img/emptyBox.png';

import styles from './SushiBlock.module.scss';

const SushiBlockError: React.FC = () => {
  return (
    <div className={styles.errorWrapper}>
      <img src={emptyBox} alt='empty' />
      <h2>Вибрана суші не існує 😥</h2>
      <Link to='/'>
        <button>Повернутись на голову</button>
      </Link>
    </div>
  );
};

export default SushiBlockError;
