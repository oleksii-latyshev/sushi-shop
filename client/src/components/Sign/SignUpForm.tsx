import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { useRegisterMutation } from '@/services/auth.service';
import { setUser } from '@/store/slices/settings.slice';
import { IRegisterUser } from '@/types/user.types';

import styles from './Sign.module.scss';

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const [registerUser, { isError, isLoading, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  const onSubmit = async (fields: IRegisterUser) => {
    const response = await registerUser(fields);

    if ('data' in response) {
      dispatch(setUser(response.data));
    } else if ('error' in response && 'data' in response.error) {
      setErrorLogin(response.error.data as string);
    } else {
      setErrorLogin('щось сталось 🤔');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor='username'>
        Ведіть логін:
        <input
          id='username'
          placeholder='логін...'
          {...register('username', {
            required: 'логін є обовязковим полем',
            minLength: { value: 2, message: 'мінімальна довжина логіна 2 символи' },
          })}
        />
        {errors.username?.message && <span>{errors.username.message}</span>}
      </label>
      <label htmlFor='name'>
        Ведіть імя:
        <input
          id='name'
          placeholder='імя...'
          {...register('name', {
            required: 'імя є обовязковим полем',
            minLength: { value: 2, message: 'мінімальна довжина імя 2 символи' },
          })}
        />
        {errors.username?.message && <span>{errors.username.message}</span>}
      </label>
      <label htmlFor='password'>
        Ведіть пароль:
        <input
          id='password'
          placeholder='пароль...'
          {...register('password', {
            required: 'пароль є обовязковим полем',
            minLength: { value: 5, message: 'мінімальна довжина паролю 5 символів' },
          })}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </label>
      {errorLogin && <span>{errorLogin}</span>}
      <button type='submit' disabled={isLoading}>
        Зареєструватись
      </button>
    </form>
  );
};

export default SignUpForm;
