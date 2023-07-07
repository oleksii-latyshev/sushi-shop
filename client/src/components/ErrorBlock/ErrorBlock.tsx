import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './ErrorBlock.module.scss';

interface IErrorBlockProps {
  children: ReactNode;
}

const ErrorBlock: FC<IErrorBlockProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <h2>😢</h2>
      <p>{children}</p>
      <Link to='/'>
        <button>Повернутись на головну</button>
      </Link>
    </div>
  );
};

export default ErrorBlock;
