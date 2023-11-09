import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { useLoginMutation } from '@/services/auth.service';
import { setUser } from '@/store/slices/settings.slice';
import { isResponseError } from '@/types/response.types';
import { ILoginUser } from '@/types/user.types';

import styles from './Sign.module.scss';

const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const [loginUser, { isLoading }] = useLoginMutation();

  const onSubmit = async (fields: ILoginUser) => {
    try {
      const response = await loginUser(fields).unwrap();

      dispatch(setUser(response));

      navigate('/');
    } catch (error) {
      if (isResponseError(error)) {
        setErrorLogin(error.data.message);
      } else {
        setErrorLogin('something is wrong');
      }
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
        Авторизуватись
      </button>
    </form>
  );
};

export default SignInForm;
