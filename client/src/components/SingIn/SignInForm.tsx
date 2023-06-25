import { FC } from 'react';
import { useForm } from 'react-hook-form';

import styles from './SignInForm.module.scss';

interface LoginForm {
  username: string;
  password: string;
}

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <label htmlFor='username'>
        Enter your username:
        <input
          id='username'
          defaultValue='username...'
          {...register('username', { required: 'username is required filed' })}
        />
        {errors.username?.message && <span>{errors.username.message}</span>}
      </label>
      <label htmlFor='password'>
        Enter your password:
        <input
          id='password'
          defaultValue='password...'
          {...register('password', { required: 'password is required filed' })}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </label>
      <button type='submit'>sign in</button>
    </form>
  );
};
