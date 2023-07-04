import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks';

const ProfileHeader: FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    navigate('/');
  }

  return (
    <div>
      <h2> Привіт 👋, {user?.name}</h2>
    </div>
  );
};

export default ProfileHeader;
