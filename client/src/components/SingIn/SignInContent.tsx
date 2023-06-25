import { FC } from 'react';

import styles from './SignInContent.module.scss';
import { SignInForm } from './SignInForm';

export const SignInContent: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
};
