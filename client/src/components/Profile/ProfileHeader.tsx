import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setUser } from '@/store/slices/settings.slice';

import styles from './Profile.module.scss';

const ProfileHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.settings);

  if (!user) {
    navigate('/');
  }

  const onClickExit = () => {
    dispatch(setUser(null));
  };

  return (
    <div className={styles.header}>
      <h2> Привіт 👋, {user?.name}</h2>
      <button onClick={onClickExit}>Вийти з акаунту</button>
    </div>
  );
};

export default ProfileHeader;
