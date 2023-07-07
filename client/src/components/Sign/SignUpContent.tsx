import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Sign.module.scss';
import SignUpForm from './SignUpForm';

const SignUpContent: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Sign Up</h1>
      <div className={styles.content}>
        <SignUpForm />
        <div>
          <Link to='/'>На голову</Link>
          <Link to='/signIn'>Увійти в акаунт</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpContent;
