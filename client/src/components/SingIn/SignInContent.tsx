import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignInContent.module.scss';
import { SignInForm } from './SignInForm';

export const SignInContent: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Sign In</h1>
      <div className={styles.content}>
        <SignInForm />
        <div>
          <Link to='/'>Повернутись</Link>
          <Link to='/signUp'>Створити акаунт</Link>
        </div>
      </div>
    </div>
  );
};
