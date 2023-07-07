import { FC } from 'react';

import { ISushiReview } from '@/types/sushi.types';

import styles from './SushiReview.module.scss';

const SushiReview: FC<ISushiReview> = ({ rating, text, userId: user }) => {
  let icon;

  // ? tsx helper?
  if (rating < 5) {
    icon = <i className='fa-solid fa-face-frown' />;
  } else if (rating <= 7) {
    icon = <i className='fa-solid fa-face-meh' />;
  } else if (rating > 7) {
    icon = <i className='fa-solid fa-face-smile' />;
  }

  return (
    <li className={styles.item}>
      <div>
        <span>
          {icon} {user.name}
        </span>
        <span>{rating}⭐</span>
      </div>
      <hr />
      <p>{text}</p>
    </li>
  );
};

export default SushiReview;
