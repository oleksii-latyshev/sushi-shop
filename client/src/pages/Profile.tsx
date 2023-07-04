import { FC } from 'react';

import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileOrders from '@/components/Profile/ProfileOrders';

const Profile: FC = () => {
  return (
    <div>
      <ProfileHeader />
      <ProfileOrders />
    </div>
  );
};

export default Profile;
