import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { useLoginMutation } from '@/services/auth.service';
import { setUser } from '@/store/slices/settings.slice';
import { ILoginUser } from '@/types/user.types';

import styles from './SignInForm.module.scss';

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const [loginUser, { isError, isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  const onSubmit = async (fields: ILoginUser) => {
    const response = await loginUser(fields);

    if ('data' in response) {
      dispatch(setUser(response.data));
    } else if ('error' in response && 'data' in response.error) {
      setErrorLogin(response.error.data as string);
    } else {
      setErrorLogin('something is wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <label htmlFor='username'>
        Enter your username:
        <input
          id='username'
          placeholder='username...'
          {...register('username', { required: 'username is required filed' })}
        />
        {errors.username?.message && <span>{errors.username.message}</span>}
      </label>
      <label htmlFor='password'>
        Enter your password:
        <input
          id='password'
          placeholder='password...'
          {...register('password', { required: 'password is required filed' })}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </label>
      {errorLogin && <span>{errorLogin}</span>}
      <button type='submit'>Авторизуватись</button>
    </form>
  );
};
