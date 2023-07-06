import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { useLogoutMutation } from '@/services/auth.service';
import { setUser } from '@/store/slices/settings.slice';

import styles from './Profile.module.scss';

const ProfileHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.settings);
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(null));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const onClickExit = async () => {
    await logout(null);
  };

  return (
    <div className={styles.header}>
      <h2> Привіт 👋, {user?.name}</h2>
      <button onClick={onClickExit} disabled={isLoading}>
        Вийти з акаунту
      </button>
    </div>
  );
};

export default ProfileHeader;
