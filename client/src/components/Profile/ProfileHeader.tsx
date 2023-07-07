import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { useLogoutMutation } from '@/services/auth.service';
import { setUser } from '@/store/slices/settings.slice';

import Popup from '../Popup/Popup';
import styles from './Profile.module.scss';

const ProfileHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.settings);
  const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation();

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
      {isError && <Popup>❌ Помилка при виході з акаунту</Popup>}
      <h2> Привіт 👋, {user?.name}</h2>
      <button onClick={onClickExit} disabled={isLoading}>
        Вийти з акаунту
      </button>
    </div>
  );
};

export default ProfileHeader;
