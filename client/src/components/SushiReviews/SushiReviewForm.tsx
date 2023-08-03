import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAddReviewMutation } from '@/services/sushi.service';
import { isBadResponse } from '@/types/response.types';
import { ICreateSushiReview } from '@/types/sushi.types';

import styles from './SushiReview.module.scss';

interface ISushiReviewFormProps {
  _id: string;
}

const SushiReviewForm: FC<ISushiReviewFormProps> = ({ _id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateSushiReview>();

  const [error, setError] = useState<string | null>(null);

  const [addReview, { data: fetchData, isError, isLoading }] = useAddReviewMutation();

  useEffect(() => {
    if (isError && isBadResponse(fetchData)) {
      setError(fetchData.message);
    }
  }, [isError]);

  const onSubmit = handleSubmit((data) => {
    addReview({ _id, review: data });
    reset();
  });

  return (
    <div className={styles.formWrapper}>
      <h2>Залишити відгук: </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor='rating'>
          Оцінка
          <input
            id='rating'
            type='number'
            max={10}
            min={1}
            defaultValue={10}
            {...register('rating', {
              required: 'рейтинг обовязкове поле',
              max: {
                value: 10,
                message: 'оцінка не може бути вище 10',
              },
              min: {
                value: 1,
                message: 'оцінка не може бути нижчою ніж 1',
              },
            })}
            className={styles.markInput}
          />
          {errors.rating?.message && <span>{errors.rating.message}</span>}
        </label>
        <label htmlFor='text'>
          Текст відгуку:
          <textarea
            id='text'
            {...register('text', {
              required: 'поле текст обовязкове для заповнення',
              minLength: { value: 2, message: 'мінімальна довжина тексту відгуку 2 символи' },
              maxLength: {
                value: 190,
                message: 'максимальна довжина тексту відгуку 190 символів',
              },
            })}
            className={styles.textInput}
          />
          {errors.text?.message && <span>{errors.text.message}</span>}
        </label>
        {error && <span>{error}</span>}
        <button disabled={isLoading}>Залишити відгук</button>
      </form>
    </div>
  );
};

export default SushiReviewForm;
