import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';

import { ISushiReview } from '@/types/sushi.types';

import SushiReview from './SushiReview';
import styles from './SushiReview.module.scss';

interface ISushiReviewsProps {
  reviews: ISushiReview[];
}

const SushiReviews: FC<ISushiReviewsProps> = ({ reviews }) => {
  const [parent] = useAutoAnimate();
  const reviewsElement = reviews.map((review, i) => (
    <SushiReview key={Date.now() + i} {...review} />
  ));

  return (
    <div className={styles.wrapper}>
      <h2>Відгуки: </h2>
      {reviews.length > 0 ? (
        <ul ref={parent} className={styles.list}>
          {reviewsElement}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>Ти можеш стати першим, хто оцінив 😎</p>
      )}
    </div>
  );
};

export default SushiReviews;
